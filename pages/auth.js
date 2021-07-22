import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const submitHandler = () => {
    console.log(isLogin ? "LOG" : "SIGN", "IN", username, password);
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
      <button onClick={submitHandler}>{isLogin ? "LOG" : "SIGN"} IN</button>
      <button onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? "sign" : "log"} in
      </button>
    </div>
  );
}
