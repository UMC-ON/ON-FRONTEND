import styled from 'styled-components';

import planeIcon from '../assets/images/plane_icon.svg';
import closeIcon from '../assets/images/close_button.svg';

  function ReportModal({ closeModal }) {
    return (
      <Box>
        <ModalContent>
          <Close src={closeIcon} onClick={closeModal} />
          <Icon src={planeIcon} />
  
          <ModalTitle>해당 글이 신고</ModalTitle>
          <ModalTitle>처리되었습니다.</ModalTitle>
  
          <Space />
  
          <ModalText>더 필요하신 사항은</ModalText>
          <ModalText>oncommunity24@gmail.com으로</ModalText>
          <ModalText>전달해 주시면 빠르게 처리 도와드릴게요.</ModalText>
  
          <Space />
        </ModalContent>
      </Box>
    );
  }

  export default ReportModal;
  
  
  const Space = styled.div`
    margin-bottom: 3vh;
  `;
  
  const Left = styled.span`
    display: flex;
    justify-content: center;
  `;
  
  const Icon = styled.img`
    width: 80px;
    height: 80px;
    margin-bottom: 3vh;
  `;
  
  const Box = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    // max-width: 480px;
  `;
  
  const ModalContent = styled.div`
    background: white;
    padding: 24px 16px;
    border-radius: 4px;
    width: 65%;
    border: 1px solid #dcdcdc;
    border-radius: 10px;
    position: relative;
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.05);
  `;
  
  const ModalTitle = styled.div`
    font-size: 1.3em;
    font-weight: bold;
    color: ${props => props.$color || 'black'};
    margin-bottom: 0.5vh;
  `;
  
  const ModalText = styled.div`
    font-size: 0.8em;
    margin-bottom: 0.5vh;
    color: black;
  `;
  
  const Close = styled.img`
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  `;
  