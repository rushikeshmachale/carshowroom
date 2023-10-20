import axios from "axios";
import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MY_URL } from "../../context/prodvalues";
const AdminOrderUpdate = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [prod, setProd] = useState({
    name: "",
    customerId: "",
    color: "",
    modelNo: "",
    price: "",
    status: "",
    url:"",
    date:""
    
  });

  const { name, customerId, color, price, modelNo,url, status,date } = prod;
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    const result = await axios.get(
      `${MY_URL}/orders/findorder/${orderId}`
    );
    setProd(result.data);
  };
  const change = (e) => {
    setProd({ ...prod, [e.target.name]: e.target.value });
  };
  const submit = async (e) => {
    e.preventDefault();
    await axios
      .put(`${MY_URL}/orders/update/${orderId}`, {
        orderId,
        name,
        color,
        modelNo,
        price,
        customerId,
        status,
        url,
        date
      })
      .then(() => {
        navigate(`/admin/orders`);
      })
      .catch(() => {
        console.log("error while updating order");
      });
  };
  return (
    <div className="container">
      <form action="" className="form-control my-5">
        <div>
          <input
            type="text"
            className="form-control my-2"
            name="customerId"
            value={customerId}
            id=""
            onChange={change}
          />
          <input
            type="text"
            className="form-control my-2"
            value={name}
            name="name"
            id=""
            onChange={change}
          />
          <input
          type="text"
          className="form-control my-2"
          value={url}
          name="url"
          id=""
          onChange={change}
        />
          <input
            type="text"
            className="form-control my-2"
            value={orderId}
            name="orderId"
            id=""
            onChange={change}
          />

          <input
            type="text"
            className="form-control my-2"
            value={color}
            name="color"
            id=""
            onChange={change}
          />
          <input
            type="text"
            className="form-control my-2"
            value={price}
            name="price"
            id=""
            onChange={change}
          />
          <input
          type="text"
          className="form-control my-2"
          value={date}
          name="date"
          id=""
          onChange={change}
        />
          <input
            type="text"
            className="form-control my-2"
            value={modelNo}
            name="modelNo"
            id=""
            onChange={change}
          />

          <select
            className="form-control -my-2"
            id=""
            name="status"
            value={status}
            onChange={change}
          >
            <option >
              {status}
            </option>
            <option name="pending" value="pending">
              pending
            </option>
            <option name="received" value="received">
              received
            </option>
            <option name="Out for delivery" value="Out for delivery">
              Out for delivery
            </option>
            <option name="Delivered" value="Delivered">
              Delivered
            </option>
          </select>

          <button className="btn btn-info my-2" onClick={submit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminOrderUpdate;
