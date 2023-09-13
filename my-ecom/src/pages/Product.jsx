import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { publicRequest } from "../requestMethods";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartRedux";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({
    padding: "10px",
    flexDirection: "column",
  })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 70%;
  height: 70vh;
  object-fit: crop;
  ${mobile({ height: "55vh", width: "90%", marginLeft: "15px" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 200;
  ${mobile({ textAlign: "center" })}
`;
const Desc = styled.p`
  margin: 20px 0px;
  ${mobile({ margin: "15px 20px", textAlign: "center" })}
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 30px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin: 30px 0px;
  ${mobile({ width: "100%" })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 10px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: lightgray;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  //useState() for getting product data with the given id
  const [product, setProduct] = useState({});
  // console.log(product);
  //here we can use color:[] because without this we cannot access nested objects in an array
  // or probably u should use the optional chaning (?.) after varialbe name in while maping through it
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        // console.log(res);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);
  //=================================================================================
  //code for qunatity increase decrease feature
  const [quantity, setQuantity] = useState(1);

  function handleQuantity(value) {
    if (value === "decrease") {
      quantity > 1 && setQuantity(quantity - 1);
    } else if (value === "increase") {
      setQuantity(quantity + 1);
    }
  }
  //=================================================================================

  //code for choosing different color and saving state of that
  const [color, setColor] = useState();
  // const colName = produc.color;
  // console.log(colName);
  // console.log(color);

  //==================================================================

  //code for choosing different size and saving state of that
  const [size, setSize] = useState();
  // console.log(size);

  //===============================================================

  //code for Add to cart Button
  //updating cart
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(addProduct({ ...product, quantity, color, size }));
  }

  //===============================================================
  return (
    <Container>
      <Announcement></Announcement>
      <Navbar></Navbar>
      <Wrapper>
        <ImgContainer>
          <Image src={product.img}></Image>
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Select Color </FilterTitle>
              {/* The optional chaining operator(?.) can be used with not only object properties but 
              also with function calls and array indexing,
               allowing you to safely access nested elements without causing errors. */}
              {product.color?.map((c) => (
                <FilterColor color={c} key={c} onClick={() => setColor(c)} />
              ))}
              {/* below code executes if no click event occurs on colors */}
              {product.color &&
                product.color.length > 0 &&
                !color &&
                setColor(product.color[0])}
            </Filter>

            <Filter>
              <FilterTitle>size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {/* The optional chaining operator(?.) can be used with not only object properties but 
              also with function calls and array indexing,
               allowing you to safely access nested elements without causing errors. */}
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
              {/* below code executes if no onChange event occurs on size */}
              {product.size &&
                product.size.length > 0 &&
                !size &&
                setSize(product.size[0])}
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              {/* for amount we will use a useState() and a counter function */}
              <Remove onClick={() => handleQuantity("decrease")}></Remove>
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("increase")}></Add>
            </AmountContainer>
            <Button onClick={() => handleClick()}>Add to Cart</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <NewsLetter></NewsLetter>
      <Footer></Footer>
    </Container>
  );
};

export default Product;
