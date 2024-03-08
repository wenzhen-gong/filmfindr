import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies } from "../utils/filmfindrSlice";
export default function MyMovies() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.myReducers.movies);
  const loadingMovies = useSelector((state) => state.myReducers.loadingMovies);

  // console.log('movies: ', movies)
  useEffect(() => {
    if (loadingMovies === "idle") dispatch(fetchMovies());
  }, [loadingMovies, dispatch]);
  if(loadingMovies === "idle") return <div>idle...</div>;
  if(loadingMovies === "loading") return <div>loading...</div>;

  return <div>{movies[0].moviename}</div>;
}
