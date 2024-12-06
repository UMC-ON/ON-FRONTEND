import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as s from './ChatStyled';
import ChatHeader from '../../components/Chat/ChatHeader';
import TradeChatInfo from '../../components/Chat/TradeChatInfo';
import SentChatBubble from '../../components/Chat/SentChatBubble';
import ReceivedChatBubble from '../../components/Chat/ReceivedChatBubble';
import ChatInput from '../../components/Chat/ChatInput';
import Loading from '../../components/Loading/Loading';
import { useSelector } from 'react-redux';
import { showDate } from '../../components/Common/InfoExp';
import { useInfiniteQuery } from 'react-query';
import { GET_TRADE_CHAT, GET_TRADE_INFO } from '../../api/urls';
import { getData } from '../../api/Functions';

const TradeChat = () => {
  const [isFirstLoadComplete, setIsFirstLoadComplete] = useState(false); // 첫 로드 완료 상태
  const [infoResult, setInfoResult] = useState([]);
  const [messageInitiator, setMessageInitiator] = useState();
  const [defaultColor, setDefaultColor] = useState(''); // 채팅 버블의 기본 색상 설정
  const [postId, setPostId] = useState();
  const [scroll, setScroll] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);

  const userInfo = useSelector((state) => state.user.user);
  const location = useLocation();
  const { roomId, senderName } = location.state || {}; // URL에서 전달된 roomId와 senderName 가져오기
  const navigate = useNavigate(); // useNavigate 사용
  const chatWrapperRef = useRef(null); // 채팅 메시지 영역에 대한 참조 생성
  const topObserverRef = useRef(null); // 상단 감지용 Ref
  const pollingRef = useRef(true); // 롱 폴링 상태를 관리하는 ref

  // 초기 채팅 설정 함수
  const initialChatSetting = (response) => {
    if (response.data.content[0].chatUserOne === userInfo.id) {
      setMessageInitiator(true);
      setDefaultColor('#C2C7FF');
    } else {
      setMessageInitiator(false);
      setDefaultColor('#D1E2FF');
    }
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      ['chatMessages', roomId],
      async ({ pageParam = 0 }) => {
        setIsFetchingData(true);
        const response = await getData(
          GET_TRADE_CHAT(roomId),
          {
            Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
          },
          { roomId, page: pageParam, sort: 'createdAt%2Cdesc' },
        );
        // 0번 페이지일 때 초기 채팅 설정 호출
        if (pageParam === 0) {
          initialChatSetting(response);
        }
        return response.data;
      },
      {
        getNextPageParam: (lastPage) => {
          const currentPage = lastPage.number;
          const totalPages = lastPage.totalPages;
          return currentPage + 1 < totalPages ? currentPage + 1 : undefined;
        },
        enabled: !!roomId,
        onSuccess: () => {
          setIsFetchingData(false);
          if (!isFirstLoadComplete) {
            setScroll(true);
          }
        },
      },
    );

  // 채팅 메시지 리스트 병합
  const [chatList, setChatList] = useState(
    data?.pages?.flatMap((page) => page.content?.[0]?.chatList || []) || [],
  );
  const chatListRef = useRef(chatList);
  // chatList 상태와 chatListRef 동기화
  useEffect(() => {
    chatListRef.current = chatList; // chatList 상태를 chatListRef에 동기화
  }, [chatList]);

  //POLLING
  useEffect(() => {
    const abortController = new AbortController();
    pollingRef.current = true;

    const startLongPolling = async () => {
      while (pollingRef.current) {
        try {
          const response = await getData(
            GET_TRADE_CHAT(roomId),
            {
              Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
              signal: abortController.signal, // 요청 취소를 위한 signal 추가
            },
            { roomId, sort: 'createdAt%2Cdesc' },
          );

          if (response) {
            const newMessages = response.data.content[0].chatList;

            // 최신 메시지와 현재 메시지 비교
            const lastMessageTime = new Date(chatListRef.current[0]?.createdAt); // 최신 메시지 ID
            console.log('메', lastMessageTime);
            const newMessagesToAdd = newMessages.filter(
              (message) => new Date(message.createdAt) > lastMessageTime,
            );
            console.log('메2', newMessagesToAdd);
            if (newMessagesToAdd.length > 0) {
              setChatList((prevChatList) => [
                ...newMessagesToAdd,
                ...prevChatList,
              ]);
              // 최신 메시지 리스트를 chatListRef에 업데이트
              chatListRef.current = [
                ...newMessagesToAdd,
                ...chatListRef.current,
              ];
            }
          }
        } catch (error) {
          if (error.name !== 'AbortError') {
            console.error('Error fetching new messages:', error);
          }
        }

        // 1초 대기 후 다음 요청
        await new Promise((resolve) => setTimeout(resolve, 10000));
      }
    };

    startLongPolling();

    return () => {
      pollingRef.current = false; // 컴포넌트 언마운트 시 polling 중지
      abortController.abort(); // 요청 취소
    };
  }, [roomId]);

  //INFINITE SCROLL
  useEffect(() => {
    if (data) {
      const initialChatList =
        data.pages?.flatMap((page) => page.content?.[0]?.chatList || []) || [];
      setChatList(initialChatList); // 상태 초기화
    }
  }, [data]);

  useEffect(() => {
    console.log(chatList);
  }, [chatList]);
  //첫 로딩 시 스크롤 아래로
  useLayoutEffect(() => {
    if (chatWrapperRef.current) {
      chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
      setIsFirstLoadComplete(true);
    }
  }, [scroll]);

  // infinite scroll 상단 감지용 IntersectionObserver
  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          !isFetchingData &&
          entry.isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage &&
          isFirstLoadComplete
        ) {
          fetchNextPage();
        }
      },
      { root: chatWrapperRef.current, threshold: 0.1 },
    );

    const topObserverElement = topObserverRef.current;
    if (topObserverElement) {
      observer.observe(topObserverElement);
    }

    return () => {
      if (topObserverElement) {
        observer.unobserve(topObserverElement);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, chatList]);

  //새 메세지 입력, 추가
  const addNewMessage = (newMessage) => {
    setChatList((prevChatList) => [newMessage, ...prevChatList]); // 상태 업데이트
    chatListRef.current = [newMessage, ...chatListRef.current];
    chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
  };

  //인포
  useEffect(() => {
    const fetchTradeInfo = async () => {
      try {
        const response = await getData(
          GET_TRADE_INFO(roomId),
          {
            Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
          },
          { roomId: roomId },
        );
        console.log('인포', response);

        if (response) {
          console.log('인포', response.data);
          setInfoResult(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
      }
    };

    fetchTradeInfo();
  }, []);

  // navigate(-1)을 사용한 뒤로가기 버튼 클릭 시 롱 폴링을 중지
  const handleBackNavigation = () => {
    pollingRef.current = false; // polling 상태를 false로 설정
    navigate('/chatlist'); // 이전 페이지로 이동
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <s.ChatLayout
      className="레이아웃"
      ref={chatWrapperRef}
    >
      <ChatHeader
        receiver={senderName}
        defaultColor="#fff"
        messageInitiator={messageInitiator}
        isAccompany={false}
        onBackClick={handleBackNavigation}
        id={infoResult.marketPostId}
        isComplete={infoResult.dealStatus === 'COMPLETE' ? true : false}
      />

      <s.ChatWrapper>
        {chatList && chatList.length > 0 ? (
          chatList.map((data, index) => (
            <s.ChatContainer key={index}>
              {data.userId === userInfo.id ? (
                <s.SentChatWrapper>
                  <s.Time>{showDate(data.createdAt)}</s.Time>
                  <SentChatBubble
                    color={defaultColor}
                    text={data.message}
                  />
                </s.SentChatWrapper>
              ) : (
                <s.ReceivedChatWrapper>
                  <ReceivedChatBubble
                    color={defaultColor}
                    text={data.message}
                  />
                  <s.Time>{showDate(data.createdAt)}</s.Time>
                </s.ReceivedChatWrapper>
              )}
            </s.ChatContainer>
          ))
        ) : (
          <></>
        )}
        {isFetchingNextPage && <Loading />}
        <div
          ref={topObserverRef}
          style={{
            display: isFetchingNextPage ? 'none' : 'block', // 조건부 표시
          }}
        />
      </s.ChatWrapper>
      <TradeChatInfo
        messageInitiator={messageInitiator}
        roomId={roomId}
        setPostId={setPostId}
        infoResult={infoResult}
      />
      <s.TradeBackground />
      <ChatInput
        roomId={roomId}
        currentUserId={userInfo.id}
        addNewMessage={addNewMessage}
        chatListRef={chatListRef}
      />
    </s.ChatLayout>
  );
};

export default TradeChat;
