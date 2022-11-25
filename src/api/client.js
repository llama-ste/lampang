import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const client = axios.create();
client.defaults.baseURL = API_BASE_URL;
client.defaults.headers = {
  "Content-Type": "application/json",
};

export default client;
