import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import UserContext from "../../context/UserContext";
const CustomerNavbar = () => {

  const username = localStorage.getItem("user")
  const {emailVal} = useContext(UserContext)
  const {customerId} = useContext(UserContext)
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
      <span>
        <Link className="navbar-brand" to={`/home/${emailVal}`}>
        Car Showroom
        </Link>
        </span>

        <div className="dropdown mx-2">
          {/**
  
        <span className="dropdown-toggle mx-5 text-light border border-dark rounded-5 p-2 text-center"  type="button" data-bs-toggle="dropdown" aria-expanded="false">{email.substring(0, email.indexOf("@"))}</span>
 */}

          <span
            className="dropdown-toggle mx-5 text-light border border-dark rounded-5 p-2 text-center"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
         {username.substring(0, username.indexOf("@"))}
          </span>

          <ul className="dropdown-menu my-2">
            <li>
              <Link className="dropdown-item" to={`/home/${emailVal}`}>
                Home
              </Link>
            </li>
            <li>
            <Link className="dropdown-item" to={`/cart/${customerId}`}>
              Cart
            </Link>
          </li>

            <li>
              <Link className="dropdown-item" to={`/orders/${customerId}`}>
                Orders
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/" onClick={()=>localStorage.clear()}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default CustomerNavbar;
