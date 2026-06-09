import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = axios.create({
  baseURL: "https://swimmetrics.onrender.com/api" 
});

API.interceptors.request.use(async (req) => {
  const token = await AsyncStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;