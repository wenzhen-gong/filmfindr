import React from "react";
import './style.css';
import { useSelector, useDispatch } from "react-redux";
import MyMovies from "./MyMovies";
const MyMoviesContainer = () => {
  const isLoggedIn = useSelector((state) => state.myReducers.isLoggedIn);

  return (
<div className="flex items-center justify-center h-screen">
  {isLoggedIn ? <MyMovies /> : <p className="text-gray-200 text-4xl">Log in to access your movie collections.</p>}
</div>
  );
};

export default MyMoviesContainer;
