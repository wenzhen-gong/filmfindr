import { Link, Outlet } from "react-router-dom";
import { Button, SignUpButton } from "./styledcomponents";
import "./style.css";

function handleSignOut() {
  alert("handleSignOut placeholder");
}

function App() {
  return (
    <>
      <div className="grid grid-cols-2 grid-rows-1">
        <SignUpButton>Sign Up</SignUpButton>
        <div className="grid grid-cols-3 grid-rows-1">
          <Link to="/">
            <Button>Home</Button>
          </Link>
          <Link to="mymovies">
            <Button>My Movies</Button>
          </Link>
          <Link to="/">
            <Button onClick={handleSignOut}>Log Out</Button>
          </Link>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
