// redux/actions/authActions.js
import { GET_USER_INFO } from '../api/urls';
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, LOAD_USER } from './actionTypes';
import { getData } from '../api/Functions';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { requestNotificationPermissionOnce } from '../service/notificationPermission';

// 로그인 성공 액션
export const loginSuccess = (user) => {
  console.log(user);
  return {
    type: LOGIN_SUCCESS,
    payload: { user },
  };
};

// 로그인 실패 액션
export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

// 로그아웃 액션
export const logout = () => {
  localStorage.removeItem('AToken'); // 로그아웃 시 토큰을 localStorage에서 제거
  localStorage.removeItem('RToken');
  return {
    type: LOGOUT,
  };
};
let isRefreshing = false;
// 새로고침 시 토큰을 로드하고 유저 정보를 가져오는 액션
export const loadUser = async (abortOption = null) => {
  if (!isRefreshing) {
    return async (dispatch) => {
      isRefreshing = true;
      const accessToken = localStorage.getItem('AToken');
      if (accessToken) {
        console.log('액션 요청');
        await getData(
          // 토큰을 사용해 유저 정보를 가져옴
          GET_USER_INFO,
          {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        )
          .then((res) => {
            if (res.status != 'Refreshing Token') {
              let user = res.data;
              console.log('유저 세팅중');
              console.log(res);
              console.log(user);
              dispatch({
                type: LOAD_USER,
                payload: { user, accessToken },
              });
              requestNotificationPermissionOnce();
              isRefreshing = false;
            } else {
              console.log('토큰 재발행 중...');
            }
          })
          .catch((error) => {
            console.log(error);
            console.log('유저 정보 받아오기 api 에러');
            dispatch(loginFailure('Failed to fetch user info'));
            dispatch(logout()); // 에러 발생 시 로그아웃 처리
            alert('로그인이 필요합니다.');
            isRefreshing = false;
            nav('/signIn');
          });
      } else {
        console.log('토큰이 없음');
        dispatch(logout()); // 토큰이 없으면 로그아웃 상태로 설정
        const res = confirm('시작 화면으로 이동합니다..');
        isRefreshing = false;
        nav('/landing');
      }
    };
  } else {
    console.log('리턴 널');
    return null;
  }
};
