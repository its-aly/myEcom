import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";
import { mobile } from "../responsive";
const Container = styled.div`
  height: 85vh;
  width: 100%;
  display: flex;
  background-color: transparent;
  position: relative;
  overflow: hidden;
  ${mobile({ overflow: "hidden", height: "75vh" })}
`;
const Arrow = styled.div`
  height: 50px;
  width: 50px;
  ${"" /* color: red; */}
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  z-index: 2;
  cursor: pointer;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 0.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;
const Slide = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.bg};
  ${mobile({ height: "85vh", position: "relative" })}
`;
const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
`;
const Img = styled.img`
  height: 80%;
  ${mobile({
    height: "80%",
  })}
`;
// info container
const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  align-items: center;
  ${mobile({
    padding: "30px",
    alignItems: "center",
    padding: "25px",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    position: "absolute",
    top: 100,
    left: 120,
  })}
`;

// now declaring styles for Info Container
const Title = styled.h1`
  font-size: 50px;
  ${mobile({ fontSize: "15px" })}
`;
const Desc = styled.p`
  margin: 20px 0px;
  font-size: 20x;
  letter-spacing: 3px;
  ${mobile({ margin: "10px 20px", fontSize: "8px" })}
`;
const Button = styled.button`
  background-color: transparent;
  font-weight: 600;
  padding: 15px;
  cursor: pointer;
  ${mobile({ fontWeight: "200", padding: "5px", fontSize: "12px" })}
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  // handlClick Function to change the slider
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };
  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowBackIosOutlined></ArrowBackIosOutlined>
      </Arrow>
      {/* content between two arrow i.e image and info */}
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Img src={item.img}></Img>
            </ImgContainer>
            {/* starting Info Container */}
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button>SHOP NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowForwardIosOutlined></ArrowForwardIosOutlined>
      </Arrow>
    </Container>
  );
};

export default Slider;
