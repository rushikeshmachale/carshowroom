import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserContext from "../../context/UserContext";

const View = () => {
  const { id } = useParams();
  const [cart, setCart] = useState({});

  const user = localStorage.getItem("user")
  const navigate = useNavigate();
  const { customerId } = useContext(UserContext);
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async (e) => {
    const result = await axios.get(`http://localhost:8080/car/find/${id}`);
    setCart(result.data);
  };

  const addToCart = async (e) => {
    await axios
      .post(`http://localhost:8080/orders/add`, {
        name: cart.name,
        color: cart.color,
        customerId: customerId,
        modelNo: cart.modelNo,
        price: cart.price,
        orderId: Math.floor(Math.random() * 10000),
        status: "pending",
        url:cart.url,
        date: new Date()

      })
      .then(async() => {
        // await axios.post('http://localhost:8080/orders/mail')
        navigate(`/orders/${customerId}`);
      });
  };

  const submit = async (e) => {
    await axios
      .post(`http://localhost:8080/cart/add`, {
        name: cart.name,
        color: cart.color,
        customerId: customerId,
        modelNo: cart.modelNo,
        price: cart.price,
        url:cart.url
      })
      .then(() => {
        navigate(`/cart/${customerId}`);
      });
  };
  return (
    <div className="container">
      <div className="card shadow my-5">
        <div className="card-body">
          <div className="m-4 d-flex">
            <img src={cart.url} className=" col-md-1 col-xl-8 col-md-10 " alt="" height={400} width={300} />

            <div className="card-text">
              <div className=" d-flex flex-column mx-4 ">
                <h3 className=" text-secondary">{cart.name}</h3>
                <div className="card-text py-2 ">
                  <b>Color : </b>
                  {cart.color}
                </div>
                <div className="card-text  py-2">
                  <b>Ratings : </b>
                  <b className="text-danger ">{cart.ratings}</b>
                </div>

                <div className="card-text py-2">
                  <b>Engine : </b>
                  {cart.engine}
                </div>
                <div className="card-text py-2">
                  <b>Production Year : </b>
                  {cart.prodyear}
                </div>

                <div className="card-text py-2">
                  <b>Price : </b>
                  ₹{cart.price}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-2">
          <button onClick={submit} className="btn btn-info m-2">
            Cart
          </button>
          <button onClick={addToCart} className="btn btn-success m-2">
            Buy
          </button>
          <Link to={`/home/${user}`} className="btn btn-warning m-2">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
