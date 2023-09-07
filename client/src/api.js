import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_PORT, // Update with your API base URL
});

export default api;
