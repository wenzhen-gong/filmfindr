import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteMovie, fetchMovies } from "../utils/filmfindrSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";

export default function MyMovies() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.myReducers.user);
  const movies = useSelector((state) => state.myReducers.movies);
  const loadingMovies = useSelector((state) => state.myReducers.loadingMovies);
  const myMoviesFlag = useSelector((state) => state.myReducers.myMoviesFlag);

  useEffect(() => {
    if (loadingMovies === "idle") dispatch(fetchMovies(user));
  }, [loadingMovies, dispatch]);
  if (loadingMovies === "loading") return <div>loading...</div>;

  return movies.map((movie, index) => {
    return (
      <>
        <div>{myMoviesFlag.toString()}</div>
        <div className="recommendation-container">
          <FontAwesomeIcon
            icon={faHeart}
            color="red"
            onClick = {() => dispatch(deleteMovie({movie, user}))}
          />
          <h3>{movie.MovieTitle}</h3>
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
      </>
    );
  });
}
