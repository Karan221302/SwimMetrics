import axios from "axios";

const API = axios.create({
  baseURL: "https://swimmetrics.onrender.com/api",
  timeout: 10000
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      alert("Session expired. Please login again.");
      window.location.href = "/";
    }

    if (err.response?.status === 403) {
      console.warn("403 Forbidden - access issue");
    }

    return Promise.reject(err);
  }
);

export default API;