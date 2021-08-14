import { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import Cookies from "js-cookie";

import useUser from "../hooks/useUser";

export default function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const { user, mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });

  const submitHandler = () => {
    axios
      .post(`/auth/${isLogin ? "login" : "register"}`, {
        username: username,
        password: password,
      })
      .then((response) => {
        const today = new Date();
        const expires = new Date(
          today.getTime() + parseInt(response.data.jwt.expires)
        );
        const jwt = response.data.jwt.token.replace("Bearer ", "");
        Cookies.set("jwt", jwt, { expires: expires });
        mutateUser(response.data.user);
        Router.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col justify-center w-2/3 mx-auto flex-initial text-center">
      <p>This is the {isLogin ? "log" : "sign"} in page</p>
      <p>Username</p>
      <input
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <p>Password</p>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button onClick={submitHandler}>{isLogin ? "LOG IN" : "SIGN UP"}</button>
      <button onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? "sign up" : "log in"}
      </button>
    </div>
  );
}
