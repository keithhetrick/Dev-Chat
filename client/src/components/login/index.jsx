import { useState, useEffect } from "react";
import { usePostLoginMutation, usePostSignUpMutation } from "@/state/api";
import logo from "../../assets/logo.svg";

import ErrorMessage from "../../hooks/useErrorMessage.jsx";

const Login = ({ setUser, setSecret }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [triggerLogin, resultLogin] = usePostLoginMutation();
  const [triggerSignUp] = usePostSignUpMutation();

  // ERROR HANDLING
  const [errors, setErrors] = useState(null);

  const handleLogin = () => {
    triggerLogin({ username, password });

    if (resultLogin.error) {
      setErrors(resultLogin.error?.data?.error);
    }

    if (!username || !password) {
      setErrors("Please enter a username and password");
    } else if (username.length < 3 || password.length < 3) {
      setErrors("Username and password must be at least 3 characters");
    } else if (username.length > 20 || password.length > 20) {
      setErrors("Username and password must be less than 20 characters");
    } else if (resultLogin.error?.status === 429) {
      setErrors("Too many requests");
    } else if (resultLogin.error?.status === 500) {
      setErrors("Unable to login");
    } else if (resultLogin.error?.status === 404) {
      setErrors("Not found");
    } else if (resultLogin.error?.status === 401) {
      setErrors("Unauthorized");
    } else if (resultLogin.error?.status === 400) {
      setErrors("Bad request");
    } else if (resultLogin.error?.status === 403) {
      setErrors("Forbidden");
    } else if (resultLogin.error?.status === 408) {
      setErrors("Request timeout");
    } else if (resultLogin.error?.status === 503) {
      setErrors("Service unavailable");
    } else if (resultLogin.error?.status === 502) {
      setErrors("Bad gateway");
    }
  };

  const handleRegister = () => {
    triggerSignUp({ username, password });

    // error/validation handling
    if (resultLogin.error) {
      setErrors(resultLogin.error?.data?.error);
    }

    if (!username || !password) {
      setErrors("Please enter a username and password");
    } else if (username.length < 3 || password.length < 3) {
      setErrors("Username and password must be at least 3 characters");
    } else if (username.length > 20 || password.length > 20) {
      setErrors("Username and password must be less than 20 characters");
    }
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
          <ErrorMessage
            variant={errors ? "danger" : "success"}
            message={errors}
          />
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
