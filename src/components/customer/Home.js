import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import CustomerNavbar from "./CustomerNavbar";
import { MY_URL } from "../../context/prodvalues";
const Home = () => {
  const { emailVal } = useContext(UserContext);

  const { setCustomerId } = useContext(UserContext);

  const user = localStorage.getItem("user");
  useEffect(() => {
     axios.get(`${MY_URL}/car/get`)
    .then((res)=>{

      setProduct(res.data)
      setProds(res.data)
    })
    custId();

  }, []);
  const custId = async () => {
    const res = await axios.get(
      `${MY_URL}/car/customer/find/${emailVal.email}`
    );
    setCustomerId(res.data.id);
  };
  // let idval=customer.id
  // setCustomerId({idval})
  const [product, setProduct] = useState([]);

  const [prods,setProds]  =useState([])

  const loadData = async (e) => {
    await axios.get(`${MY_URL}/car/get`).then((result) => {
      setProduct(result.data);
    });
  };

  const filterAscendingPrice = () => {
    let sorted = [...product].sort((a, b) => a.price - b.price);
    setProds(sorted);
  };

  const filterDescendingPrice = () => {
    let sorted = [...product].sort((a, b) => b.price - a.price);
    setProds(sorted);
  };
  const newestfirst = () => {
    let sorted = [...product].sort((a, b) => b.prodyear - a.prodyear);
    setProds(sorted);
  };

  const oldestfirst = () => {
    let sorted = [...product].sort((a, b) => a.prodyear - b.prodyear);
    setProds(sorted);
  };

  const engineCapacity = (item) => {
    let sorted = [...product].sort((a, b) => (a.engine > b.engine ? 1 : -1));
    setProds(sorted);
  };

  const engineCapacity1 = (item) => {
    let sorted = [...product].sort((a, b) => (a.engine < b.engine ? 1 : -1));
    setProds(sorted);
  };

  const filterData = (e)=>{
    
      setProds(product.filter((f)=>f.name.toLowerCase().includes(e.target.value)) )

      // setProds(product.filter((f)=>f.color.toLowerCase().includes(e.target.value)))
  }
  return (
    <>
      <CustomerNavbar />
      <div className="container-fluid d-flex  float-start overflow-hidden top-0">
        <ul className="d-flex flex-column my-5 align-items-start  " style={{cursor:"pointer"}}>
          <div>Sort by : </div>
          <li>
            <div onClick={filterAscendingPrice}>Increasing Price</div>
          </li>
          <li>
            <div onClick={filterDescendingPrice}>Decreasing Price</div>
          </li>
          <li>
            <div onClick={newestfirst}>Newest first</div>
          </li>
          <li>
            <div onClick={oldestfirst}>Oldest first</div>
          </li>
          <li>
            <div onClick={engineCapacity}>Engine Capacity</div>
          </li>
          <li>
            <div onClick={engineCapacity1}>Engine Capacity Descending</div>
          </li>
        </ul>

        <div>
        <input type="text" className="form-control m-2" onChange={filterData} placeholder="🔍 Search here ..." />
          <div className="row d-flex justify-content-center">
            {prods.length > 0 ? prods.map((x, index) => (
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
                    <div className="card-text fs-2 text-danger">
                      {x.ratings}
                    </div>
                    <div className="card-text">
                      <b>Price ₹</b>
                      {x.price}
                    </div>
                  </div>
                </div>
                <div className="mx-3 my-1">
                  <Link to={`/view/${x.id}`} className="btn btn-info">
                    Cart
                  </Link>
                  <Link
                    to={`/view/${x.id}`}
                    className="btn btn-success m-2"
                  >
                    Buy
                  </Link>
                </div>
              </div>
            )) : <div className="form-control">
            <h3>No matching found...</h3></div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
