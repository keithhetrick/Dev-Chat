import { useState, useEffect } from "react";
import { usePostLoginMutation, usePostSignUpMutation } from "@/state/api";
import logo from "../../assets/logo.svg";

const Login = ({ setUser, setSecret }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [triggerLogin, resultLogin] = usePostLoginMutation();
  const [triggerSignUp] = usePostSignUpMutation();

  const [errors, setErrors] = useState(null);

  const handleLogin = () => {
    triggerLogin({ username, password });

    if (resultLogin.error) {
      setErrors(resultLogin.error.data?.error);
    }
  };

  const handleRegister = () => {
    triggerSignUp({ username, password });
  };

  useEffect(() => {
    if (resultLogin.data?.response) {
      setUser(username);
      setSecret(password);
    }
  }, [resultLogin.data?.response]); // eslint-disable-line

  return (
    <div className="login-page">
      <div
        className="login-container"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div style={{ alignSelf: "center" }}>
          <img src={logo} alt="logo" width="200" height="200" />
        </div>

        {errors && (
          <div className="error">
            <p>{errors}</p>
          </div>
        )}

        {/* <h2 className="title">DEVChat APP</h2> */}
        <p
          className="register-change"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Already have an account?" : "Don't have an account?"}
        </p>
        <div>
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="login-actions">
          {isRegister ? (
            <button type="button" onClick={handleRegister}>
              Register
            </button>
          ) : (
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
