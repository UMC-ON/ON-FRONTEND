import axios from 'axios';
import base64 from 'base-64';
import { GET_USER_INFO, NEW_TOKEN, SIGN_IN_URL } from './urls';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadUser, loginFailure } from '../redux/actions';

const serverAddress = import.meta.env.VITE_SERVER_ADDRESS;
let isRefreshing = false;
let isSignedOut = false;

const apiClient = axios.create({
  baseURL: serverAddress + '/',
  headers: {
    'Content-Type': 'application/json',
  },
});
export const Interceptor = ({ children }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  let userInfo = useSelector((state) => state.user.user);
  useEffect(() => {
    apiClient.interceptors.response.use(
      (res) => {
        console.log(res);
        if (isSignedOut && res.config?.url == '/api/v1/user/sign-in') {
          isSignedOut = false;
        }
        return res;
      },
      async (error) => {
        if (!isSignedOut) {
          console.log(error);
          if (error.config.headers['Authorization']) {
            console.log('인증 토큰이 필요한 경우');
            let prevRequest = error.config;
            console.log(error.response.status);

            if (
              (!isSignedOut && error.response.status == Number(403)) ||
              error.response.status == Number(401)
            ) {
              console.log('그러나 인증 토큰이 없거나 유효하지 않은 경우');
              const aToken = localStorage.getItem('AToken')
                ? localStorage.getItem('AToken')
                : null;
              if (aToken) {
                console.log('기존 토큰이 있기는 한 상태');
                let payload = aToken.substring(
                  aToken.indexOf('.') + 1,
                  aToken.lastIndexOf('.'),
                );
                let dec = JSON.parse(base64.decode(payload));
                const exp = dec.exp;
                let timestamp = new Date().getTime();
                let now = Number(
                  timestamp.toString().slice(0, String(timestamp).length - 3),
                );
                console.log(exp);
                console.log(now);
                if (exp < now && !isRefreshing) {
                  isRefreshing = true;
                  console.log('그리고 토큰이 만료된 경우');
                  const rToken = localStorage.getItem('RToken');
                  console.log('토큰 갱신을 시도한다.');
                  console.log(userInfo);
                  const response = await apiClient
                    .post(NEW_TOKEN, rToken, {
                      headers: { 'Content-Type': 'text/plain' },
                    })
                    .then((res) => {
                      console.log('토큰 재발급 성공');
                      console.log(res);
                      const { grantType, accessToken, refreshToken } = res.data;
                      localStorage.setItem('grantType', grantType);
                      localStorage.setItem('AToken', accessToken); // accessToken을 localStorage에 저장
                      localStorage.setItem('RToken', refreshToken); // refreshToken을 localStorage에 저장
                      prevRequest.headers['Authorization'] =
                        `Bearer ${accessToken}`;

                      return apiClient(prevRequest);
                    })
                    .catch((err) => {
                      console.log(err);
                      console.log('토큰 갱신 실패');
                      dispatch(loginFailure('Failed to fetch user info'));

                      return Promise.reject(err);
                      //return err;
                    });
                  isRefreshing = false;
                  return response;
                } else if (exp < now && isRefreshing) {
                  console.log('토큰 재발급 중이라 api 재호출이 안됩니다.');
                  return Promise.reject(error);
                } else {
                  console.log('토큰이 만료되지 않은 경우');
                  console.log('이상한 토큰일 가능성...');
                }
              } else {
                isSignedOut = true;
                console.log('토큰이 있지도 않음');
                alert('시작 화면으로 이동합니다.');

                nav('/landing');
              }
            }
          } else {
            isSignedOut = true;
            console.log('인증 토큰이 필요하진 않지만 에러가 났다');
            dispatch(loginFailure('Failed to fetch user info'));
            alert('로그인이 필요합니다.');
            nav('/signIn');
          }
          isRefreshing = false;
          return Promise.reject(error);
        }
      },
    );
  }, []);
  return children;
};

const multipartApiClient = axios.create({
  baseURL: serverAddress + '/',
  headers: {
    'Content-Type': 'multipart/form-data;',
  },
});

///일반, content-type이 application/json인 post,get,put///
///url,formData만 필수///
export const postData = async (url, formData, headers = {}, params = {}) => {
  const response = await apiClient
    .post(url, formData, { headers: { ...headers }, params: { ...params } })
    .then((response) => {
      console.log('formData', formData);
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });

  return response;
};

export const getData = async (url, headers = {}, params = {}) => {
  const response = await apiClient
    .get(url, { headers: { ...headers }, params: { ...params } })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });

  return response;
};
export const putData = async (url, formData, headers = {}, params = {}) => {
  const response = await apiClient
    .put(url, formData, { headers: { ...headers }, params: { ...params } })
    .then((response) => {
      console.log('put response:', response);
      return response;
    })
    .catch((error) => {
      console.log('put error: ', error);
      return Promise.reject(error);
    });

  return response;
};

////이미지 전송 등 multipart/form-data 형식의 post///
export const multiFilePostData = async (
  url,
  formData,
  headers = {},
  params = {},
) => {
  const response = await multipartApiClient
    .post(url, formData, { headers: { ...headers }, params: { ...params } })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });

  return response;
};

export const deleteData = async (url, headers = {}, params = {}) => {
  const response = await apiClient
    .delete(url, { headers: { ...headers }, params: { ...params } })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });

  return response;
};
