import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  // below are Wenzhen's states
  isLoggedIn: false,
  signUpModalOpen: false,
  signInModalOpen: false,
  user: null,
  movies: [],
  loadingMovies: "idle",

  // below are David's states
  answers: {},
  currentQuestionIndex: 0,
  movieData: [
    {
      picture:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.imdb.com%2Ftitle%2Ftt4633694%2F&psig=AOvVaw",
      title: "Spiderman",
      genre: "Action",
      description: "A young Peter Parker/Spider",
      reason: "good stuff",
    },
    {
      picture:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.imdb.com%2Ftitle%2Ftt4633694%2F&psig=AOvVaw",
      title: "Spiderman",
      genre: "Action",
      description: "A young Peter Parker/Spider",
      reason: "good stuff",
    },
    {
      picture:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.imdb.com%2Ftitle%2Ftt4633694%2F&psig=AOvVaw",
      title: "Spiderman",
      genre: "Action",
      description: "A young Peter Parker/Spider",
      reason: "good stuff",
    },
  ],
  error: null,
  currentInput: "",
  movieRec: [],
  // for each moive?
  isFavorite: false,
  isHovered: false,
  reviews: [],
  rating: 0,
  hover: 0,
};

export const filmfindrSlice = createSlice({
  name: "myReducers",
  initialState,
  reducers: {
    // handlelogIn: (state) => {
    //   // other logics need to be written like authorization
    //   state.isLoggedIn = true;
    //   console.log("mimicing logging in");
    // },
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

    testreducer: {
      reducer: (state, action) => {
        console.log(action.payload);
        state.isLoggedIn = true;
        state.signInModalOpen = false;
        state.user = action.payload;
      },
      prepare: (event) => ({ payload: event.target[0].value }),
    },

    // below are David's synchronous reducers
    setError: (state, action) => {
      state.error = action.payload;
    },

    setCurrentQuestionIndex: (state, action) => {
      state.currentQuestionIndex = action.payload;
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
      } else if(action.payload.type && action.payload.type !== "checkbox"){
        state.answers = {
          ...state.answers,
          [name]: action.payload.value,
        };
      }
      else{
        state.answers = {
          ...state.answers,
          [name]: action.payload,
        };
      }
    },

    setCurrentInput: (state, action) => {
      state.currentInput = action.payload;
    },

    setMovieRec: (state, action) => {
      if (typeof action.payload === "string") {
        state.movieRec = [...state.movieRec, action.payload];
      } else {
        state.movieRec = state.movieRec.filter(
          (movie, i) => i !== action.payload
        );
      }
    },

    // maybe for each movie?
    handleFavorite: (state) => {
      state.isFavorite = !state.isFavorite;
    },

    handleReview: {
      reducer: (state, action) => {
        state.reviews = state.reviews.concat(action.payload);
        // how to set event.target[0].value = ''???
      },
      prepare: (event) => {
        event.preventDefault();
        return { payload: event.target[0].value };
      },
    },

    handleReviewDelete: (state, action) => {
      state.reviews = state.reviews.filter((review, i) => i !== action.payload);
    },

    setIsHovered: (state, action) => {
      state.isHovered = action.payload;
    },

    setHover: (state, action) => {
      state.hover = action.payload;
    },

    setRating: (state, action) => {
      state.rating = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.signInModalOpen = false;
      state.user = action.payload;
    });

    builder.addCase(fetchMovies.pending, (state, action) => {
      state.loadingMovies = "loading";
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.loadingMovies = "succeeded";
      state.movies = state.movies.concat(action.payload);
    });

    // David's asynchronous reducer
    builder.addCase(sendAnswersToApi.fulfilled, (state, action) => {
      state.movieData = action.payload;
    });
    builder.addCase(sendAnswersToApi.rejected, (state, action) => {
      console.error("Failed to send answers:", action.payload.errorMessage);
    });
  },
});
export const {
  handlelogOut,
  openSignUpModal,
  closeSignUpModal,
  openSignInModal,
  closeSignInModal,
  testreducer,

  setError,
  setCurrentQuestionIndex,
  setAnswers,
  setCurrentInput,
  setMovieRec,

  handleFavorite,
  handleReview,
  handleReviewDelete,
  setIsHovered,
  setHover,
  setRating,
} = filmfindrSlice.actions;
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
  return { username: "fakename" };
});

export const fetchMovies = createAsyncThunk("fetchMovies", async () => {
  // need to change to fetch movies logic (db call with select)
  let response = await fetch("https://swapi.dev/api/people/1");
  response = await response.json();
  console.log("fetching movies");
  return { moviename: "fakemovie" };
});

// David's asynchronous reducer

export const sendAnswersToApi = createAsyncThunk(
  "sendAnswersToApi",
  async (answers, { rejectWithValue }) => {
    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answers),
      });
      const data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
