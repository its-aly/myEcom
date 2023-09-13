import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(0, 23, 136, 0.3), rgba(0, 0, 1, 0.3)),
    url("https://images.unsplash.com/photo-1500305614571-ae5b6592e65d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80")
      center;
  background-size: cover;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  border-radius: 6px;
  padding: 20px; 
  width: 25%;
  background-color: rgba(255, 255, 255, 0.123);
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;

  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 15px;
  font-weight: 350;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 0px;
  padding: 13px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;
const Link = styled.a`
  margin: 3px 0px;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  color: white;
`;
const Error = styled.span`
  color: red;
  font-size: 14px;
  background-color: rgba(0, 0, 0, 0.15);
  width: 70%;
  text-align: center;
  margin: 3px 0px;
  border-radius: 5%;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const handleLoginClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <Container>
      <Wrapper>
        <Title>enter username and password to login</Title>
        <Form>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          ></Input>
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <Button onClick={handleLoginClick} disabled={isFetching}>
            Login
          </Button>
          {error&& <Error >Wrong Credentials Try Again...</Error>}
          
          <Link>Forgot Password?</Link>
          <Link>Create A New Account</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
