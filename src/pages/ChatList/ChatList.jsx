import PageHeader from '../../components/PageHeader/PageHeader';
import BottomTabNav from '../../components/BottomTabNav/BottomTabNav';
import * as s from './ChatListStyled';
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SingleAccompanyChat from '../../components/ChatList/SingleChat/SingleAccompanyChat';
import SingleTradeChat from '../../components/ChatList/SingleChat/SingleTradeChat';
import NoContent from '../../components/NoContent/NoContent';
import Loading from '../../components/Loading/Loading';
import img from '../../assets/images/country_flag/000.svg';
import useFetchChatList from '../../hooks/useFetchChatList';
import { showDate } from '../../components/Common/InfoExp';

import { GET_TRADE_LIST, GET_ACCOMPANY_LIST } from '../../api/urls';
import { getData } from '../../api/Functions';
//test
const ChatList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentMode, setCurrentMode] = useState('accompany');

  //채팅 모드 바꾸는 함수
  const handleModeChange = (mode) => () => {
    if (currentMode !== mode) {
      setCurrentMode(mode);
    }
  };

  useEffect(() => {
    console.log('Current Mode:', currentMode);
  }, [currentMode]);

  const token = localStorage.getItem('AToken');

  const { chatList: accompanyChatResult } = useFetchChatList(
    GET_ACCOMPANY_LIST,
    token,
    { page: 0, size: 20 },
    currentMode,
    'accompany',
  );

  const { chatList: tradeChatResult } = useFetchChatList(
    GET_TRADE_LIST,
    token,
    { page: 0, size: 20 },
    currentMode,
    'trade',
  );

  return (
    <s.ChatListLayout>
      <PageHeader
        pageName="채팅"
        nav="/"
      />
      {/*위쪽 버튼*/}
      <s.ModeContainer>
        <s.ModeButton
          onClick={handleModeChange('accompany')}
          $active={currentMode === 'accompany'}
        >
          동행 구하기
        </s.ModeButton>
        <s.ModeButton
          onClick={handleModeChange('trade')}
          $active={currentMode === 'trade'}
        >
          물품거래
        </s.ModeButton>
      </s.ModeContainer>

      {isLoading ? (
        <Loading />
      ) : currentMode === 'accompany' ? ( //동행 구하기
        <>
          {accompanyChatResult && accompanyChatResult.length > 0 ? (
            accompanyChatResult.map((data) => (
              <s.ChatListWrapper>
                <SingleAccompanyChat
                  key={data.roomId}
                  roomId={data.roomId}
                  time={data.lastChatTime !== null ? data.lastChatTime : ''}
                  message={
                    data.lastMessage !== null
                      ? data.lastMessage
                      : '채팅을 시작해보새요!'
                  }
                  senderName={data.senderName}
                  location={data.country}
                />
                <s.Line />
              </s.ChatListWrapper>
            ))
          ) : (
            <NoContent
              content="채팅 내역"
              style={{ paddingBottom: '10rem' }}
            />
          )}
        </>
      ) : (
        //물품거래
        <>
          {tradeChatResult && tradeChatResult.length > 0 ? (
            tradeChatResult.map((data) => (
              <s.ChatListWrapper>
                <SingleTradeChat
                  key={data.roomId}
                  nickName={data.senderName}
                  roomId={data.roomId}
                  img={data.profileImg}
                  time={
                    data.lastChatTime !== null
                      ? showDate(data.lastChatTime)
                      : ''
                  }
                  message={
                    data.lastMessage !== null
                      ? data.lastMessage
                      : '새로운 채팅을 시작해보새요!'
                  }
                />
                <s.Line />
              </s.ChatListWrapper>
            ))
          ) : (
            <NoContent
              content="채팅 내역"
              style={{ paddingBottom: '10rem' }}
            />
          )}
        </>
      )}

      <BottomTabNav />
    </s.ChatListLayout>
  );
};

export default ChatList;
