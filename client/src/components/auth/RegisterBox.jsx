import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./RegisterBox.module.css";
import Card from "../ui/Card";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
function RegisterBox(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();
  const ages = [];
  for (let i = 18; i <= 100; i++) {
    ages.push(i);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3005/signup", {
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
    console.log("Response Status:", response.status);
    const data = await response.json();
    console.log(data);
    if (data.status) {
      localStorage.setItem("token", data.data.token);
      navigate("/");
    }
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
          />
        </div>

        <div className={classes.formField}>
          <label htmlFor="age">Age:</label>
          <br />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className={classes.formFieldAges}
          >
            {ages.map((age) => {
              return (
                <MenuItem key={`${age}`} value={age}>
                  {age}
                </MenuItem>
              );
            })}
          </Select>
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
