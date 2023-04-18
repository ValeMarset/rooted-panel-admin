import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import styles from "./Order.module.css";

export default function Order() {
  const { id } = useParams();
  const admin = useSelector((state) => state.admin);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const getOrder = async () => {
      const response = await axios({
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
        method: "get",
        url: `${process.env.REACT_APP_BACK_URL}/orders/${id}`,
      });
      setOrder(response.data);
    };
    getOrder();
  }, []);

  return (
    order.products && (
      <>
        <div className="d-flex justify-content-between align-items-baseline my-4">
          <h2 className="mt-3 titleDashboard">Orders</h2>
          <Link to="/orders">
            <button className="rounded-0">Back to Orders</button>
          </Link>
        </div>
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
      </>
    )
  );
}
