import { SWRConfig } from "swr";
import axios from "axios";
import "../styles/globals.css";

axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "https://nea-revision-app.vercel.app/api"
    : process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
    : "http://localhost:3000/api";

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{ fetcher: (url) => axios.get(url).then((res) => res.data) }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
