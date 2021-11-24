import useSWR from "swr";
import axios from "../lib/axiosConfig";

export default function useFolders() {
  const { data: folders, mutate: mutateFolders } = useSWR(
    "/folder/retrieve",
    axios
  );

  return { folders, mutateFolders };
}

// https://github.com/vercel/next.js/blob/canary/examples/with-iron-session/lib/useUser.js
