import Product from "./Product";
// import { allProducts } from "../data";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
`;

const Products = ({ categ, filters, sort }) => { 
  //getting values from ProductList Page
  // console.log(categ, filters, sort);
  const [products, setProducts] = useState([]); //getting all prdoucts data
  const [filteredProducts, setFilteredProducts] = useState([]); //storing only filtered data
  // console.log(products);
  // console.log(filteredProducts);
  // ========================================================================================
  // USEEFFECT USED FOR GETTING PRODUCTS BY CATEG PASSED AS A PARAM or all products if no categ
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          categ
            ? `http://localhost:5000/api/products?category=${categ}`
            : "http://localhost:5000/api/products"
        );
        console.log(res);
        setProducts(res.data); //saving states of data
      } catch (err) {
        // console.log(err);
      }
    };
    getProducts();
  }, [categ]);

  // ======================================================================================
  // USEEFFECT USED FOR GETTING PRODUCTS USING FILTERS

  useEffect(() => {
    categ &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, categ, filters]);
  // ======================================================================================
  // USEEFFECT USED FOR  SORT

  // useEffect(() => {
  //   if (sort === "newest") {
  //     setFilteredProducts((prev) => {
  //       //here we used compare function of sort iIf the result is negative, a is sorted before b If the result is positive, b is sorted before a,If the result is 0, no changes are done with the sort order of the two values.
  //       [...prev].sort((a, b) => a.createdAt - b.createdAt);
  //     });
  //   } // end of if
  //   // else if (sort === "asc") {
  //   //   setFilteredProducts((prev) => {
  //   //     [...prev].sort((a, b) => a.price - b.price);
  //   //   });
  //   // } // end of else if
  //   // else {
  //   //   setFilteredProducts((prev) => {
  //   //     [...prev].sort((a, b) => b.price - a.price);
  //   //   });
  //   // } // end of if
  // }, [sort]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts(
        (prev) =>
          //When rendering the createdAt field, toISOString() is called to format the date as a string in the ISO 8601 format (2023-05-21T09:55:03.412Z). in mongoDB by timestamp"true property
          [...prev].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          ) // we converted createdAt into new Date object because This allows proper comparison and sorting based on the timestamp values.
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {categ
        ? filteredProducts.map((item) => (
            <Product item={item} key={item._id}></Product>
          ))
        : //here we used ternary operator for if else condition
          products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item._id}></Product>)}
    </Container>
  );
};

export default Products;
