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
      <div className="grid grid-cols-2 grid-rows-1">
        <div>
          {isLoggedIn ? (
            <TopLeftButton onClick={() => dispatch(openSignInModal())}>
              hi, {user.username}
            </TopLeftButton>
          ) : (
            <>
              <TopLeftButton onClick={() => dispatch(openSignUpModal())}>
                Sign Up
              </TopLeftButton>
              <TopLeftButton onClick={() => dispatch(openSignInModal())}>
                Log In
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
        <div className="grid grid-cols-4 grid-rows-1">
          <TopRightButton>
            <Link to="/">Home</Link>
          </TopRightButton>
          <TopRightButton>
            <Link to="mymovies">My Movies</Link>
          </TopRightButton>
          <TopRightButton onClick={() => dispatch(handlelogOut())}>
            <Link  to="/">Log Out </Link>
          </TopRightButton>
        </div>
        {/* <div>FOR TEST PURPOSE ONLY{user.name}</div> */}
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
