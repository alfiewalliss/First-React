import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./RegisterBox.module.css";
import Card from "../ui/Card";
import { useRef } from "react";

function RegisterBox(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const fNameRef = useRef();
  const lNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const fName = fNameRef.current.value;
    const lName = lNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    fetch("http://localhost:3005/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: fName,
        lastName: lName,
        email: email,
        username: fName,
        password: password,
        age: 18,
      }),
    });
  };

  return (
    <Card>
      <form className={classes.content} onSubmit={handleSubmit}>
        <div className={classes.formField}>
          <label htmlFor="fName">First Name:</label>
          <input
            value={fName}
            type="text"
            placeholder="First Name"
            id="fName"
            name="fName"
            onChange={(e) => setFName(e.target.value)}
            ref={fNameRef}
          />
        </div>
        <div className={classes.formField}>
          <label htmlFor="lName">Last Name:</label>
          <input
            value={lName}
            type="text"
            placeholder="Last Name"
            id="lName"
            name="lName"
            onChange={(e) => setLName(e.target.value)}
            ref={lNameRef}
          />
        </div>
        <div className={classes.formField}>
          <label htmlFor="email">Email:</label>
          <input
            value={email}
            type="email"
            placeholder="youremail@email.com"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            ref={emailRef}
          />
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
            ref={passwordRef}
          />
        </div>
        <button type="submit" className={classes.submitButton}>
          Register
        </button>
        <Link to="/login" className={classes.smallText}>
          Already have an account? Login here
        </Link>
      </form>
    </Card>
  );
}

export default RegisterBox;
