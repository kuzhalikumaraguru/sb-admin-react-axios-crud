import axios from "axios";

const API_URL = "https://65990604a20d3dc41cef2a98.mockapi.io/api/react/ui";

const ApiService = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export default ApiService