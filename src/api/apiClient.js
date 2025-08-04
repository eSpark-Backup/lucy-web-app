// utils/apiClient.js
import axios from "axios";

const BASE_URL = 'https://lucyweb-be.stg.esparkconsultants.com/dev/api/v1/'; 

const apiClient = axios.create({
  baseURL: BASE_URL, 
  headers: {
    "Content-Type": "application/json",
  }, 
  withCredentials: true, // if your API uses cookies/session
});

export default apiClient;
