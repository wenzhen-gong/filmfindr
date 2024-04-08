import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteMovie, fetchMovies } from "../utils/filmfindrSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export default function MyMovies() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.myReducers.user);
  const movies = useSelector((state) => state.myReducers.movies);
  const loadingMovies = useSelector((state) => state.myReducers.loadingMovies);
  const [deleteCount, setDeleteCount] = useState(0)
  
  // console.log("user from state.myReducers.user", user)
  useEffect(() => {
    if (loadingMovies === "idle") dispatch(fetchMovies({user}));
    
  }, [loadingMovies, dispatch, user, deleteCount]);
  if (loadingMovies === "loading") return <div>loading...</div>;
  
  
  return (
    <>
<div className="flex flex-col items-center justify-center min-h-screen mt-16 overflow-auto">
    {movies.map((movie, index) => (
      <div key={index} className="flex flex-col bg-gray-700 shadow-lg rounded-lg w-64 h-40 mx-auto">
        <div className="flex justify-end p-4">
          <FontAwesomeIcon
            icon={faEye}
            color="red"
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this movie?')) {
                dispatch(deleteMovie({ movie, user }));
                setDeleteCount(deleteCount + 1);
              }
            }}
            className="cursor-pointer text-4xl"
          />
        </div>
        <div className="flex items-center px-4 py-2 mt-2 text-center">
          <h2 className="font-bold text-2xl pb-10 mb-2 text-gray-200">{movie.MovieTitle}</h2>
            {/* <p>Reviews:{movie.Review}</p>
            <div>
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

                return (
                  <label key={i}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      style={{ display: "none" }}
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      color={ratingValue <= movie.Stars ? "#ffc107" : "#e4e5e9"}
                    />
                  </label>
                );
              })}
            </div> */}
          </div>
        </div>
      ))}
      </div>
    </>
  );
}
