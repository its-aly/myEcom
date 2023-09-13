import axios from "axios";
//here we will create different methods for api calls in order to make it easy and u dont have to type https://...etc  agai and again
const BASE_URL = "http://localhost:5000/api/";
//curently this token is a dummy token or manually taken late on wit redux we will generate at runtime for user and save it here
// const TOKEN = currentUser.accessToken; //getting acces token dynamically
// const userStateObject = JSON.parse(localStorage.getItem("persist:root"));
// const currentUser = JSON.parse(userStateObject.currentUser);
// console.log(currentUser.accessToken);
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
//   .currentUser.accessToken;
const TOKEN = "asdasdasdas123123sasd";
export const publicRequest = axios.create({ 
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
