import { useState } from "react";
import axios from "../lib/axios-revise-app";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const submitHandler = () => {
    axios
      .post(`/auth/${isLogin ? "login" : "register"}`, {
        username: username,
        password: password,
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col justify-start">
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
