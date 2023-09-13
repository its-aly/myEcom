import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} from "./productRedux";
import { loginStart, loginFailure, loginSuccess } from "./userRedux";
//==================================LOGIN FOR ADMIN==============================================
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    console.log(res.data);
  } catch (err) {
    dispatch(loginFailure());
  }
};
//==================================GETTING ALL PRODUCTS==============================================
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};
//==============================DELETE PRODUCT==================================================
export const deleteProducts = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    //commented our cuz i dont want to delete my data currently i have only few products
    // const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

//==============================UPDATE PRODUCT==================================================
export const updateProducts = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    dispatch(updateProductSuccess({ id, product })); //here we used two objects because when i update product from dashboard there is no id provided so ill have to pass it manually in order to know which product to update
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

//==============================ADD PRODUCT==================================================
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    //commented our cuz i dont want to add my data currently i have only few products
    const res = await userRequest.post(`/products/`, product);
    console.log("data from api is" + res.data);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};
