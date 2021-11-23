import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
      ? "https://nea-revision-app.vercel.app/api"
      : process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
      : "http://localhost:3000/api",
});

export default axiosInstance;
