import { useState, useEffect } from 'react';
import * as s from './TradeChatInfoStyled';
import { GET_TRADE_INFO } from '../../api/urls';
import { getData } from '../../api/Functions';
import Loading from '../Loading/Loading';

const TradeChatInfo = ({ messageInitiator, roomId }) => {
  const [infoResult, setInfoResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tradeMethod, setTradeMethod] = useState('');

  useEffect(() => {
    const fetchTradeInfo = async () => {
      setIsLoading(true);
      try {
        const response = await getData(
          GET_TRADE_INFO(roomId),
          {
            Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
          },
          { roomId: roomId },
        );

        if (response) {
          //console.log(response.data);
          setInfoResult(response.data);
          if (infoResult.tradeMethod === 'DIRECT') {
            setTradeMethod('직접 만나서 거래');
          } else {
            setTradeMethod('택배 거래');
          }
        }
      } catch (error) {
        //console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTradeInfo();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <s.InfoWrapper>
      {messageInitiator ? (
        <s.InfoText>
          아래 글에 대해 궁금한 것을 판매자에게 물어보고 거래하세요.
        </s.InfoText>
      ) : (
        <s.InfoText>
          아래 글에서 시작된 거래 채팅방입니다. 질문에 답변해 주시고 거래가
          완료되면 <span>거래 완료</span>를 눌러주세요.
        </s.InfoText>
      )}
      <s.ProductWrapper>
        {infoResult.imageUrl ? (
          <s.ProductInfoContainer>
            <s.ProductName>{infoResult.productName}</s.ProductName>
            <s.ProductPrice>&#8361; {infoResult.productPrice}</s.ProductPrice>
            <s.ProductInfo>{tradeMethod} | 거래완료여부추가필요</s.ProductInfo>
          </s.ProductInfoContainer>
        ) : (
          <s.NoImgProductInfoContainer>
            <s.ProductName>{infoResult.productName}</s.ProductName>
            <s.ProductPrice>&#8361; {infoResult.productPrice}</s.ProductPrice>
            <s.ProductInfo>{tradeMethod} | 거래완료여부추가필요</s.ProductInfo>
          </s.NoImgProductInfoContainer>
        )}

        {infoResult.imageUrl && <s.ProductImg $link={infoResult.imageUrl} />}
      </s.ProductWrapper>
    </s.InfoWrapper>
  );
};

export default TradeChatInfo;
