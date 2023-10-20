import React from "react";
import { Link, useParams } from "react-router-dom";
const Navbar = () => {

  const adminName = localStorage.getItem("admin")
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
      <span>
        <Link className="navbar-brand" to={`/adminhome/${adminName}`}>
        Car Showroom
        </Link>
        </span>

        <span className="text-white">Admin Dashaboard</span>
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
          {adminName.substring(0, adminName.indexOf("@"))}
         🧞
          </span>

          <ul className="dropdown-menu my-2">
            <li>
              <Link className="dropdown-item" to={`/adminhome/${adminName}`}>
                Home
              </Link>
            </li>

            <li>
            <Link className="dropdown-item" to={`/admin/add`}>
              Add Product
            </Link>
          </li>
            <li>
              <Link className="dropdown-item" to={`/admin/orders`}>
                Order Requests
              </Link>
            </li>
            <li>
              <Link  className="dropdown-item" to="/" onClick={()=>localStorage.clear()}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
