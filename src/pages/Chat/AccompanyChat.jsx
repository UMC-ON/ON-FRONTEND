import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as s from './ChatStyled';
import ChatHeader from '../../components/Chat/ChatHeader';
import AccompanyChatInfo from '../../components/Chat/AccompanyChatInfo';
import SentChatBubble from '../../components/Chat/SentChatBubble';
import ReceivedChatBubble from '../../components/Chat/ReceivedChatBubble';
import ChatInput from '../../components/Chat/ChatInput';
import BlueBackground from '../../assets/images/chat_background_blue.svg';
import PurpleBackground from '../../assets/images/chat_background_purple.svg';
import Loading from '../../components/Loading/Loading';
import { useSelector } from 'react-redux';
import { showDate } from '../../components/Common/InfoExp';
import { useInfiniteQuery } from 'react-query';
import { GET_ACCOMPANY_CHAT, GET_ACCOMPANY_INFO } from '../../api/urls';
import { getData } from '../../api/Functions';

const AccompanyChat = () => {
  const [isFirstLoadComplete, setIsFirstLoadComplete] = useState(false); // 첫 로드 완료 상태
  const [infoResult, setInfoResult] = useState([]);
  const [isRecruitComplete, setIsRecruitComplete] = useState();
  const [defaultColor, setDefaultColor] = useState('');
  const [pointColor, setPointColor] = useState('');
  const [messageInitiator, setMessageInitiator] = useState();

  const location = useLocation();
  const { roomId, senderName } = location.state || {};
  const navigate = useNavigate();
  const chatWrapperRef = useRef(null); // 채팅 래퍼의 Ref
  const userInfo = useSelector((state) => state.user.user);
  const topObserverRef = useRef(null); // 상단 감지용 Ref
  const [scroll, setScroll] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);

  // 초기 채팅 설정 함수
  const initialChatSetting = (response) => {
    if (response.data.content[0].chatUserOne === userInfo.id) {
      setMessageInitiator(true);
      setDefaultColor('rgba(194, 199, 255, 1)');
      setPointColor('rgba(173, 153, 255, 1)');
    } else {
      setMessageInitiator(false);
      setDefaultColor('rgba(217, 236, 255, 1)');
      setPointColor('rgba(132, 180, 255, 1)');
    }
  };

  // 채팅 메시지 불러오기
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      ['chatMessages', roomId],
      async ({ pageParam = 0 }) => {
        setIsFetchingData(true);
        const response = await getData(
          GET_ACCOMPANY_CHAT(roomId),
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
  const chatList =
    data?.pages?.flatMap((page) => page.content?.[0]?.chatList || []) || [];

  //첫 로딩 시 스크롤 아래로
  useLayoutEffect(() => {
    if (chatWrapperRef.current) {
      chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
      // console.log('Scroll moved after rendering.');
      setIsFirstLoadComplete(true);
    }
  }, [scroll]);

  // 상단 감지용 IntersectionObserver
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

  //////// 동행 정보 불러오기
  useEffect(() => {
    const fetchAccompanyInfo = async () => {
      try {
        const response = await getData(
          GET_ACCOMPANY_INFO(roomId),
          {
            Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
          },
          { roomId },
        );

        if (response) {
          setInfoResult(response.data);
          setIsRecruitComplete(
            response.data.participantNumber === response.data.recruitNumber,
          );
        }
      } catch (error) {
        console.error('Error fetching accompany info:', error);
      }
    };
    fetchAccompanyInfo();
  }, [roomId]);
  useEffect(() => {
    console.log(isFetchingData);
  }, [isFetchingData]);

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
        defaultColor={defaultColor}
        messageInitiator={messageInitiator}
        isAccompany={true}
        onBackClick={() => navigate('/chatlist')}
        id={roomId}
        isComplete={isRecruitComplete}
      />

      <s.ChatWrapper>
        {chatList.map((data, index) => (
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
        ))}
        {isFetchingNextPage && <Loading />}
        <div
          ref={topObserverRef}
          style={{
            display: isFetchingNextPage ? 'none' : 'block', // 조건부 표시
          }}
        />

        {/* 상단 감지용 요소 */}
      </s.ChatWrapper>
      <AccompanyChatInfo
        messageInitiator={messageInitiator}
        userName={senderName}
        pointColor={pointColor}
        infoResult={infoResult}
      />
      <s.Background
        $backgroundimageurl={
          messageInitiator ? PurpleBackground : BlueBackground
        }
      />
      <ChatInput
        roomId={roomId}
        currentUserId={userInfo.id}
        addNewMessage={(newMessage) => {
          chatList.unshift(newMessage); // 새로운 메시지를 채팅 목록에 추가
        }}
      />
    </s.ChatLayout>
  );
};

export default AccompanyChat;
