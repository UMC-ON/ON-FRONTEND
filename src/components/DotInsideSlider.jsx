import styled from 'styled-components';
import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

function DotInslideSlider({ images }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentSlide((prev) => (prev + 1) % images.length),
    onSwipedRight: () =>
      setCurrentSlide((prev) => (prev - 1 + images.length) % images.length),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <>
      <SliderContainer {...handlers}>
        <SliderWrapper currentSlide={currentSlide}>
          {images.map((image, index) => (
            <Slide key={index} style={{ backgroundImage: `url(${image})` }} />
          ))}
        </SliderWrapper>
        <DotContainer>
          {images.map((_, index) => (
            <Dot
              key={index}
              active={index === currentSlide}
              onClick={() => goToSlide(index)}
            />
          ))}
        </DotContainer>
      </SliderContainer>
    </>
  );
  }
  
  export default DotInslideSlider;
  
  const SliderContainer = styled.div`
    position: relative;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
  `;
  
  const SliderWrapper = styled.div.withConfig({
    shouldForwardProp: (prop) => !['currentSlide'].includes(prop),
  })`
    display: flex;
    transition: transform 0.3s ease-in-out;
    transform: ${(props) => `translateX(-${props.currentSlide * 100}%)`};
    position: relative;
    height: 100%;
  `;
  
  const Slide = styled.div`
    min-width: 100%;
    height: auto;
    aspect-ratio: 20/9; /* 비율을 설정하거나 이미지를 자동으로 비율 유지하게 */
    background-size: cover; /* 컨테이너를 완전히 덮도록 함 */
    background-position: center;
    background-repeat: no-repeat;
  `;
  
  const DotContainer = styled.div`
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    pointer-events: none;
  `;
  
  const Dot = styled.div.withConfig({
    shouldForwardProp: (prop) => !['active'].includes(prop),
  })`
    width: ${(props) => (props.active ? '8px' : '5px')};
    height: ${(props) => (props.active ? '8px' : '5px')};
    margin: ${(props) => (props.active ? '0 5px' : '2px 5px')};
    border-radius: 50%;
    background-color: ${(props) => (props.active ? '#FFFFFF' : '#D9D9D9')};
    opacity: ${(props) => (props.active ? '1' : '0.5')};
    cursor: pointer;
    pointer-events: auto;
  `;
  

