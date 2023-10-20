import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";
import CustomerNavbar from "./CustomerNavbar";
import { Link } from "react-router-dom";

const Order = () => {
  const { customerId } = useContext(UserContext);

  const [orders, setOrders] = useState([]);

  const [msg,setMsg] = useState('')
  const user = localStorage.getItem("user");
  const [empty, setEmpty] = useState("");
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async (e) => {
    const res = await axios.get(
      `http://localhost:8080/orders/find/${customerId}`
    );
    setOrders(res.data);
  };
  return (
    <>
      <CustomerNavbar />
      <div className="container-fluid">
        <Link to={`/home/${user}`} className="btn btn-dark mx-1 float-end my-1">
          🏠
        </Link>
        <button className="btn btn-warning float-end m-1 " onClick={()=>loadData()}>↻</button>
        <h5>Order History</h5>
        <table className="table table-striped my-4">
          <thead>
            <tr>
            <th> Product Image</th>
              <th>OrderId</th>
              <th>Car name</th>
              <th>Color</th>
              <th>Model</th>
              <th>Price</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          {orders.length > 0 ? (
            orders.map((o) => (
              <tbody>
                <tr>
                <td>
                <img src={o.url} height={100} width={190} alt="" />
                </td>
                  <td>{o.orderId}</td>
                  <td>{o.name}</td>
                  <td>{o.color}</td>
                  <td>{o.modelNo}</td>
                  <td>₹{o.price}</td>
                  <td>{o.status}</td>
                  <td>{o.date}</td>
                </tr>
              </tbody>
            ))
          ) : (
            <div className="card p-3 fw-bold text-center fs-4 my-3">
              Make your first order...
            </div>
          )}
        </table>
      </div>
    </>
  );
};

export default Order;
