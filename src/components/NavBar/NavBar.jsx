import { NavLink, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import * as s from './NavBarStyled.jsx';
import on_logo from '../../assets/images/On_FinalLogo.svg';
import profile from '../../assets/images/profile.svg';
import search_button from '../../assets/images/search_button.svg';
import notification from '../../assets/images/notification.svg';
import { getData } from '../../api/Functions.jsx';
import { GET_ALERT_NUM } from '../../api/urls.jsx';
import ErrorScreen from '../ErrorScreen.jsx';

const NavBar = () => {
  const [notificationNumber, setNotificationNumber] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchNotification = async () => {
      setIsLoading(true);
      try {
        const response = await getData(
          GET_ALERT_NUM,
          {
            Authorization: `Bearer ${localStorage.getItem('AToken')}`,
          },
          {},
        );
        // 응답 데이터의 구조를 확인하고 유효성을 검사
        setNotificationNumber(response.data.isNotReadAlert); // 상태 업데이트
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotification();
  }, []);

  if (error) {
    return <ErrorScreen />;
  }
  return (
    <s.NavbarLayout>
      <NavLink to="/">
        <s.Logo src={on_logo} />
      </NavLink>
      <s.ComponentContainer>
        <NavLink to="/search">
          <s.Item src={search_button} />
        </NavLink>
        <NavLink to="/notification">
          <s.NotificationBox>
            <s.Item src={notification} />
            <s.NotificationCount></s.NotificationCount>
          </s.NotificationBox>
        </NavLink>
        <NavLink to="/mypage">
          <s.Item src={profile} />
        </NavLink>
      </s.ComponentContainer>
    </s.NavbarLayout>
  );
};

export default NavBar;
