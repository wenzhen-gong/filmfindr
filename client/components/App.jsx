import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  handlelogIn,
  handlelogOut,
  openSignUpModal,
  openSignInModal,
} from "../utils/filmfindrSlice";
import { TopRightButton, TopLeftButton } from "./styledcomponents";
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const isLoggedIn = useSelector((state) => state.myReducers.isLoggedIn);
  const user = useSelector((state) => state.myReducers.user);
  const dispatch = useDispatch();

  return (
    <>
    <div className="flex justify-between bg-black p-2 fixed top-0 right-0 left-0 opacity-90">
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
              {/* <TopLeftButton
                onClick={() =>
                  dispatch(fetchUser())
                    .unwrap()
                    .then((data) => {
                      console.log(data);
                    })
                }
              >
                TRY fetchuser
              </TopLeftButton> */}
            </>
          )}
        </div>
        <div className="nav-links">
          <TopRightButton>
            <Link className="link" to="/">Home</Link>
          </TopRightButton>
          <TopRightButton>
            <Link className="link" to="mymovies">My Movies</Link>
          </TopRightButton>
          <TopRightButton onClick={() => dispatch(handlelogOut())}>
            <Link className="link" to="/">Log Out </Link>
          </TopRightButton>
        </div>
      </div>
      
      <SignUpModal />
      <SignInModal />

      <div>
        <Outlet />
      </div>

    </>
  );
}

export default App;
