import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdateCar = () => {
  const { modelNo } = useParams();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [product, setProduct] = useState({
    id: "",
    name: "",
    color: "",
    engine: "",
    prodyear: "",
    price: "",
    ratings: "",
    url:""
  });

  const { id, name, color, engine, prodyear, price, ratings,url } = product;

  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    const result = await axios.get(
      `http://localhost:8080/car/findmodel/${modelNo}`
    );
    setProduct(result.data);
  };
  const change = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const admin = localStorage.getItem("admin")
  const submit = async (e) => {
    e.preventDefault()
    await axios.put(`http://localhost:8080/car/update/${modelNo}`,product)
    .then(()=>{
      setMsg("data updated success");
      navigate(`/adminhome/${admin}`)
    }).catch(()=>{
      setMsg("error while updating");
    })
  };

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
        name="url"
        value={url}
        onChange={change}
        placeholder="Enter Url"
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
        <Link to={`/adminhome/${admin}`} className="btn btn-danger m-2">
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default UpdateCar;
