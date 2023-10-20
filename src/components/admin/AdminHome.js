import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const AdminHome = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [product, setProduct] = useState([]);

  const username = localStorage.getItem("admin");
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (e) => {
    const result = await axios.get("http://localhost:8080/car/get");

    setProduct(result.data);
  };

  const deleteCar = async (id) => {
    await axios
      .delete(`http://localhost:8080/car/delete/${id}`)
      .then(() => {
        setMsg("Car deleted success");
        loadData();
      })
      .catch(() => {
        setMsg("error while deleting car data!");
      });
  };
  return (
    <div>
      <Navbar />

      <div className="row d-flex justify-content-center">
        {product.map((x, index) => (
          <div
            className="card col-md-6 col-lg-8 col-sm-6 col-xl-3 w-auto m-2"
            key={index}
          >
            <div className="card-body  ">
              <div className="m-3">
                <img src={x.url} alt="" height={250} width={330} />
                <div className="card-text text-success">
                  <h4>{x.name}</h4>
                </div>
                <div className="card-text">
                  <b>Color - </b>
                  {x.color}
                </div>

                <div className="card-text">
                  <b>CarID </b> {x.id}
                </div>

                <div className="card-text">
                  <b>ModelNo. </b>
                  {x.modelNo}
                </div>
                <div className="card-text">
                  <b>Engine - </b>
                  {x.engine}
                </div>
                <div className="card-text">
                  <b>Production year - </b>
                  {x.prodyear}
                </div>
                <div className="card-text fs-2 text-danger">{x.ratings}</div>
                <div className="card-text">
                  <b>Price </b> ₹{x.price}
                </div>
              </div>
            </div>
            <div className="mx-3 my-1">
              <Link to={`/adminview/${x.modelNo}`} className="btn btn-info">
                View
              </Link>
              <Link
                to={`/adminupdate/${x.modelNo}`}
                className="btn btn-success m-2"
              >
                Edit
              </Link>
              <button
                className="btn btn-danger"
                onClick={() => deleteCar(x.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
