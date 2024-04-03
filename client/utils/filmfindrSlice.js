import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  // below are Wenzhen's states
  isLoggedIn: false,
  signUpModalOpen: false,
  signInModalOpen: false,
  signInError: null,
  user: null,
  movies: [],
  loading: false,
  loadingMovies: "idle",
  myMoviesFlag: true,
  // below are David's states
  answers: {},
  currentQuestionIndex: 0,
  movieData: [
    // {
    //   picture:
    //     "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.imdb.com%2Ftitle%2Ftt4633694%2F&psig=AOvVaw",
    //   title: "Movie1",
    //   genre: "Action",
    //   description: "Movie1 description",
    //   reason: "movie1 resson",
    // },
    // {
    //   picture:
    //     "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.imdb.com%2Ftitle%2Ftt4633694%2F&psig=AOvVaw",
    //   title: "Movie2",
    //   genre: "Action",
    //   description: "Movie2 description",
    //   reason: "movie2 resson",
    // },
    // {
    //   picture:
    //     "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.imdb.com%2Ftitle%2Ftt4633694%2F&psig=AOvVaw",
    //   title: "Movie3",
    //   genre: "Action",
    //   description: "Movie3 description",
    //   reason: "movie3 resson",
    // },
  ],
  error: null,
  currentInput: "",
  movieRec: [],
};

export const filmfindrSlice = createSlice({
  name: "myReducers",
  initialState,
  reducers: {
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

    // below are David's synchronous reducers
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSignInError: (state, action) => {
      state.signInError = action.payload;
    
    },

    setCurrentQuestionIndex: (state, action) => {
      state.currentQuestionIndex = action.payload;
    },
    resetSignInError: (state) => {
      state.signInError = null;
    },
    setAnswers: (state, action) => {
      const name = `question_${state.currentQuestionIndex + 1}`;

      if (!action.payload) {
        const newAnswers = { ...state.answers };
        delete newAnswers[`question_${state.currentQuestionIndex + 1}`];
        state.answers = newAnswers;
      } else if (action.payload.type && action.payload.type === "checkbox") {
        const previousCheckedOptions = state.answers[name] || [];
        const newCheckedOptions = action.payload.checked
          ? [...previousCheckedOptions, action.payload.value]
          : previousCheckedOptions.filter(
              (option) => option !== action.payload.value
            );
        state.answers = {
          ...state.answers,
          [name]: newCheckedOptions,
        };
      } else if (action.payload.type && action.payload.type !== "checkbox") {
        state.answers = {
          ...state.answers,
          [name]: action.payload.value,
        };
      } else if (Array.isArray(action.payload)) {
        state.answers = {
          ...state.answers,
          [name]: [...state.movieRec],
        };
      } else {
        state.answers = {};
      }
    },

    setCurrentInput: (state, action) => {
      state.currentInput = action.payload;
    },

    setMovieRec: (state, action) => {
      if (typeof action.payload === "string") {
        state.movieRec = [...state.movieRec, action.payload];
      } else if (Array.isArray(action.payload)){
        state.movieRec = [];
      } else {
        state.movieRec = state.movieRec.filter(
          (movie, i) => i !== action.payload
        );
      }
    },
    resetMovieData: (state) => {
      state.movieData = [];
    },

    // // for personal review purpose
    //   handleReview: {
    //     reducer: (state, action) => {
    //       state.reviews = state.reviews.concat(action.payload);
    //       // how to set event.target[0].value = ''???
    //     },
    //     prepare: (event) => {
    //       event.preventDefault();
    //       return { payload: event.target[0].value };
    //     },
    //   },
  },

  extraReducers(builder) {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.signInModalOpen = false;
      state.user = action.payload;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.signInError = action.error;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.signUpModalOpen = false;
      state.user = action.payload;
    });

    builder.addCase(fetchMovies.pending, (state, action) => {
      state.loadingMovies = "loading";
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.loadingMovies = "succeeded";
      state.movies = action.payload;
    });

    builder.addCase(deleteMovie.fulfilled, (state, action) => {
      state.loadingMovies = "idle";
      state.movies = state.movies.filter((movie) => movie.MovieID !== action.payload);
    });

    // David's asynchronous reducer
    builder.addCase(sendAnswersToApi.fulfilled, (state, action) => {
      state.loading = false;
      state.movieData = action.payload;
    });
    builder.addCase(sendAnswersToApi.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(sendAnswersToApi.rejected, (state, action) => {
      state.loading = true;
      console.error("Failed to send answers:", action.payload);
      state.error = action.payload;
    });
    builder.addCase(addMovie.fulfilled, (state, action) => {
      state.movies = [...state.movies, action.payload];
    });
  },
});
export const {
  handlelogOut,
  openSignUpModal,
  closeSignUpModal,
  openSignInModal,
  closeSignInModal,
  resetSignInError,

  setError,
  setCurrentQuestionIndex,
  setAnswers,
  setCurrentInput,
  setMovieRec,
  resetMovieData,
} = filmfindrSlice.actions;

export default filmfindrSlice.reducer;

export const signUp = createAsyncThunk("signUp", async (event) => {
  event.preventDefault();
  const requestBody = {email: event.target[0].value, password: event.target[1].value};

  let response = await fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  // What response am I expecting?
  const user = await response.json();
  return user;
});

export const signIn = createAsyncThunk("signIn", async (event, thunkAPI) => {
  event.preventDefault();
  const searchParams = new URLSearchParams({
    email: event.target[0].value,
    password: event.target[1].value,
  });
  console.log(searchParams.toString());

  try {
    let response = await fetch(`http://localhost:3000/signin/${event.target[0].value}/${event.target[1].value}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error('Server responded with a non-200 status');
    }

    const user = await response.json();
    return user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const fetchMovies = createAsyncThunk("fetchMovies", async ({user}) => {
  // assuming fetch request will return corresponding movies object after db call

  let response = await fetch(
    "http://localhost:3000/mymovies2", 
    //+
      // new URLSearchParams({
      //   UserID: user.UserID,
      // }),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({user})
    }
  );
  const movies = await response.json();
 console.log(movies)
  return movies;
});

export const addMovie = createAsyncThunk("addMovie", async ({movie, user}) => {
 
  let response = await fetch("http://localhost:3000/mymovies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({movie, user}),
  });
  // What response am I expecting?
  response = await response.json();
  return response;
});

export const deleteMovie = createAsyncThunk("deleteMovie", async ({movie, user}) => {
  let response = await fetch(`http://localhost:3000/deleteMovies/${movie.MovieID}/${user.UserID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  // What response am I expecting?
  response = await response.json();
});

export const sendAnswersToApi = createAsyncThunk(
  "sendAnswersToApi",
  async (answers, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/recommendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answers),
      });
      const data = await response.json();
      console.log("data: ", data)
      if(data.err) {
        return rejectWithValue(data.err);
      }
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
