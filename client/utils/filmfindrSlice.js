import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  signUpModalOpen: false,
  signInModalOpen: false,
  user: null,
  movies: [],
  loadingMovies: 'idle',
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
      state.user = null;
      console.log("mimicing logging out");
    },
    openSignUpModal: (state) => {
      state.signUpModalOpen = true;
    },
    closeSignUpModal: (state) => {
      state.signUpModalOpen = false;
    },
    openSignInModal: (state) => {
      state.signInModalOpen = true;
    },
    closeSignInModal: (state) => {
      state.signInModalOpen = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.signInModalOpen = false;
      state.user = action.payload;
    });

    builder.addCase(fetchMovies.pending, (state, action) => {
      state.loadingMovies = 'loading';
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.loadingMovies = 'succeeded';
      state.movies = state.movies.concat(action.payload)
    });
    // .addCase(builder.rejected, (state, action) => {
    //   state.loadingMovies = 'failed';
    //   state.error = action.error.message
    // })

  },
  
});
export const { handlelogIn, handlelogOut, openSignUpModal, closeSignUpModal, openSignInModal, closeSignInModal } =
  filmfindrSlice.actions;
export default filmfindrSlice.reducer;

export const signUp = createAsyncThunk("signUp", async (event) => {
  // need to change to sign up user logic (db call with insert)
  event.preventDefault();
  console.log(event.target[0].value);
  console.log(event.target[1].value);
});
export const signIn = createAsyncThunk("signIn", async (event) => {
  // need to change to sign in logic (db call with select)
  event.preventDefault();
  console.log(event.target[0].value);
  console.log(event.target[1].value);
  let response = await fetch("https://swapi.dev/api/people/1");
  response = await response.json();
  return {username:'fakename'};
});

export const fetchMovies = createAsyncThunk("fetchMovies", async () => {
  // need to change to fetch movies logic (db call with select)
  let response = await fetch("https://swapi.dev/api/people/1");
  response = await response.json();
  console.log('fetching movies')
  return {moviename: 'fakemovie'};
});