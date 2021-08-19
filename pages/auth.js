import { useState } from "react";
import axios from "axios";
import Router from "next/router";
import Cookies from "js-cookie";

import AuthForm from "../components/Forms/AuthForm";
import useUser from "../hooks/useUser";
import Button from "../components/UI/Button/Button";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user, mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });

  const submitHandler = ({ username, password } = {}) => {
    console.log("submit");
    setError(false);
    setIsLoading(true);
    axios
      .post(`/auth/${isLogin ? "login" : "register"}`, {
        username: username,
        password: password,
      })
      .then((res) => {
        if (!res.data.success) {
          console.log(res.data);
          setError(res.data.message);
          setIsLoading(false);
        } else {
          const today = new Date();
          const expires = new Date(
            today.getTime() + parseInt(res.data.jwt.expires)
          );
          const jwt = res.data.jwt.token.replace("Bearer ", "");
          Cookies.set("jwt", jwt, { expires: expires });
          mutateUser(res.data.user);
          Router.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setError(err);
      });
  };

  return (
    <div className="mt-6 w-2/3 mx-auto flex-initial text-center">
      <AuthForm submitHandler={submitHandler} />
      <div className="w-full my-3">
        <Button onClick={() => setIsLogin(!isLogin)}>
          Switch to {isLogin ? "sign up" : "log in"}
        </Button>
      </div>
      {error && (
        <div className="m-auto mt-6 w-1/5 text-center border border-red-600 bg-red-200">
          <p>{error}</p>
        </div>
      )}
      {isLoading && <div className="spinner"></div>}
    </div>
  );
}
