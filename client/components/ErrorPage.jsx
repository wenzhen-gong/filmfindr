import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteError } from "react-router-dom";
import { sendAnswersToApi } from "../utils/filmfindrSlice";

export default function ErrorPage() {
  
  const dispatch = useDispatch();
  const error = useRouteError();
  const answers = useSelector((state) => state.myReducers.answers);
  const previousMovies = useSelector((state) => state.myReducers.previousMovies);
  console.error(error);

  useEffect(() => {
    if (error && error.status >=  500 && error.status < 600) {
      if (window.confirm('The server is busy at the moment. Would you like to retry?')) {
        dispatch(sendAnswersToApi({ answers, previousMovies }));
      }
    }
  }, [error, dispatch, answers]);
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}