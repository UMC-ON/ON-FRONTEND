import React from 'react';
import * as s from './ChatHeaderStyled.jsx';
import { POST_RECRUIT_COMPLETE, POST_TRADE_COMPLETE } from '../../api/urls.jsx';
import { postData, putData } from '../../api/Functions.jsx';
import { useState } from 'react';
import Loading from '../Loading/Loading.jsx';

const ChatHeader = ({
  messageInitiator,
  receiver,
  defaultColor,
  isAccompany,
  onBackClick,
  id,
  isComplete,
  setError,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAccComplete = async () => {
    try {
      setIsLoading(true);
      const response = await postData(
        POST_RECRUIT_COMPLETE(id),
        {},
        {
          Authorization: `Bearer ${localStorage.getItem('AToken')}`,
        },
        {},
      );
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTradeComplete = () => {
    try {
      setIsLoading(true);
      putData(
        POST_TRADE_COMPLETE(id),
        {},
        {
          Authorization: `Bearer ${localStorage.getItem('AToken')}`,
        },
        { marketPostId: id },
      );
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <s.ChatHeaderLayout style={{ backgroundColor: `${defaultColor}` }}>
      <s.BackButton onClick={onBackClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="16"
          viewBox="0 0 10 16"
          fill="none"
          positions="fixed"
        >
          <path
            d="M8 2L1.8858 7.24074C1.42019 7.63984 1.42019 8.36016 1.8858 8.75926L8 14"
            stroke={isAccompany ? '#fff' : '#7A7A7A'}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </s.BackButton>
      <s.PageName style={{ color: isAccompany ? '#ffffff' : '#ABB4FF' }}>
        {receiver}
      </s.PageName>

      {!messageInitiator &&
        (isComplete ? (
          <s.CompletedBtn>
            {isAccompany ? '모집 완료' : '거래 완료'}
          </s.CompletedBtn>
        ) : (
          <s.CompleteBtn
            onClick={isAccompany ? handleAccComplete : handleTradeComplete}
          >
            {isAccompany ? '모집 완료' : '거래 완료'}
          </s.CompleteBtn>
        ))}
    </s.ChatHeaderLayout>
  );
};

export default ChatHeader;
