import { SWRConfig } from "swr";

import "../styles/globals.css";

import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{ fetcher: (url) => axios.get(url).then((res) => res.data) }}
    >
      <Navbar />
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
