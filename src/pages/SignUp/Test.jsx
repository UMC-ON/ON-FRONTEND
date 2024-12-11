import { useEffect, useState } from 'react';
import { postData } from '../../api/Functions';
import { NEW_TOKEN } from '../../api/urls';

const Test = () => {
  const [prev, setPrev] = useState('');
  const [cur, setCur] = useState('아직 갱신 전');
  useEffect(() => {
    setPrev(localStorage.getItem('AToken'));
  }, []);
  useEffect(() => {}, [cur]);

  return (
    <>
      <div>현재 access Token</div>
      <div style={{ overflowWrap: 'anywhere', width: '100vw' }}>{prev}</div>
      <br></br>
      <div>새로운 access Token</div>
      <div>{cur}</div>
      <button
        onClick={() => {
          const res = postData(NEW_TOKEN, localStorage.getItem('RToken'), {
            'Content-Type': 'text/plain',
          });
          if (res) {
            //console.log(res);
            setCur(res.data.accessToken);
          }
        }}
      >
        {' '}
        토큰 갱신
      </button>
    </>
  );
};

export default Test;
