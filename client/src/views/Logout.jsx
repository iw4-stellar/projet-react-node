import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Logout.css";

export default function Logout() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    localStorage.removeItem("user");

    const st = setTimeout(() => {
      setIsLoading(false);
      navigate("/login", { replace: true });
    }, 1000);

    return () => {
      clearTimeout(st);
    };
  }, []);

  return (
    <div id="logout">
      <div className="loader"></div>

      <p>Loging out...</p>
    </div>
  );
}
