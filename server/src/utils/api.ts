
import axios from "axios";
import { configDotenv } from "dotenv";
configDotenv();
export const API = axios.create({
  baseURL: process.env.API,
  timeout: 5000,
});
