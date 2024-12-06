import { useState, useEffect } from 'react';
import * as s from './TradeChatInfoStyled';
import { useLocation, useNavigate } from 'react-router-dom';

const TradeChatInfo = ({ messageInitiator, roomId, infoResult }) => {
  const [tradeMethod, setTradeMethod] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (infoResult.tradeMethod === 'DIRECT') {
      setTradeMethod('직접 만나서 거래');
    } else {
      setTradeMethod('택배 거래');
    }
  }, []);

  return (
    <s.InfoWrapper onClick={() => navigate(`/sell/${infoResult.marketPostId}`)}>
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
            <s.ProductInfo>
              {tradeMethod} |{' '}
              {infoResult.dealStatus === 'COMPLETE' ? '거래완료' : '거래가능'}
            </s.ProductInfo>
          </s.NoImgProductInfoContainer>
        )}

        {infoResult.imageUrl && <s.ProductImg $link={infoResult.imageUrl} />}
      </s.ProductWrapper>
    </s.InfoWrapper>
  );
};

export default TradeChatInfo;
