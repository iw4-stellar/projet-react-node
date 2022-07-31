import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./views/App";
import Users from "./views/Users";
import Profile from "./views/Profile";
import Chat from "./views/Chat";
import Conversation from "./components/Chat/Conversation";
import Login from "./views/Login";
import Register from "./views/Register";
import Logout from "./views/Logout";
import "./styles/fonts.css";
import "./styles/index.css";
import useLocalStorage from "./hooks/useLocalStorage";
import Conversations from "./components/Chat/Conversations";

function StudyPals() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<App />}>
            <Route path="users" element={<Users />} />
            <Route path="profile" element={<Profile />} />
            <Route path="chat" element={<Chat />}>
              <Route path="conversations" element={<Conversations />} />
              <Route path="conversations/:id" element={<Conversation />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<StudyPals />);
