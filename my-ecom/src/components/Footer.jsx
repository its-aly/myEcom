import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Room,
  Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightgray;
  margin-top: 10px;
  ${mobile({ flexDirection: "column" })};
`;
const Left = styled.div`
  flex: 1;
  text-align: center;
`;
const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })};
`;
const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const SocialContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0px 10px;
`;
const Desc = styled.div`
  margin: 10px 0px;
  padding: 10px;
  font-size: 15px;
  font-weight: 300;
`;
const Logo = styled.h1`
  margin-top: 10px;
`;
// css for Right side of footer
const Right = styled.div`
  flex: 1;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  margin-top: 50px;
`;
const ContactItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;
const Payement = styled.img`
  width: 50%;
`;
const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>MY ECOM</Logo>
        <Desc>
          Select from the Largest Online Marketplace in Pakistan With over 15
          million products to select from, MyEcom offers its customers the most
          comprehensive listing of products in the country. Whether you’re
          looking for electronics, apparel, appliances, or groceries – there is
          something for everyone.
        </Desc>
        <SocialContainer>
          <SocialIcon color="E4405F">
            <Instagram></Instagram>
          </SocialIcon>
          <SocialIcon color="4267B2">
            <Facebook></Facebook>
          </SocialIcon>
          <SocialIcon color="00acee">
            <Twitter></Twitter>
          </SocialIcon>
        </SocialContainer>
      </Left>
      {/* center part of footer */}
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>About</ListItem>
          <ListItem>Products</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      {/* right side of the footer */}
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }}></Room>Peshawar,Hayatabad,Phase
          3 2231
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }}></Phone> +923172312331
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }}> </MailOutline>
          contact@myecom.com
        </ContactItem>
        <Payement src="https://support.mywifinetworks.com/hc/article_attachments/360055906133/5e1cce2c96d1d.png"></Payement>
      </Right>
    </Container>
  );
};

export default Footer;
