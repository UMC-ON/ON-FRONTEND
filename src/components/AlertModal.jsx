import styled from 'styled-components';

import planeIcon from '../assets/images/alert_plane_icon.svg';
import closeIcon from '../assets/images/close_button.svg';

function AlertModal({ closeModal, line1, line2, line3}) {

    return (
      <Box>
        <ModalContent>
          <Icon src={planeIcon} />
  
          <Left>
            <ModalTitle>{line1}</ModalTitle>
          </Left>
          <ModalTitle>입력해주세요.</ModalTitle>
  
          <Space />
  
          <ModalText>{line2}</ModalText>
          <ModalText>{line3}</ModalText>
  
          <Space />
  
          <BlueButton onClick={closeModal}>확인</BlueButton>
        </ModalContent>
      </Box>
    );
  }


  export default AlertModal;
  
  
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
    max-width: 480px;
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
  
  const BlueButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    border-radius: 10px;
    width: 100px;
    height: 40px;

    background: linear-gradient(135deg, #d6ebff, #c2c7ff);
    color: white;
    text-align: center;
    font-family: Inter;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
  `;