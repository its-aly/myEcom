import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(218, 23, 136, 0.3), rgba(110, 235, 141, 0.3)),
    url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80");

  align-items: center;
  justify-content: center;
  ${mobile({ height: "120vh" })}
`;
const Wrapper = styled.div`
  padding: 20px;
  width: 45%;
  background-color: white;
  ${mobile({ width: "75%", marginTop: "20px", padding: "10px" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 350;
  margin-top: 5px;
  ${mobile({ fontSize: "19px " })}
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  ${mobile({ margin: "20px 10px 0px 0px" })}
`;

const Agreement = styled.span`
  margin: 20px 0px;
  font-size: 15px;
  ${mobile({ fontSize: "13px" })}
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  ${mobile({ width: "30%", padding: "10px 10px" })}
`;

const Signup = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Signup For An Account</Title>
        <Form>
          <Input placeholder="name"></Input>
          <Input placeholder="last name"></Input>
          <Input placeholder="username"></Input>
          <Input placeholder="email"></Input>
          <Input placeholder="password"></Input>
          <Input placeholder="confirm password"></Input>
          <Agreement>
            By Creating an Account User agrees to be bound by this{" "}
            <a href="#">Agreement</a>, and any additional terms and conditions
            that may be posted on the Company's website or presented to User
            upon registration.
          </Agreement>
          <Button>Create</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Signup;
