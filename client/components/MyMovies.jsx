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

  return <div><table>
  <thead>
    <tr>
      <th>Title</th>
      <th>Review</th>
      <th>Rating</th>
    </tr>
  </thead>
  <tbody>
    {movies.map((movie) => (
      <tr key={movie.id}>
        <td>{movie.title}</td>
        <td>{movie.review}</td>
        <td>{movie.rating}</td>
      </tr>
    ))}
  </tbody>
</table></div>;
}
