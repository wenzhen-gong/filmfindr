import React from "react";
import './style.css';
import { useSelector, useDispatch } from "react-redux";
import MyMovies from "./MyMovies";
const MyMoviesContainer = () => {
  const isLoggedIn = useSelector((state) => state.myReducers.isLoggedIn);
  return (
    <div>
      {isLoggedIn? <MyMovies />:'Log in to Access your movie collections'}
    </div>
  );
};

export default MyMoviesContainer;
