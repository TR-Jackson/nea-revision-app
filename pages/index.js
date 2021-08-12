import Cookies from "js-cookie";
import Router from "next/router";

import useUser from "../hooks/useUser";

export default function Home() {
  const { user, mutateUser } = useUser({ redirectTo: "/auth" });

  const logoutHandler = () => {
    mutateUser(false);
    Cookies.remove("jwt");
    Router.push("/auth");
  };

  return (
    <div>
      <p>This is the home page</p>
      <br />
      <ul>
        <li>Hello {user?.username}</li>
        {user?.folders.length !== 0 ? (
          user.folders.map((folder) => <p>{folder}</p>)
        ) : (
          <li>No folders yet</li>
        )}
      </ul>
      <br />
      <button onClick={logoutHandler}>LOG OUT</button>
    </div>
  );
}
