import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { MY_URL } from "../../context/prodvalues";
const Signin = () => {
  // const [catagory, setCatagory] = useState('');

  let catagory = "";

  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { email, password } = user;
  // onchange()

  // change()

  const onchange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const change = (e) => {
    catagory = e.target.value;
    // setCatagory({[e.target.name]:e.target.value})
  };

  const { setEmailVal } = useContext(UserContext);
  const [btnClass, setBtnClass] = useState("btn btn-light");
  const submit = async (e) => {
    e.preventDefault();
    // setCatagory(catagory)
    if (catagory === "admin") {
      await axios
        .post(`${MY_URL}/car/admin/login`, user)
        .then(() => {
          localStorage.setItem("admin", email);
          setEmailVal({ email });
          // navigate(`/adminhome/${email}`);
          navigate(`/adminhome/${email}`);
        })
        .catch(() => setError("Invalid credentials"));
    }
    if (catagory === "customer") {
      await axios
        .post(`${MY_URL}/car/customer/login`, user)
        .then(() => {
          localStorage.setItem("user", email);

          setEmailVal({ email });
          navigate(`/home/${email}`);
        })
        .catch(() => setError("Employee not found"));
    }
  };
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
          <div className="float-end"
          style={{cursor:"pointer"}} onClick={btnClick}>
            {btn}
          </div>
        </div>
        <span className="text-center text-danger m-1 ">{error}</span>
        <h2 className="text-center">Login</h2>

        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          name="email"
          onChange={onchange}
          value={email}
          className="form-control"
          id="email"
          placeholder="username"
          required
        />
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          onChange={onchange}
          value={password}
          className="form-control"
          id="password"
          placeholder="password"
          required
        />
        <label htmlFor="password" className="form-label">
          Catagory
        </label>
        <div>
          <select className="form-select" onChange={change} name="" id="">
            <option value="type">select type</option>
            <option name="admin" value="admin">
              admin
            </option>
            <option name="customer" value="customer">
              customer
            </option>
          </select>
        </div>

        <button className={`${btnClass} my-4`} onClick={submit}>
          Submit
        </button>
        <Link className="text-decoration-none" to="/register">
          Don't' have an account? Register
        </Link>
      </form>
    </div>
  );
};

export default Signin;
