import { SWRConfig } from "swr";
import axios from "axios";
import "../styles/globals.css";

axios.defaults.baseURL =
  process.env.VERCEL_ENV === "production"
    ? "https://nea-revision-app.vercel.app/api"
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/api`
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
