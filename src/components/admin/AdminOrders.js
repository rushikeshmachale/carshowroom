import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { MY_URL } from "../../context/prodvalues";
const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    const result = await axios.get(`${MY_URL}/orders/get`);
    setOrders(result.data);
  };
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <button
          className="btn btn-warning float-end m-1 "
          onClick={() => loadData()}
        >
          ↻
        </button>
        <table className="table ">
          <thead>
            <tr>
              <th>Orderid</th>
              <th>name</th>
              <th>modelNo</th>
              <th>color</th>
              <th>price</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((x, index) => (
              <tr key={index}>
                <Link className="form-control" to={`/admin/order/${x.orderId}`}>
                  {x.orderId}
                </Link>
                <td>{x.name}</td>
                <td>{x.modelNo}</td>
                <td>{x.color}</td>
                <td>₹{x.price}</td>
                <td>{x.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminOrders;
