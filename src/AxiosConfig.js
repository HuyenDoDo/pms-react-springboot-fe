import axios from "axios";

const myBaseUrl = "http://localhost:5000/api/v1";

const instance = axios.create({
  baseURL: myBaseUrl,
  headers: { "Content-Type": "application/json" },
});

export default instance;
