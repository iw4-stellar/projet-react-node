import "../styles/App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AuthService from "../services/auth";

import ConfirmUser from "./ConfirmUser";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user && user.id) {
      setCurrentUser(user);
    }
  }, []);

  function logOut() {
    AuthService.logout();
    setCurrentUser(null);
  }

  return (
    <div className="App">
      <nav className="nav">
        <div className="title-wrapper">
          <Link to="/" className="title">StudyPals</Link>
        </div>
        <div>
{/*           <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
          </ul> */}
        </div>
        <hr />
        {currentUser ? (
          <div>
            <ul>
              <li>
                <Link to="/profile">{`${currentUser.firstName} ${currentUser.lastName}`}</Link>
              </li>
              <li>
                <a href="/login" onClick={logOut}>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <ul className ="log">
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </div>
        )}
      </nav>

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/confirm/:token" element={<ConfirmUser />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
