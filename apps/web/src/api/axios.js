import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://13.206.221.43.nip.io",
  timeout: 10000,
  withCredentials: true,
});

export default axiosInstance;
