import { SWRConfig } from "swr";
import axios from "axios";
import "../styles/globals.css";

axios.defaults.baseURL = `${process.env.BASE_URL}/api`;

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
