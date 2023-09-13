import { Send } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  background-color: lightgray;
  height: 60vh;
`;
const Title = styled.h1`
  font-size: 60px;
`;
const Desc = styled.div`
  margin: 15px;
  font-size: 20px;
  ${mobile({ textAlign: "center" })};
`;
const InputContainer = styled.div`
  display: flex;
  width: 50%;
  ${"" /* background-color: gray; */}
  justify-content: space-between;

  ${mobile({ width: "80%" })};
`;
const Input = styled.input`
  flex: 8;
  border: none;
  padding-left: 15px;
`;
const Button = styled.button`
  flex: 0.5;
  border: none;
  color: white;
  background-color: teal;
  border-radius: 5px;
`;
const NewsLetter = () => {
  return (
    <Container>
      <Title>NewsLetter</Title>
      <Desc>Signup to recive notifications and special deals from us</Desc>
      <InputContainer>
        <Input type="email" placeholder="enter your email"></Input>
        <Button>
          <Send></Send>
        </Button>
      </InputContainer>
    </Container>
  );
};

export default NewsLetter;
