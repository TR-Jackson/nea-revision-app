import { SWRConfig } from "swr";
import axios from "../lib/axios-revise-app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (url) =>
          axios
            .get(url, {
              headers: {
                Authorization: document.cookie
                  .match(/^(.*;)?\s*jwt\s*=\s*[^;]+(.*)?$/)[0]
                  .replace("jwt=", ""),
              },
            })
            .then((res) => res.data),
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
