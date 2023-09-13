import React from "react";
import styled from "styled-components";
import { categories } from "../data";
import CategoryItems from "./CategoryItems";
import { mobile } from "../responsive";

const Container = styled.div`
  paddindg: 10px;
  display: flex;
  justify-content: space-between;
  ${mobile({
    flexDirection: "column",padding:"0px"
  })};
`;
const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItems item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
