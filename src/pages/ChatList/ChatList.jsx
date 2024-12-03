import PageHeader from '../../components/PageHeader/PageHeader';
import BottomTabNav from '../../components/BottomTabNav/BottomTabNav';
import * as s from './ChatListStyled';
import React, { useState } from 'react';
import SingleAccompanyChat from '../../components/ChatList/SingleChat/SingleAccompanyChat';
import SingleTradeChat from '../../components/ChatList/SingleChat/SingleTradeChat';
import NoContent from '../../components/NoContent/NoContent';
import Loading from '../../components/Loading/Loading';
import { useInfiniteQuery } from 'react-query';
import { getData } from '../../api/Functions';
import useFetchChatList from '../../hooks/useFetchChatList';
import { showDate } from '../../components/Common/InfoExp';
import { GET_TRADE_LIST, GET_ACCOMPANY_LIST } from '../../api/urls';

const ChatList = () => {
  const [currentMode, setCurrentMode] = useState('accompany');
  //const token = localStorage.getItem('AToken');

  const fetchChatList = async ({ pageParam = 0 }) => {
    const url =
      currentMode === 'accompany' ? GET_ACCOMPANY_LIST : GET_TRADE_LIST;

    const response = await getData(
      url,
      { Authorization: `Bearer ${localStorage.getItem('AToken')}` },
      { page: pageParam, size: 20 },
    );

    const data = response.data.content[0].roomList;

    // 추가된 for 루프: country 필드 추가
    if (currentMode === 'accompany') {
      for (let i = 0; i < data.length; i++) {
        data[i].country = data[i].location.split(' ')[0];
        console.log(data[i]); // 디버깅용 로그
      }
    }

    return { content: data };
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(['chatList', currentMode], fetchChatList, {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.content.length < 20) return undefined; // 마지막 페이지 도달
        return allPages.length; // 다음 페이지 번호 반환
      },
    });

  const handleModeChange = (mode) => () => {
    if (currentMode !== mode) {
      setCurrentMode(mode);
    }
  };

  const handleScroll = (e) => {
    if (
      e.target.scrollHeight - e.target.scrollTop <=
        e.target.clientHeight + 50 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  const isEmpty =
    !data || (data.pages.length === 1 && data.pages[0].content.length === 0);

  return (
    <s.ChatListLayout
      style={{ overflowY: 'auto', height: '100vh' }}
      onScroll={handleScroll}
    >
      <PageHeader
        pageName="채팅"
        nav="/"
      />
      {/* 위쪽 버튼 */}
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
      ) : isEmpty ? (
        <NoContent
          content="채팅 내역"
          style={{ paddingBottom: '10rem' }}
        />
      ) : (
        data?.pages.map((page) =>
          page.content.map((data) => (
            <s.ChatListWrapper key={data.roomId}>
              {console.log(data)}
              {currentMode === 'accompany' ? (
                <SingleAccompanyChat
                  roomId={data.roomId}
                  time={
                    data.lastChatTime !== null
                      ? showDate(data.lastChatTime)
                      : ''
                  }
                  message={
                    data.lastMessage !== null
                      ? data.lastMessage
                      : '채팅을 시작해보새요!'
                  }
                  senderName={data.senderName}
                  location={data.country} // country 필드 사용
                />
              ) : (
                <SingleTradeChat
                  senderName={data.senderName}
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
              )}
              <s.Line />
            </s.ChatListWrapper>
          )),
        )
      )}
      {isFetchingNextPage && <Loading />}

      <BottomTabNav />
    </s.ChatListLayout>
  );
};

export default ChatList;
