import { Add, Announcement, Remove } from "@material-ui/icons";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  border: ${(props) => props.type === "filled" && "none"};
  color: ${(props) => props.type === "filled" && "white"};
`;
const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const Hr = styled.hr`
  background-color: lightgray;
  border: none;
  height: 1px;
`;
const ProductDetails = styled.div`
  flex: 2;
  display: flex;
  ${mobile({ fontSize: "13px", marginLeft: "3px" })}
`;

const Image = styled.img`
  width: 230px;
  ${mobile({ width: "150px" })}
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${mobile({ padding: "10px" })}
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "0px 15px" })}
`;
const ProductPrice = styled.div`
  font-size: 35px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px", fontSize: "25px" })}
`;

const Summary = styled.div`
  flex: 1;
  background-color: yellow;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 25px 0px;
  display: flex;
  justify-content: space-between;
  font-size: ${(props) => props.type === "total" && "20px"};
  font-weight: ${(props) => props.type === "total" && "600"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;
const Button = styled.button`
  width: 100%;
  background-color: black;
  color: white;
  padding: 10px;
  cursor: pointer;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  return (
    <Container>
      <Navbar></Navbar>
      <Announcement></Announcement>
      <Wrapper>
        <Title>Your Bag</Title>
        {/* TOp Section */}
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist(0)</TopText>
          </TopTexts>
          <TopButton type="filled">Checkout Now</TopButton>
        </Top>
        <Bottom>
          <Info>
            {/*  product in cart details quant and price */}
            {cart.products.map((product) => (
              <Product>
                <ProductDetails>
                  <Image src={product.img}></Image>
                  <Details>
                    <ProductName>
                      {" "}
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      {" "}
                      <b>Product ID:</b>
                      {product._id}
                    </ProductId>
                    <b>color </b>{" "}
                    <ProductColor color={product?.color}></ProductColor>
                    <ProductSize>
                      {" "}
                      <b>Size:</b> {product?.size}
                    </ProductSize>
                  </Details>
                </ProductDetails>
                {/* Price Details section */}
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add></Add>
                    <ProductAmount>{product?.quantity}</ProductAmount>
                    <Remove></Remove>
                  </ProductAmountContainer>
                  <ProductPrice>{product?.price} $</ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr></Hr>
            {/* end of Prduct body */}
          </Info>
          {/* SUMMARY FOR PRODUCTS */}
          <Summary>
            <SummaryTitle>Order Summary</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>SubTotal</SummaryItemText>
              <SummaryItemPrice>{cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Esitmated Shipping</SummaryItemText>
              <SummaryItemPrice>$5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>{cart.total}</SummaryItemPrice>
            </SummaryItem>
            <Button>Checkout Now</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer></Footer>
    </Container>
  );
};

export default Cart;
