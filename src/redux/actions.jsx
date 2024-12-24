// redux/actions/authActions.js
import { GET_USER_INFO } from '../api/urls';
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, LOAD_USER } from './actionTypes';
//import { getData } from '../api/Functions';
//import { useNavigate } from 'react-router-dom';
//import { useEffect } from 'react';
//import axios from 'axios';
//import { requestNotificationPermissionOnce } from '../service/notificationPermission';

// 로그인 성공 액션
export const loginSuccess = (user) => {
  //console.log(user);
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
// 새로고침 시 토큰을 로드하고 유저 정보를 가져오는 액션
export const loadUser = (user, accessToken) => {
  // console.log(user);
  return {
    type: LOAD_USER,
    payload: { user: user, accessToken: accessToken },
  };
};
