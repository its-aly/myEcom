import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
const Container = styled.div`
  flex: 1;
  height: 70vh;
  margin: 3px;
  margin-top: 5px;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({
    height: "40vh",
  })};
`;
const Info = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.473), rgba(228, 228, 218, 0.24));
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
`;
const Title = styled.h1`
  color: white;
  font-weight: 700;
`;
const Button = styled.button`
  border: none;
  padding: 10px;
  cursor: pointer;
`;
const CategoryItems = ({ item }) => {
  return (
    <Container>
      <Image src={item.img}></Image>
      <Info>
        <Title>{item.title}</Title>
        <Link to={`/productlist/${item.categ}`}>
          <Button>SHOP NOW</Button>
        </Link>
      </Info>
    </Container>
  );
};

export default CategoryItems;
