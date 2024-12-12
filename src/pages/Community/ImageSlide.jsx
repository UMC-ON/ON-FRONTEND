import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useSwipeable } from 'react-swipeable';
const ImageSlide = () => {
  const { list, clickedImg, clickedIndex } = useLocation().state;
  const [currentImgIndex, setCurrentImageIndex] = useState(clickedIndex);
  //const [stopScroll, setStopScroll] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => {
      if (prevIndex < list.length - 1) {
        return prevIndex + 1;
      } else {
        return prevIndex;
      }
    });
  };
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      } else {
        return prevIndex;
      }
    });
  };
  const handlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
    preventScrollOnSwipe: true,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });
  return (
    <>
      <ImgModal {...handlers}>
        <SliderWrapper currentSlide={currentImgIndex}>
          {list.map((img, index) => (
            <Img
              src={img}
              key={index}
            />
          ))}
        </SliderWrapper>
      </ImgModal>
    </>
  );
};

export default ImageSlide;

const ImgModal = styled.div`
  width: 100vw;
  max-width: 480px;
  height: 100vh;
  margin: 0 auto;
  overflow: hidden;
  background-color: black;
`;
const SliderWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['currentSlide'].includes(prop),
})`
  display: flex;
  transition: transform 0.3s ease-in-out;
  transform: ${(props) => `translateX(-${props.currentSlide * 100}%)`};
  position: relative; /* Added to contain absolutely positioned elements */
  height: 100%; /* Ensure it takes full height of the container */
`;
const Img = styled.div`
  min-width: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
  background: ${(props) => `url(${props.src})`} no-repeat center;
  background-size: contain;
`;
