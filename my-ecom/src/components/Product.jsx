import {
  FavoriteBorder,
  Search,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: lightgray;
`;

const Image = styled.img`
  height: 66%;
  z-index: 2;
`;
const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
`;
const Icon = styled.div`
  width: 45px;
  height: 45px;
  background-color: white;
  border-radius: 50%;
  align-items: center;

  display: flex;
  justify-content: center;
  margin: 5px;
  transition: all 0.2s ease;
  &:hover {
    background-color: rgb(0, 0, 0, 0.2);
    color: white;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  return (
    <Container>
      <Image src={item.img}></Image>
      <Info>
        <Icon>
          <ShoppingCartOutlined></ShoppingCartOutlined>
        </Icon>
        <Icon>
          <Link style={{ color: "black" }} to={`/product/${item._id}`}>
            <Search></Search>
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorder></FavoriteBorder>
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
