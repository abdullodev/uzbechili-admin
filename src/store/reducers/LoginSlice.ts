import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type ILoginData = typeof initialState.loginData;
export type IRoleData = typeof initialState.role;

const initialState = {
  isAuth: false,
  isConnected: false,
  isFree: false,
  role: {
    _id: "",
    order: false,
    orderCreate: false,
    orderUpdate: false,
    orderDelete: false,
    customer: false,
    customerCreate: false,
    customerUpdate: false,
    customerDelete: false,
    product: false,
    productCreate: false,
    productUpdate: false,
    productDelete: false,
    employee: false,
    employeeCreate: false,
    employeeUpdate: false,
    employeeDelete: false,
    role: false,
    roleCreate: false,
    roleUpdate: false,
    roleDelete: false,
    store: false,
    storeCreate: false,
    storeUpdate: false,
    storeDelete: false,
    storeProductCategory: false,
    storeProductCategoryCreate: false,
    storeProductCategoryUpdate: false,
    storeProductCategoryDelete: false,
    Category: false,
    CategoryCreate: false,
    CategoryUpdate: false,
    CategoryDelete: false,
    productCategory: false,
    productCategoryCreate: false,
    productCategoryUpdate: false,
    productCategoryDelete: false,
    admin: false,
    adminCreate: false,
    adminUpdate: false,
    adminDelete: false,
    integration: false,
    integrationUpdate: false,
    stateMap: false,
    transaction: false,
  },
  loginData: "",
};

const LoginSlice = createSlice({
  name: "login-data",
  initialState,
  reducers: {
    setLoginData(state, payload: PayloadAction<ILoginData>) {
      state.loginData = payload.payload;
      state.isAuth = true;
      localStorage.setItem("admin", JSON.stringify(payload.payload));
    },
    setRoleData(state, payload) {
      state.role = payload.payload;
    },
    setSocketConnect(state, payload: PayloadAction<boolean>) {
      state.isConnected = payload.payload;
    },
    setIsFree(state, payload: PayloadAction<boolean>) {
      state.isFree = payload.payload;
    },
  },
});

export const { setLoginData, setRoleData, setSocketConnect, setIsFree } =
  LoginSlice.actions;

export default LoginSlice.reducer;
