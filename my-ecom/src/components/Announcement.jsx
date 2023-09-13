import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  font-size: 15px;
  font-weight: 500;
`;
const Announcement = () => {
  return <Container>New Arrival...</Container>;
};

export default Announcement;
