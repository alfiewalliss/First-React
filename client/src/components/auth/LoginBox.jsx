import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../ui/Card";
import classes from "./LoginBox.module.css";
import { useRef } from "react";
import bcrypt from "bcryptjs";

// SALT should be created ONE TIME upon sign up
const salt = bcrypt.genSaltSync(10);
// example =>  $2a$10$CwTycUXWue0Thq9StjUM0u => to be added always to the password hash

function LoginBox(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    const response = await fetch("http://localhost:3005/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    });

    const data = await response.json();
    if (data.status) {
      localStorage.setItem("token", data.data.token);
      navigate("/");
    }
  };

  return (
    <Card className={classes.content}>
      <form className={classes.content} onSubmit={handleSubmit}>
        <div className={classes.formField}>
          <label htmlFor="email">Email:</label>
          <input
            value={email}
            type="text"
            placeholder="youremail@email.com"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            ref={emailInputRef}
          ></input>
        </div>
        <div className={classes.formField}>
          <label htmlFor="email">Password:</label>
          <input
            value={password}
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            onChange={(p) => setPassword(p.target.value)}
            ref={passwordInputRef}
          ></input>
        </div>
        <button type="submit" className={classes.submitButton}>
          Login
        </button>
        <Link to="/register" className={classes.smallText}>
          Don't have an account yet? Register here
        </Link>
      </form>
    </Card>
  );
}

export default LoginBox;
