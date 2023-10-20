import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ViewCar = () => {
  const { modelNo } = useParams();

  const [car, setCar] = useState([]);
  useEffect(() => {
    loadData();
  }, []);
  const admin = localStorage.getItem("admin");
  const loadData = async (e) => {
    const result = await axios.get(
      `http://localhost:8080/car/findmodel/${modelNo}`
    );
    setCar(result.data);
  };
  return (
    <div className="container">
   
      <div className="card shadow my-5">
        <div className="card-body">
          <div className="m-4 d-flex">
            <img
              src={car.url}
              className=" col-md-1 col-xl-8 col-md-10 "
              alt=""
              height={400}
              width={300}
            />

            <div className="card-text">
              <div className=" d-flex flex-column mx-4 ">
                <h3 className=" text-secondary">{car.name}</h3>
                <div className="card-text py-2 ">
                  <b>Color : </b>
                  {car.color}
                </div>
                <div className="card-text  py-2">
                  <b>Ratings : </b>
                  <b className="text-danger ">{car.ratings}</b>
                </div>

                <div className="card-text py-2">
                  <b>Engine : </b>
                  {car.engine}
                </div>
                <div className="card-text py-2">
                  <b>Production Year : </b>
                  {car.prodyear}
                </div>

                <div className="card-text py-2">
                  <b>Price : </b>
                  ₹{car.price}
                </div>
                </div>
                </div>
                </div>
              <Link to={`/adminhome/${admin}`} className="btn btn-dark mx-4 my-1">
              Home
            </Link>
        </div>
    
      </div>
    </div>
  );
};

export default ViewCar;
