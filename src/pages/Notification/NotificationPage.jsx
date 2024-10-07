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
          { sort: 'createdAt%2Cdesc' },
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
