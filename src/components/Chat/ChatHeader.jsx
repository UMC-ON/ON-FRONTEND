import React from 'react';
import * as s from './ChatHeaderStyled.jsx';
import { POST_RECRUIT_COMPLETE } from '../../api/urls.jsx';
import { postData } from '../../api/Functions.jsx';

const ChatHeader = ({
  messageInitiator,
  receiver,
  pointColor,
  isAccompany,
  onBackClick,
  roomId,
}) => {
  const pointColorOpacity = (e) => {
    return `${pointColor.replace('1)', ` ${e})`)}`;
  };

  const handleComplete = () => {
    try {
      postData(
        POST_RECRUIT_COMPLETE(roomId),
        {},
        {
          Authorization: `Bearer ${localStorage.getItem('AToken')}`,
        },
        {},
      );
    } catch (error) {
      console.error('Error posting data', error);
    }
  };

  return (
    <s.ChatHeaderLayout color={'#DED6FF'}>
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

      {!messageInitiator && (
        <s.CompleteBtn onClick={() => handleComplete()}>
          {isAccompany ? '모집 완료' : '거래 완료'}
        </s.CompleteBtn>
      )}
    </s.ChatHeaderLayout>
  );
};

export default ChatHeader;
