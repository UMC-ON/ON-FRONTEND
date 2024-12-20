import { useState, useEffect, useRef } from 'react';
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

import { GET_TRADE_CHAT, GET_TRADE_INFO } from '../../api/urls';
import { getData } from '../../api/Functions';

const TradeChat = () => {
  const [messageInitiator, setMessageInitiator] = useState();
  const [defaultColor, setDefaultColor] = useState(''); // 채팅 버블의 기본 색상 설정
  const [currentUserId, setCurrentUserId] = useState(null); // 현재 유저의 ID 저장
  const [chatList, setChatList] = useState([]); // 채팅 메시지 리스트 저장
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
  const [receiver, setReceiver] = useState('');
  const [postId, setPostId] = useState();
  const [infoResult, setInfoResult] = useState([]);

  const location = useLocation();
  const { roomId, senderName } = location.state || {}; // URL에서 전달된 roomId와 senderName 가져오기

  const navigate = useNavigate(); // useNavigate 사용
  const chatWrapperRef = useRef(null); // 채팅 메시지 영역에 대한 참조 생성
  const chatListRef = useRef(chatList); // 최신 chatList를 관리하는 ref
  const pollingRef = useRef(true); // 롱 폴링 상태를 관리하는 ref

  const userInfo = useSelector((state) => state.user.user);

  // chatList 상태가 변경될 때마다 chatListRef도 업데이트
  useEffect(() => {
    chatListRef.current = chatList;
  }, [chatList]);

  useEffect(() => {
    const fetchTradeInfo = async () => {
      setIsLoading(true);
      try {
        const response = await getData(
          GET_TRADE_INFO(roomId),
          {
            Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
          },
          { roomId: roomId },
        );

        if (response) {
          console.log(response.data);
          setInfoResult(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTradeInfo();
  }, []);

  useEffect(() => {
    const fetchTradeChat = async () => {
      setIsLoading(true);
      try {
        const response = await getData(
          GET_TRADE_CHAT(roomId),
          {
            Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
          },
          { roomId: roomId },
        );

        if (response) {
          if (
            response.data.content[0].chatList &&
            response.data.content[0].chatList.length > 0
          ) {
            setChatList(response.data.content[0].chatList);
          } else {
            setChatList([]);
          }
          console.log('콘솔', response.data.content[0]);

          if (response.data.content[0].chatUserOne === userInfo.id) {
            setMessageInitiator(true);
            setReceiver(response.data.content[0].chatUserTwo);
            setDefaultColor('#C2C7FF'); // 보라색 배경
          } else {
            setMessageInitiator(false); // 현재 유저가 첫 번째 메시지를 보내지 않은 경우
            setReceiver(response.data.content[0].chatUserOne);
            setDefaultColor('#D1E2FF'); // 파란색 배경
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTradeChat();
  }, [roomId]);

  const scrollToBottom = () => {
    if (chatWrapperRef.current) {
      chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
    }
  };

  const addNewMessage = (newMessage) => {
    setChatList((prevChatList) => {
      const updatedChatList = [...prevChatList, newMessage];
      return updatedChatList;
    });
    scrollToBottom();
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatList]);

  // useEffect(() => {
  //   const abortController = new AbortController();
  //   pollingRef.current = true;

  //   const startLongPolling = async () => {
  //     while (pollingRef.current) {
  //       try {
  //         const response = await getData(
  //           GET_TRADE_CHAT(roomId),
  //           {
  //             Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
  //             signal: abortController.signal, // signal 추가
  //           },
  //           { roomId: roomId },
  //         );

  //         if (response) {
  //           const newMessages = response.data.result.chatList;
  //           if (newMessages.length !== chatListRef.current.length) {
  //             setChatList(newMessages);
  //             scrollToBottom();
  //           }
  //         }
  //       } catch (error) {
  //         if (error.name !== 'AbortError') {
  //           console.error('Error fetching new messages:', error);
  //         }
  //       }

  //       // 3초 간격으로 폴링
  //       await new Promise((resolve) => setTimeout(resolve, 3000));
  //     }
  //   };

  //   startLongPolling();

  //   return () => {
  //     pollingRef.current = false; // 컴포넌트 언마운트 시 polling 중지
  //     abortController.abort(); // 요청 취소
  //   };
  // }, [roomId]);

  // navigate(-1)을 사용한 뒤로가기 버튼 클릭 시 롱 폴링을 중지
  const handleBackNavigation = () => {
    pollingRef.current = false; // polling 상태를 false로 설정
    navigate('/chatlist'); // 이전 페이지로 이동
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <s.ChatLayout>
      <ChatHeader
        receiver={senderName}
        defaultColor="#fff"
        messageInitiator={messageInitiator}
        isAccompany={false}
        onBackClick={handleBackNavigation}
        id={infoResult.marketPostId}
        isComplete={infoResult.dealStatus === 'COMPLETE' ? true : false}
      />
      <TradeChatInfo
        messageInitiator={messageInitiator}
        roomId={roomId}
        setPostId={setPostId}
        infoResult={infoResult}
      />
      <s.ChatWrapper ref={chatWrapperRef}>
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
      </s.ChatWrapper>
      <s.TradeBackground />
      <ChatInput
        roomId={roomId}
        currentUserId={userInfo.id}
        addNewMessage={addNewMessage}
      />
    </s.ChatLayout>
  );
};

export default TradeChat;
