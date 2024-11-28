import axios from 'axios';
import base64 from 'base-64';
import { NEW_TOKEN } from './urls';
import { useSelector, useDispatch } from 'react-redux';
const serverAddress = import.meta.env.VITE_SERVER_ADDRESS;
let isRefreshing = false;
const apiClient = axios.create({
  baseURL: serverAddress + '/',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.config.headers['Authorization']) {
      console.log('인증 토큰이 필요한 경우');
      const prevRequest = error.config;
      console.log(error.response.status);
      if (
        error.response.status == Number(403) ||
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
                prevRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                console.log(error.config);
                return apiClient(prevRequest);
              })
              .catch((err) => {
                console.log(err);
                console.log('토큰 갱신 실패');
                return Promise.reject(err);
                //return err;
              });
            isRefreshing = false;
            return response;
          } else if (exp < now && isRefreshing) {
            console.log('만료된 토큰 재발급 중');
            return null;
          } else {
            console.log('토큰이 만료되지 않은 경우');
            console.log('이상한 토큰일 가능성...');
          }
        } else {
          console.log('토큰이 있지도 않음');
        }
      }
    } else {
      console.log('인증 토큰이 필요하진 않지만 에러가 났다');
    }

    return Promise.reject(error);
  },
);

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
      return error;
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
      return null;
    });

  return response;
};
export const putData = async (url, formData, headers = {}, params = {}) => {
  const response = await apiClient
    .put(url, formData, { headers: { ...headers }, params: { ...params } })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return null;
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
      return null;
    });

  return response;
};
