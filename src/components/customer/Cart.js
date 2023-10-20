import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserContext from "../../context/UserContext";
import CustomerNavbar from "./CustomerNavbar";

const Cart = () => {
  const { customerId } = useContext(UserContext);

  const [cart, setCart] = useState([]);

  let user = localStorage.getItem("user")
  const [val,setVal] = useState(0)
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async (e) => {
    const result = await axios.get(
      `http://localhost:8080/cart/find/${customerId}`
    );
    setCart(result.data);
    // for(let i=0;i<cart.length;i++){
    //   setCart(val+result.data.price)
    // }
  };

  const deleteItem=async(id)=>{
    await axios.delete(`http://localhost:8080/cart/delete/${id}`)
    loadData()
  }
  return (
    <>
      <CustomerNavbar />
      <div className="container">
      <div className="float-end">
      <button className="btn btn-warning  " onClick={()=>loadData()}>↻</button>
      <Link to={`/home/${user}`} className="btn btn-dark mx-1">🏠</Link>
      </div>
      <h5 className="my-2">Cart </h5>
        <table className="table table-striped table-hover my-4">
          <tbody>
            {cart.length>0 ? cart.map((c) => (
              <tr >
              <td>
              <img src={c.url} alt="" height={100} width={190} />
              </td>
                <td className="m-3 p-3">{c.name}</td>
                <td className="m-3 p-3">{c.modelNo}</td>
                <td className="m-3 p-3">{c.color}</td>
                <td className="m-3 p-3">₹{c.price}</td>
                <td>
                <Link  
                onClick={()=>deleteItem(c.id)}
                className="btn btn-danger">delete</Link>
                </td>
              </tr>
            )):( <div className="card p-3 fw-bold text-center fs-4 my-3">Add first item to Cart..</div>)}
          </tbody>
         
        </table>
      </div>
    </>
  );
};

export default Cart;
