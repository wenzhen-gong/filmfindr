import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies } from "../utils/filmfindrSlice";
export default function MyMovies() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.myReducers.movies);
  // const loadingMovies = useSelector((state) => state.myReducers.loadingMovies);
  // console.log('loadingMovies: ', loadingMovies)

  // console.log('movies: ', movies)
  useEffect(() => {
    dispatch(fetchMovies());

  }, []);

  // if (loadingMovies) return <p>Loading...</p>;

  return <div>{movies}</div>;
}
