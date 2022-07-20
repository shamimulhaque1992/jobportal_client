import * as React from "react";
import "./Navbar.module.css";
import job from "../../../assets/job-icon.png";
import { Link } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.inti";
import { signOut } from "firebase/auth";
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import SignpostIcon from '@mui/icons-material/Signpost';
import SettingsIcon from '@mui/icons-material/Settings';
const Navbar = () => {
  const [user] = useAuthState(auth);
  const email = user?.email;
  const handleSignOut = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
  };
  return (
    <div className="sticky top-0 z-50 p-0">
      <nav>
        <Link to="/" class="logo">
          <img src={job} alt="" />
        </Link>
        <ul>
          <li>
            <Link className="flex justify-center items-center" to="/"><HomeIcon></HomeIcon>Home</Link>
          </li>
          <li>
            <Link className="flex justify-center items-center" to="/viewjobs"><WorkIcon></WorkIcon>Veiw Jobs</Link>
          </li>
          <li>
            <Link className="flex justify-center items-center" to="/postjobs"><SignpostIcon></SignpostIcon>Post Jobs</Link>
          </li>
          <li>
            <Link className="flex justify-center items-center" to="/operation" title="Edit or Remove"><SettingsIcon></SettingsIcon>Operation</Link>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
          <li>
            <Link to="/contacts">Contacts</Link>
          </li>
        </ul>
        {user ? (
            <div className="dropdown dropdown-end">
              <div className="profile">
                <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={user?.photoURL ? user?.photoURL : ""} alt="" />
                  </div>
                </label>
                <ul
                  tabIndex="0"
                  className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="/dashboard/myprofiel" className="justify-between">
                      <label
                        tabIndex="0"
                        className="btn btn-ghost btn-circle avatar"
                      >
                        <div className="w-10 rounded-full">
                          <img
                            src={user?.photoURL ? user.photoURL : ""}
                            alt=""
                          />
                        </div>
                      </label>
                      <span className="text-xs">{user.displayName}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/myprofiel" className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings">Settings</Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      onClick={handleSignOut}
                      className="btn btn-sm btn-ghost text-lg normal-case justify-start pt-0"
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>):(<Stack direction="row" spacing={2}>
          <Link to="/login">
            <Button variant="contained">
              <LoginIcon></LoginIcon>
              Login
            </Button>
          </Link>

          <Link to="/register">
            <Button variant="contained">
              <HowToRegIcon></HowToRegIcon>Join
            </Button>
          </Link>
        </Stack>)}
        
      </nav>
    </div>
  );
};

export default Navbar;
