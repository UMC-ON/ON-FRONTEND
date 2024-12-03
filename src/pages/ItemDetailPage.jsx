import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

import ItemDetailPageHeader from '../components/ItemDetailPageHeader';
import ItemList from '../components/ItemList';
import SellChatModal from '../components/SellChatModal';
import SecondModal from '../components/SecondModal';

import compas from '../assets/images/compasIcon.svg';
import icon from '../assets/images/profileIcon.svg';
import defaultImg from '../assets/images/bannerDefault.svg';

import {
  GET_SPECIFIC_ITEM,
  GET_NEARBY_ITEM,
  GET_MARKET_ROOMID,
  GET_ROOM_ID,
} from '../api/urls';
import { getData, postData } from '../api/Functions';

function ImageModal({ imageSrc, onClose }) {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent>
        <ModalImage
          src={imageSrc}
          alt="Original Image"
        />
      </ModalContent>
    </ModalOverlay>
  );
}

function ItemDetailPage() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.user);
  const { marketPostId } = useParams();

  const [items, setItems] = useState([]);
  const [nearitems, setNearitems] = useState([]);
  const [receiverId, setReceiverId] = useState(null);
  //const [roomId, setRoomId] = useState(null);

  const [modalImage, setModalImage] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  //const [hasBottomTab, setHasBottomTab] = useState(true)
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  //const [infoData, setInfoData] = useState([]);
  const [nickname, setNickname] = useState('');

  const openChatModal = () => {
    if (userInfo.country != null) {
      console.log('First modal opened');
      setIsChatModalOpen(true);
    } else {
      setIsSecondModalOpen(true);
    }
  };

  const closeChatModal = () => {
    console.log('First modal closed');
    setIsChatModalOpen(false);
  };

  const openSecondModal = () => {
    console.log('Second modal opened');
    setIsSecondModalOpen(true);
  };

  const closeSecondModal = () => {
    console.log('Second modal closed');
    setIsSecondModalOpen(false);
  };

  const openNextModal = () => {
    setIsSecondModalOpen(false);
    navigate('/mypage/schoolAuth');
  };

  const openImageModal = (imageSrc) => {
    setModalImage(imageSrc);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setModalImage(null);
  };

  const handleChatButtonClick = () => {
    closeChatModal();
    applyData();
  };

  const applyData = async () => {
    try {
      const response = await postData(
        GET_ROOM_ID,
        { chatType: 'MARKET', receiverId: receiverId, postId: marketPostId },
        {
          Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
        },
      );

      if (response) {
        console.log(response.data);
        const roomId = response.data.roomId;
        const senderName = userInfo.nickname;
        console.log('Application successful:', roomId);
        navigate(`/chat/trade/${roomId}`, { state: { roomId, senderName } });
      } else {
        console.error('Application failed');
      }
    } catch (error) {
      console.error('Error applying for market chat:', error);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getData(GET_SPECIFIC_ITEM(marketPostId), {
          Authorization: `Bearer ${localStorage.getItem('AToken')}`,
        });
        if (response) {
          setItems([response.data]);
          setReceiverId(response.data.userId);
          console.log(response.data);
        }
      } catch (error) {
        console.error('물품 상세 페이지 정보를 불러오는 중 오류 발생:', error);
      }
    };

    fetchItems();
  }, [marketPostId]);

  useEffect(() => {
    const fetchNearitems = async () => {
      try {
        const response = await getData(GET_NEARBY_ITEM(marketPostId), {
          Authorization: `Bearer ${localStorage.getItem('AToken')}`,
        });
        if (response) {
          setNearitems(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error('근처 물품 정보를 불러오는 중 오류 발생:', error);
      }
    };

    fetchNearitems();
  }, [marketPostId]);

  useEffect(() => {
    if (items.length > 0) {
      setNickname(items[0].nickname); // 첫 번째 아이템의 닉네임 설정
    }
  }, [items]);

  // const handleChatButtonClick = async () => {
  //   closeChatModal();
  //   if (!receiverId || !marketPostId) {
  //     console.error('Receiver ID or Market Post ID is missing.');
  //     return;
  //   }

  //   try {
  //     const response = await postData(
  //       GET_MARKET_ROOMID,
  //       {
  //         chatType: "MARKET",
  //         receiverId: receiverId,
  //         postId: marketPostId,
  //       },
  //       {
  //         Authorization: `Bearer ${localStorage.getItem('AToken')}`
  //       }
  //     );

  //     if (response?.data?.inSuccess) {
  //       const roomId = response.data.result.roomId;
  //       const nickname = userInfo?.nickname || 'Unknown User';
  //       setRoomId(roomId);
  //       navigate(`/chat/trade/${roomId}`, { state: { roomId: roomId, senderName: nickname } }); // Redirect to chat room
  //     } else {
  //       console.error('Failed to create chat room:', response?.data?.message);
  //     }
  //   } catch (error) {
  //     console.error('Error sending chat request:', error);
  //   }
  // };

  return (
    <>
      <ItemDetailPageHeader />
      <Space />
      <ContentContainer hasBottomTab={userInfo.id !== receiverId}>
        {items &&
          items.map((item, index) => {
            const imageUrls =
              item.imageUrls && item.imageUrls.length > 0
                ? item.imageUrls
                : [defaultImg];

            const isSingleImage = imageUrls.length === 1;
            return (
              <React.Fragment key={index}>
                {isSingleImage ? (
                  <SingleImage
                    src={imageUrls[0]}
                    alt={`Image ${index + 1}`}
                    onClick={() => openImageModal(imageUrls[0])} // 이미지 클릭 시 모달 열기
                  />
                ) : (
                  <Slider {...settings}>
                    {imageUrls.map((url, idx) => (
                      <ItemImage
                        key={idx}
                        src={url}
                        alt={`Slide ${idx + 1}`}
                        onClick={() => openImageModal(url)} // 이미지 클릭 시 모달 열기
                      />
                    ))}
                  </Slider>
                )}
                <InfoContainer>
                  <Title>{item.title}</Title>
                  <State>
                    {item.dealType === 'DIRECT' ? '직거래' : '택배거래'} |{' '}
                    {item.dealStatus === 'AWAIT' ? '거래 가능' : '거래 완료'}
                  </State>
                  <br />
                  <Price>{item.share ? '나눔' : `₩ ${item.cost}`}</Price>
                  <Information>{item.content}</Information>
                  <GrayLine />
                  <br />
                  <Seller>판매자 정보</Seller>
                  <br />
                  <SellerInfo>
                    <Place>
                      <Image
                        src={compas}
                        alt="compas"
                        style={{ marginRight: '5px' }}
                      />
                      {item.currentCountry} {item.currentLocation}
                    </Place>
                    <User>
                      <Image
                        src={icon}
                        alt="profile"
                        style={{ marginRight: '5px' }}
                      />
                      {item.nickname}
                    </User>
                  </SellerInfo>
                  <Nearby>
                    <Blue>주변</Blue> 중고거래글
                  </Nearby>
                </InfoContainer>
                <ItemList items={nearitems} />
                {nearitems.length === 0 && (
                  <NoNearbyItems>주변 거래글이 없습니다.</NoNearbyItems>
                )}
              </React.Fragment>
            );
          })}
      </ContentContainer>

      {isImageModalOpen && (
        <ImageModal
          imageSrc={modalImage}
          onClose={closeImageModal}
        />
      )}

      {userInfo.id !== receiverId && (
        <BottomTabLayout>
          <ChatButton onClick={openChatModal}>채팅으로 거래하기</ChatButton>
        </BottomTabLayout>
      )}
      {isChatModalOpen && (
        <SellChatModal
          closeModal={closeChatModal}
          openNextModal={handleChatButtonClick}
          nickname={nickname}
        />
      )}
      {isSecondModalOpen && <SecondModal closeModal={closeSecondModal} />}
    </>
  );
}

export default ItemDetailPage;

const Space = styled.div`
  margin-top: 7vh;
`;

const ContentContainer = styled.div`
  max-height: ${(props) =>
    props.hasBottomTab ? 'calc(100vh - 7vh - 87px)' : '100vh'};
  overflow-y: auto;
`;

const ItemImage = styled.img`
  width: 100%;
`;

const SingleImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  width: 100%;
  padding: 20px 20px;
  box-sizing: border-box;
  text-align: left;
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 28px;
  margin-bottom: 1vh;
  color: black;
`;

const State = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: #7a7a7a;
`;

const Price = styled.p`
  font-weight: 600;
  font-size: 30px;
  color: #3e73b2;
`;

const Information = styled.div`
  margin: 2em 0;
  color: #2d2d2d;
  white-space: pre-wrap;
`;

const GrayLine = styled.div`
  border-top: 1px solid #dfdfdf;
`;

const Seller = styled.p`
  font-size: 19px;
  color: #464646;
  font-weight: 600;
`;

const SellerInfo = styled.div`
  height: 2.5em;
  background: #d6ebff;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  justify-content: left;
  margin-bottom: 2em;
  color: #7a7a7a;
`;

const Place = styled.p`
  display: flex;
  align-items: center;
  font-size: 15px;
  margin: 10px;
  white-space: nowrap; /* 줄 바꿈 없이 한 줄로 표시 */
  overflow: hidden; /* 넘치는 텍스트를 숨깁니다 */
  text-overflow: ellipsis; /* 넘치는 텍스트를 '...'으로 표시 */
`;

const User = styled.p`
  display: flex;
  align-items: center;
  font-size: 15px;
  margin: 10px;
  white-space: nowrap; /* 줄 바꿈 없이 한 줄로 표시 */
  overflow: hidden; /* 넘치는 텍스트를 숨깁니다 */
  text-overflow: ellipsis; /* 넘치는 텍스트를 '...'으로 표시 */
`;

const Image = styled.img`
  width: 1.5em;
  height: 1.5em;
`;

const ChatButton = styled.div`
  width: 22em;
  height: 3em;
  border-radius: 10px;
  background: ${(props) => props.theme.blueGra};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  color: white;
`;

const BottomTabLayout = styled.div`
  width: 100%;
  max-width: 480px;
  height: 87px;
  position: fixed;
  bottom: 0;
  border-radius: 14px 14px 0px 0px;
  border: 1px solid white;
  background: #ffffff;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 0px;
  box-shadow: 0px -1px 4px 0px #e2e2e2;
`;

const Nearby = styled.p`
  font-size: 22px;
  font-weight: 600;
  color: #363636;
`;

const Blue = styled.span`
  color: #3e73b2;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const NoNearbyItems = styled.p`
  text-align: center;
  font-size: 16px;
  color: #7a7a7a;
  margin: 20px 0;
`;
