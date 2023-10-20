import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [customer, setCustomer] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });

  const { id, name, email, password } = customer;
  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };
  const [btnClass, setBtnClass] = useState("btn btn-light");
  let [myStyle, setMyStyle] = useState({
    backgroundColor: "#232323",
    height: "100vh",
    color: "#eeeeee",
  });

  let [formStyle, setFormStyle] = useState({
    backgroundColor: "black",
    color: "white",
  });

  const [btn, setBtn] = useState("☀");

  const submitData = async (e) => {
    e.preventDefault();
    const result = await axios
      .post("http://localhost:8080/car/customer/add", customer)
      .then(() => {
        navigate("/");
      })
      .catch(() => console.log("error"));
  };
  const btnClick = () => {
    if (btn === "☀") {
      setBtn("🌙");
      setMyStyle({
        backgroundColor: "#eeeeee",
        height: "100vh",
        color: "black",
      });
      setFormStyle({
        color: "black",
        backgroundColor: "white",
      });
      setBtnClass("btn btn-dark");
    } else {
      setBtn("☀");
      setMyStyle({
        backgroundColor: "#232323",
        height: "100vh",
        color: "white",
      });
      setFormStyle({
        color: "white",
        backgroundColor: "black",
      });
      setBtnClass("btn btn-light");
    }
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center "
      style={myStyle}
    >
      <form
        className="form-control opacity-100 d-flex flex-column card my-3 h-auto p-4 w-50"
        style={formStyle}
      >
        <div>
          <div className="float-end" style={{cursor:"pointer"}} onClick={btnClick}>
            {btn}
          </div>
        </div>
        <span className="text-center text-danger m-1 ">{error}</span>
        <h2 className="text-center">Login</h2>

        <label htmlFor="id" className="form-label">
          Id
        </label>
        <input
          type="email"
          name="id"
          onChange={handleChange}
          value={id}
          className="form-control"
          id="email"
          placeholder="Id"
          required
        />
        <label htmlFor="name" className="form-label">
        Name
      </label>
      <input
        type="email"
        name="name"
        onChange={handleChange}
        value={name}
        className="form-control"
        id="email"
        placeholder="Name"
        required
      />
      <label htmlFor="email" className="form-label">
      Email
    </label>
    <input
      type="email"
      name="email"
      onChange={handleChange}
      value={email}
      className="form-control"
      id="email"
      placeholder="Email"
      required
    />
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={password}
          className="form-control"
          id="password"
          placeholder="Password"
          required
        />
      
        <button className={`${btnClass} my-4`} onClick={submitData}>
          Submit
        </button>
        <Link className="text-decoration-none" to="/">
          Don't' have an account? Register
        </Link>
      </form>
    </div>
  );
};

export default Signup;
