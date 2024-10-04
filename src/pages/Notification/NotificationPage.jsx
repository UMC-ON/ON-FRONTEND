import PageHeader from '../../components/PageHeader/PageHeader';
import * as s from './NotificationPageStyled';
import notification_circle from '../../assets/images/notification_circle.svg';
import NoContent from '../../components/NoContent/NoContent';
import { getData } from '../../api/Functions';
import { useEffect, useState } from 'react';
import { GET_ALERT_LIST } from '../../api/urls';
import Loading from '../../components/Loading/Loading';
import SingleNotification from '../../components/Notification/SingleNotification';

const Notification = () => {
  // const [notification, setNotification] = useState([
  //   {
  //     id: 1,
  //     title: '제로님이 채팅을 시작했어요.',
  //     content:
  //       '다음 글에서 시작된 채팅이에요: 영국 버로우 마켓 동행하실 분 찾아요!다음 글에서 시작된 채팅이에요: 영국 버로우 마켓 동행하실 분 찾아요!다음 글에서 시작된 채팅이에요: 영국 버로우 마켓 동행하실 분 찾아요!다음 글에서 시작된 채팅이에요: 영국 버로우 마켓 동행하실 분 찾아요!',
  //     alertType: 'COMPANY',
  //     alertConnectId: 21,
  //   },
  //   {
  //     id: 2,
  //     title: '새로운 대댓글이 달렸어요',
  //     content: '그러면 6개월 전부터 시도해 보면 괜찮을까요? ',
  //     alertType: 'COMPANY',
  //     alertConnectId: 21,
  //   },
  //   {
  //     id: 3,
  //     title: '거래가 완료되었어요.',
  //     content: '다음 글에서 시작된 거래에요: 작은 냄비 싸게 팔아요.',
  //     alertType: 'COMPANY',
  //     alertConnectId: 21,
  //   },
  //   {
  //     id: 4,
  //     title: '새로운 댓글이 달렸어요.',
  //     content: 'ㄱㄱ',
  //     alertType: 'COMPANY',
  //     alertConnectId: 21,
  //   },
  // ]);
  const [notification, setNotification] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNotification = async () => {
      setIsLoading(true);
      try {
        const response = await getData(
          GET_ALERT_LIST,
          {
            Authorization: `Bearer ${localStorage.getItem('AToken')}`,
          },
          {},
        );

        // 응답 데이터의 구조를 확인하고 유효성을 검사
        console.log('Received data:', response.data); // 전체 응답 데이터 확인
        setNotification(response.data); // 상태 업데이트
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotification();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <s.NotificationLayout>
      <PageHeader pageName="알림" />
      {notification && notification.length > 0 ? (
        <>
          <s.NotificationWrapper>
            {notification.map((data) => (
              <SingleNotification
                key={data.alertId}
                id={data.alertId}
                title={data.title}
                content={data.content}
                alertType={data.alertType}
                alertConnectId={data.alertConnectId}
                read={data.read}
              />
            ))}
          </s.NotificationWrapper>
          <s.NotificationEnd>알람 내역의 마지막입니다.</s.NotificationEnd>
          <s.Background />
        </>
      ) : (
        <NoContent content="알림 내역" />
      )}
    </s.NotificationLayout>
  );
};

export default Notification;
