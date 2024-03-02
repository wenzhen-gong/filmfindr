import { Link, Outlet } from "react-router-dom";
import { Button } from './styledComponents'

function handleSignOut() {
  alert("handleSignOut placeholder");
}

function App() {
  return (
    <div>
      {/* <nav> */}
        <ul>
          <li>
            <Link to="/">
              <Button>Home</Button>
            </Link>
          </li>
          <li>
            <Link to="mymovies">
              <Button>My Movies</Button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <Button onClick = { handleSignOut }>Log Out</Button>
            </Link>
          </li>
        </ul>
      {/* </nav> */}
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
