import { SWRConfig } from "swr";
import axios from "axios";
import "../styles/globals.css";

axios.defaults.baseURL =
  process.env.VERCEL_ENV === "production"
    ? `${process.env.VERCEL_URL}/api`
    : process.env.BASE_URL
    ? `${process.env.BASE_URL}/api`
    : "http://localhost:3000/api";

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{ fetcher: (url) => axios.get(url).then((res) => res.data) }}
    >
      {console.log(process.env.VERCEL_URL)}
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
