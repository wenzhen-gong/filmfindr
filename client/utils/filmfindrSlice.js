import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  signUpModalOpen: false,
  user: "test username",
};

export const filmfindrSlice = createSlice({
  name: "myReducers",
  initialState,
  reducers: {
    handlelogIn: (state) => {
      // other logics need to be written like authorization
      state.isLoggedIn = true;
      console.log("mimicing logging in");
    },
    handlelogOut: (state) => {
      // other logics need to be written like clear cookies and/or jwt
      state.isLoggedIn = false;
      console.log("mimicing logging out");
    },
    openSignUpModal: (state) => {
      console.log("opening sign up modal");
      state.signUpModalOpen = true;
    },
    closeSignUpModal: (state) => {
      state.signUpModalOpen = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});
export const { handlelogIn, handlelogOut, openSignUpModal, closeSignUpModal } =
  filmfindrSlice.actions;
export default filmfindrSlice.reducer;

export const fetchUser = createAsyncThunk("fetchUser", async () => {
  let response = await fetch("https://swapi.dev/api/people/1");
  response = await response.json();
  return response;
});

export const signUp = createAsyncThunk("signUp", async (event) => {
  // need to change to sign up user logic (db call with insert)
  event.preventDefault();
  console.log(event.target[0].value);
  console.log(event.target[1].value);
});
