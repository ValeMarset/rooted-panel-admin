import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import styles from "./Order.module.css";
import toast from "react-hot-toast";
import Loader from "../Loader";

export default function Order() {
  const { id } = useParams();
  const admin = useSelector((state) => state.admin);
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const response = await axios({
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
          method: "get",
          url: `${process.env.REACT_APP_BACK_URL}/orders/${id}`,
        });
        setOrder(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Something went wrong");
        setLoading(false);
      }
    };
    getOrder();
  }, [admin.token]);

  return (
    order.products && (
      <>
        <div className="container shadow p-5 rounded my-5">
          <div className="d-flex justify-content-between align-items-baseline mb-5">
            <h2 className="my-3  titleDashboard">Order</h2>
            <Link to="/orders">
              <button className="secondaryButton">Back to Orders</button>
            </Link>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <Table className={` ${styles.table} `}>
              <thead>
                <tr>
                  <th>Product Id</th>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              {order.products.map((product) => (
                <>
                  {" "}
                  <tbody>
                    <tr>
                      <td>{product.productId}</td>
                      <td>{product.productName}</td>
                      <td>{product.price}</td>
                      <td>{product.quantity}</td>

                      <td></td>
                    </tr>
                  </tbody>
                </>
              ))}
            </Table>
          )}
        </div>
      </>
    )
  );
}
