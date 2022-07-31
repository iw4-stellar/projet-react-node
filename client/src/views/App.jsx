import { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import LoggedHeader from "../components/LoggedHeader";
import { Outlet, useNavigate } from "react-router-dom";
import "../styles/App.css";

function App() {
  const [user] = useLocalStorage("user");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login", { replace: true });

    return () => {};
  }, []);

  return (
    <div id="app">
      <LoggedHeader />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
