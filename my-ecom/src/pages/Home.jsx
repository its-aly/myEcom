import Announcement from "../components/Announcement";
import Slider from "../components/Slider";
import React from "react";
import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
import Products from "../components/Products";
import styled from "styled-components";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
const ProductsTitle = styled.div`
  font-weight: 800;
  font-size: 37px;
  text-align: center;
  margin-top: 15px;
  text-transform: uppercase;
`;
const Home = () => {
  return (
    <div>
      {" "}
      <Navbar></Navbar>
      <Announcement></Announcement>
      <Slider></Slider>
      <Categories></Categories>
      <ProductsTitle>Featured Products</ProductsTitle>
      <Products></Products>
      <NewsLetter></NewsLetter>
      <Footer></Footer>
    </div>
  );
};

export default Home;
