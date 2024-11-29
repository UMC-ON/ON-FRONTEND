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
// apiClient.interceptors.request.use((config) => {
//   if (config.headers['Authorization']) {
//     config.headers['Authorization'] = `Bearer ${token}`;
//   }
// });

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.config.headers['Authorization']) {
      const prevRequest = error.config;
      console.log(error.response.status);
      console.log('여기까진 되나');
      if (
        error.response.status == Number(403) ||
        error.response.status == Number(401)
      ) {
        console.log('아아');
        const aToken = localStorage.getItem('AToken');
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
        console.log('만료아님');
        console.log(exp);
        console.log(now);
        if (exp < now && !isRefreshing) {
          console.log('만료 토큰');

          try {
            const rToken = localStorage.getItem('RToken');
            const res = await postData(NEW_TOKEN, rToken, {
              'Content-Type': 'text/plain',
            });
            console.log('하는중');
            console.log(res);
            if (res.status == 200) {
              console.log('토큰 재발급 성공');
              const { grantType, accessToken, refreshToken } = res.data;
              localStorage.setItem('grantType', grantType);
              localStorage.setItem('AToken', accessToken); // accessToken을 localStorage에 저장
              localStorage.setItem('RToken', refreshToken); // refreshToken을 localStorage에 저장
              prevRequest.headers['Authorization'] = `Bearer ${accessToken}`;
              console.log(error.config);
              return apiClient(prevRequest);
            }
          } catch (err) {
            console.error('Token 갱신 실패', err);
          }
        }
      }
    }
    return Promise.reject(error); // 에러를 상위로 전달
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
  try {
    const response = await apiClient.post(url, formData, {
      headers: { ...headers },
      params: { ...params },
    });
    console.log('Response:', response);
    return response;
  } catch (error) {
    console.error('Error occurred during POST request:', error);
    throw error; // 에러를 상위로 전달하여 handleSubmitBE에서 처리하도록 함
  }
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
      console.log('put response:', response);
      return response;
    })
    .catch((error) => {
      console.log('put error: ', error);
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
