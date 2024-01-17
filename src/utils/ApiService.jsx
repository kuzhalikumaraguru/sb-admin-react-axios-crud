import axios from "axios";

const API_URL = "https://65a6253074cf4207b4ef5667.mockapi.io";

const ApiService = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export default ApiService