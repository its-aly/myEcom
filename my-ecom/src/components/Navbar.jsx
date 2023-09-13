import { Badge } from "@material-ui/core";
import { AddShoppingCart, Search } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 60px;
  background-color: rgba(0, 0, 0, 0.85);
  color: white;
  ${mobile({ height: "50px" })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  ${mobile({ padding: "10px 5px" })}
`;
// left navbar
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Language = styled.span`
  font-size: 15px;
  ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
  border: 2px solid gray;
  margin-left: 20px;
  align-items: center;
  display: flex;
`;
const Input = styled.input`
  ${"" /* type: hidden; */}
  outline: none;
  border: none;
  background-color: transparent;
  color: white;
  ${mobile({ width: "50px" })}
`;
// ./left navbar

// Center Navbar(LOGO)
const Center = styled.div`
  flex: 1;
  align-items: center;
  ${mobile({
    marginLeft: "30px",
    display: "flex",
    justifyContent: "center",
    alignIems: "center",
  })};
`;
const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "15px", textAlign: "center", justifyContent: "center" })}
`;
// ./Center Navbar
// -------------
// RIGHT NAVBAR
const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;
const NavItem = styled.div`
  font-size: 20px;
  margin-left: 20px;
  cursor: pointer;
  ${mobile({ fontSize: "13px", marginLeft: "10px" })}
`;

const Navbar = () => {
  //code for increase or dec number of qunatity set by the client of  certain products
  const quantity = useSelector((state) => state.cart.quantity);
  //The useSelector hook is used to extract the state of a component from the redux store using the selector function
  // console.log(quantity);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>Eng</Language>
          <SearchContainer>
            <Input></Input> <Search style={{ cursor: "pointer" }}></Search>
          </SearchContainer>
        </Left>
        <Center>
          <Logo>MY ECOM</Logo>
        </Center>
        <Right>
          <NavItem>Login</NavItem>
          <NavItem>SignUp</NavItem>
          <Link style={{ color: "white" }} to={"/cart"}>
            <NavItem>
              <Badge badgeContent={quantity} color="primary">
                <AddShoppingCart></AddShoppingCart>
              </Badge>
            </NavItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
