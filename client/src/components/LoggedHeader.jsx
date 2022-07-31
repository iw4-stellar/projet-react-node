import UsersIcon from "./Icons/UsersIcon";
import UserIcon from "./Icons/UserIcon";
import ChatIcon from "./Icons/ChatIcon";
import LogoutIcon from "./Icons/LogoutIcon";
import { Link } from "react-router-dom";

export default function LoggedHeader() {
  return (
    <header>
      <div className="brand">
        <a href="#" id="logo">
          studypals
        </a>
      </div>

      <div className="actions">
        <Link
          to="/users"
          className="chat-icon button is-icon is-primary is-text"
          title="Users"
        >
          <UsersIcon />
        </Link>
        <Link
          to="/profile"
          className="chat-icon button is-icon is-secondary is-text"
          title="Profile"
        >
          <UserIcon />
        </Link>
        <Link
          to="/chat"
          className="chat-icon button is-icon is-success is-text"
          title="Chat"
        >
          <ChatIcon />
        </Link>
        <Link
          to="/logout"
          className="logout-icon button is-icon is-danger is-text"
          title="Logout"
        >
          <LogoutIcon />
        </Link>
      </div>
    </header>
  );
}
