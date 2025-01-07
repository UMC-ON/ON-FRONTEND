import React from 'react';
import * as s from './ChatHeaderStyled.jsx';
import {
  POST_RECRUIT_COMPLETE,
  POST_TRADE_COMPLETE,
  GET_PARTICIPANT_STATUS,
} from '../../api/urls.jsx';
import { getData, postData, putData } from '../../api/Functions.jsx';
import { useState } from 'react';
import Loading from '../Loading/Loading.jsx';
import { useEffect } from 'react';

const ChatHeader = ({
  messageInitiator,
  receiver,
  defaultColor,
  isAccompany,
  onBackClick,
  isRecruitComplete,
  setError,
  roomId,
  senderId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(isRecruitComplete);

  const handleAccComplete = async () => {
    try {
      const confirm = window.confirm(`${receiver}님과 동행하기로 하시겠어요?`);
      if (confirm) {
        setIsLoading(true);
        const response = await postData(
          POST_RECRUIT_COMPLETE(roomId),
          {},
          {
            Authorization: `Bearer ${localStorage.getItem('AToken')}`,
          },
          {},
        );
        if (response.status == 200) {
          setIsLoading(false);
          alert(
            `${receiver}님과 동행이 성공적으로 확정되었습니다. 멋진 여정이 되길 바랍니다.`,
          );
          window.location.reload(); // 화면 새로고침
        } else alert('다시 시도해주시길 바랍니다.');
      }
    } catch (error) {
      setIsLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    console.log(isRecruitComplete);
  }, []);

  const handleTradeComplete = () => {
    try {
      const confirm = window.confirm(`${receiver}님과 거래하기로 하시겠어요?`);
      if (confirm) {
        setIsLoading(true);
        putData(
          POST_TRADE_COMPLETE(roomId),
          {},
          {
            Authorization: `Bearer ${localStorage.getItem('AToken')}`,
          },
          { marketPostId: roomId },
        );
        window.location.reload(); // 화면 새로고침
      }
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchStatusInfo = async () => {
      try {
        const response = await getData(
          GET_PARTICIPANT_STATUS(senderId, roomId),
          {
            Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
          },
          {},
        );

        if (response.data.companyParticipantStatus === 'PARTICIPANT') {
          setIsComplete(true);
        }
      } catch (error) {
        setError(true);
      }
    };
    if (!messageInitiator && isAccompany) {
      fetchStatusInfo();
    }
  }, []);

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
