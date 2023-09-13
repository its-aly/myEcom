import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Products from "../components/Products";
import NewsLetter from "../components/NewsLetter";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useState } from "react";
const Container = styled.div``;
const Title = styled.h1`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
  ${mobile({ margin: "0px 20px", display: "flex", flexDirection: "column" })}
`;
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;
const ProductList = () => {
  const location = useLocation();
  // console.log(location.pathname.split("/")[2]);
  const categ = location.pathname.split("/")[2];

  //useState hooks for handling values of filters and sorting
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    // console.log(e.target.value); 
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value, //here [] bracket is call(computed property name) it calculate exp and use it as a name for dynamically creating names for multiple values
    });
  };
  // console.log(filters);

  return (
    <Container>
      <Announcement></Announcement>
      <Navbar></Navbar>
      <Title>{categ}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products</FilterText>{" "}
          <Select name="color" onChange={handleFilters}>
            <Option disabled>choose color</Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>blue</Option>
            <Option>red</Option>
            <Option>green</Option>
            <Option>yellow</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled>choose size</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
            <Option>XXL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price(asc)</Option>
            <Option value="desc">Price(desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products categ={categ} filters={filters} sort={sort}></Products>
      <NewsLetter></NewsLetter>
      <Footer></Footer>
    </Container>
  );
};

export default ProductList;
