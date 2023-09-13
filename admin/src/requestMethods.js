// import axios from "axios";
// //here we will create different methods for api calls in order to make it easy and u dont have to type https://...etc  agai and again
// const BASE_URL = "http://localhost:5000/api/";

// //getting acces token dynamically
// // const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
//   // .currentUser.accessToken;
// // console.log("aa");
// // console.log(TOKEN);
// // const TOKEN = "assdas";
// export const publicRequest = axios.create({
//   baseURL: BASE_URL,
// });

// export const userRequest = axios.create({
//   baseURL: BASE_URL,
//   headers: { token: `Bearer ${TOKEN}` },
// });

// requestMethods.js

import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

let TOKEN = ""; // Declare a variable to store the token

// Function to get the token from local storage
const getToken = () => {
  const persistRoot = JSON.parse(localStorage.getItem("persist:root"));
  if (persistRoot) {
    const user = JSON.parse(persistRoot.user);
    TOKEN = user.currentUser?.accessToken;
  }
};

getToken(); // Call the getToken function to set the initial token value
console.log("token from local storage" + TOKEN);

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
