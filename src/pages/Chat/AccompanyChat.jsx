import { useState, useEffect, useRef } from 'react';
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
import { GET_ACCOMPANY_CHAT } from '../../api/urls';
import { getData } from '../../api/Functions';

// import { useParams } from 'react-router-dom';

const AccompanyChat = () => {
  const [messageInitiator, setMessageInitiator] = useState();
  //인포 백그라운드, 채팅 버블 색상
  const [defaultColor, setDefaultColor] = useState('');
  //글씨, 헤더 색상
  const [pointColor, setPointColor] = useState('');
  //채팅 상대방
  const [receiver, setReceiver] = useState('');
  //현재 유저 아이디
  //채팅 말, 보낸 유저 아이디 담기
  const [chatList, setChatList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const { roomId, senderName } = location.state || {}; // Destructure selectedCountry from location.state

  const navigate = useNavigate(); // useNavigate 사용
  const chatWrapperRef = useRef(null); // 채팅 메시지 영역에 대한 참조 생성
  const chatListRef = useRef(chatList); // 최신 chatList를 관리하는 ref
  const pollingRef = useRef(true); // 롱 폴링 상태를 관리하는 ref

  const userInfo = useSelector((state) => state.user.user);

  // const { roomId } = useParams();

  // chatList 상태가 변경될 때마다 chatListRef도 업데이트
  useEffect(() => {
    chatListRef.current = chatList;
  }, [chatList]);

  //axios 동행 구하기
  useEffect(() => {
    const fetchAccompanyChat = async () => {
      setIsLoading(true);
      try {
        const response = await getData(
          GET_ACCOMPANY_CHAT(roomId),
          {
            Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
          },
          { roomId: roomId },
        );

        if (response) {
          console.log('콘솔', response.data);
          if (
            response.data.content[0].chatList &&
            response.data.content[0].chatList.length > 0
          ) {
            setChatList(response.data.content[0].chatList);
          } else {
            setChatList([]);
          }
          // 첫 번째 채팅 메시지의 userId와 currentUserId 비교
          if (response.data.content[0].chatUserOne === userInfo.id) {
            setMessageInitiator(true); // 현재 유저가 첫 번째 메시지를 보낸 경우
            setReceiver(response.data.content[0].chatUserTwo);
            setDefaultColor('rgba(194, 199, 255, 1)');
            setPointColor('rgba(173, 153, 255, 1)');
          } else {
            setMessageInitiator(false); // 현재 유저가 첫 번째 메시지를 보내지 않은 경우
            setReceiver(response.data.content[0].chatUserOne);
            setDefaultColor('rgba(217, 236, 255, 1)');
            setPointColor('rgba(132, 180, 255, 1)');
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccompanyChat();
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

  // useEffect(() => {
  //   const abortController = new AbortController();
  //   pollingRef.current = true;

  //   const startLongPolling = async () => {
  //     while (pollingRef.current) {
  //       try {
  //         const response = await getData(
  //           GET_ACCOMPANY_CHAT(roomId),
  //           {
  //             Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
  //             signal: abortController.signal, // signal 추가
  //           },
  //           { roomId: roomId },
  //         );

  //         if (response) {
  //           const newMessages = response.data.content[0].chatList;
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
  //       await new Promise((resolve) => setTimeout(resolve, 10000));
  //     }
  //   };

  //   startLongPolling();

  //   return () => {
  //     pollingRef.current = false; // 컴포넌트 언마운트 시 polling 중지
  //     abortController.abort(); // 요청 취소
  //   };
  // }, [roomId]);

  useEffect(() => {
    scrollToBottom();
  }, [chatList]);

  const handleBackNavigation = () => {
    // pollingRef.current = false; // polling 상태를 false로 설정
    navigate('/chatlist'); // 이전 페이지로 이동
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <s.ChatLayout>
      <ChatHeader
        receiver={senderName}
        defaultColor={defaultColor}
        messageInitiator={messageInitiator}
        isAccompany={true}
        onBackClick={handleBackNavigation}
        id={roomId}
        isComplete={true}
      />
      <AccompanyChatInfo
        messageInitiator={messageInitiator}
        roomId={roomId}
        userName={senderName}
        defaultColor={defaultColor}
        pointColor={pointColor}
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
      </s.ChatWrapper>
      <s.Background
        $backgroundimageurl={
          messageInitiator ? PurpleBackground : BlueBackground
        }
      />
      <ChatInput
        roomId={roomId}
        currentUserId={userInfo.id}
        addNewMessage={addNewMessage}
      />
    </s.ChatLayout>
  );
};

export default AccompanyChat;
