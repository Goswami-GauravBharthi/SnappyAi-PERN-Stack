import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: false,
    token: null,
    isLogin: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setLogout: (state) => {
      state.user = false;
      state.isLogin=false;
    },
  },
});

export const { setUser, setLogout, setIsLogin } = authSlice.actions;
export default authSlice.reducer;
