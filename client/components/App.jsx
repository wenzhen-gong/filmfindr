import { Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  handlelogIn,
  handlelogOut,
  openSignUpModal,
  openSignInModal,
  sendAnswersToApi
} from "../utils/filmfindrSlice";
import { TopRightButton, TopLeftButton, Logo } from "./styledcomponents";
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";
import logoImage from "./statics/film-findr-high-resolution-logo-transparent.png"
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const isLoggedIn = useSelector((state) => state.myReducers.isLoggedIn);
  const user = useSelector((state) => state.myReducers.user);
  const answers = useSelector((state) => state.myReducers.answers);
  const error = useSelector((state) => state.myReducers.error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error && error.status >=  500 && error.status < 600) {
      if (window.confirm('The server is busy at the moment. Would you like to retry?')) {
        dispatch(sendAnswersToApi(answers));
      }
    }
  }, [error, dispatch, answers]);

   return (
    <div className="app-container">
        <div className="flex justify-between bg-black p-2 opacity-90">
          <div>
            {isLoggedIn ? (
              <TopLeftButton onClick={() => dispatch(openSignInModal())}>
                hi, {user.UserName}
              </TopLeftButton>
            ) : (
              <>
                <TopLeftButton onClick={() => dispatch(openSignUpModal())}>
                  Sign Up
                </TopLeftButton>
                <TopLeftButton onClick={() => dispatch(openSignInModal())}>
                  Sign In
                </TopLeftButton>
              </>
            )}
          </div>
          <div>
            <Logo src={logoImage} alt="FilmFindr Logo" />
          </div>
          <div className="nav-links">
            <TopRightButton>
              {/* <Link className="link" to="/">Home</Link> */}
            </TopRightButton>
            <TopRightButton>
              {/* <Link className="link" to="mymovies">My Movies</Link> */}
            </TopRightButton>
            <TopRightButton onClick={() => dispatch(handlelogOut())}>
              <Link className="link" to="/">Log Out </Link>
            </TopRightButton>
          </div>
        </div>
      
      <SignUpModal />
      <SignInModal />

      <div className="content-container">
        <div className="outlet-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
  
}

export default App;