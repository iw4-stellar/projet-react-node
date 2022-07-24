import { API_URL } from "../utils/constants";

const reqConfig = {
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Access-Control-Allow-Headers":
      "x-access-token, Origin, Content-Type, Accept",
  },
  method: "POST",
};

const register = async (email, password, firstName, lastName, pathway) => {
  reqConfig.body = JSON.stringify({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    pathway: pathway,
  });
  return await fetch(`${API_URL}/auth/signup`, reqConfig)
    .then((res) => res.json())
    .then((data) => console.log(data));
};

const login = async (email, password) => {
  reqConfig.body = JSON.stringify({ email: email, password: password });
  return await fetch(`${API_URL}/auth/signin`, reqConfig)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.accessToken) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      return data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const verifyUser = async (token) => {
  return await fetch(`${API_URL}/auth/confirm/${token}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
};

const authHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.accessToken) {
        return { "x-access-token": user.accessToken };
    }
    return {};
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
    verifyUser,
    authHeader,
};