import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MY_URL } from "../../context/prodvalues";
const AddCar = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [product, setProduct] = useState({
    id: "",
    name: "",
    color: "",
    modelNo: "",
    engine: "",
    prodyear: "",
    price: "",
    ratings: "",
    url: "",
  });

  const { id, name, color, modelNo, engine, prodyear, price, ratings, url } =
    product;
  const change = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    const result = await axios
      .post(`${MY_URL}/car/add`, {
        ...product,
        modelNo: Math.floor(Math.random() * 10000),
      })
      .then(() => {
        setMsg("Car data added successfully..");
        navigate("/adminhome/abc@gmail.com");
      })
      .catch(() => {
        setMsg("Error while uploading car data!");
      });
  };
  const adm = localStorage.getItem("admin")
  return (
    <div className="container">
      {msg}
      <form action="" method="post" className="form-control m-3">
        <h2 className="text-center">Add Car Data</h2>

        <input
          type="text"
          className="form-control m-1"
          name="id"
          value={id}
          onChange={change}
          placeholder="Enter id"
        />
        <p className="mx-2 ">
          Visit car images
          <Link
            target="_blank"
            to="https://www.wallpaperflare.com/search?wallpaper=car"
          >
            {" "}
            here
          </Link>
        </p>
        <input
          type="text"
          className="form-control m-1"
          name="url"
          value={url}
          onChange={change}
          placeholder="Paste image url here.."
        />
        <input
          type="text"
          className="form-control m-1"
          name="name"
          value={name}
          onChange={change}
          placeholder="Enter name"
        />
        <input
          type="text"
          className="form-control m-1"
          name="color"
          value={color}
          onChange={change}
          placeholder="Enter color"
        />

        <input
          type="text"
          className="form-control m-1"
          name="engine"
          value={engine}
          onChange={change}
          placeholder="Enter engine"
        />
        <input
          type="text"
          className="form-control m-1"
          name="prodyear"
          value={prodyear}
          onChange={change}
          placeholder="Enter prodyear"
        />
        <input
          type="text"
          className="form-control m-1"
          name="price"
          value={price}
          onChange={change}
          placeholder="Enter price"
        />
        <input
          type="text"
          className="form-control m-1"
          name="ratings"
          value={ratings}
          onChange={change}
          placeholder="Enter ratings"
        />
        <button className="btn btn-info m-2" onClick={submit}>
          Submit
        </button>
        <Link to={`/adminhome/${adm}`} className="btn btn-danger m-2">
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default AddCar;
