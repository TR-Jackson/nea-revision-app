import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";

export default function useUser({
  redirectTo = false,
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR("/user");

  useEffect(() => {
    if (!redirectTo || user === undefined) {
      console.log("no redirect or data not arrived");
      return;
    }
    console.log("data arrived");
    if (
      (redirectTo && !redirectIfFound && !user) ||
      (redirectIfFound && user)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser };
}

// https://github.com/vercel/next.js/blob/canary/examples/with-iron-session/lib/useUser.js