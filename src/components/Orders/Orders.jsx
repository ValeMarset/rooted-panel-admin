import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import styles from "./Orders.module.css";
import Loader from "../Loader";
import toast from "react-hot-toast";

export default function Orders() {
  const admin = useSelector((state) => state.admin);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios({
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
          method: "get",
          url: `${process.env.REACT_APP_BACK_URL}/orders`,
        });
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Something went wrong");
        setLoading(false);
      }
    };

    getOrders();
  }, [admin.token]);

  return (
    <>
      <div className="container shadow p-5 rounded my-5">
        <div className="d-flex justify-content-between align-items-baseline my-4">
          <h2 className="mt-3 titleDashboard">Orders</h2>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <Table className={` ${styles.table} lh-lg`}>
            <thead>
              <tr>
                <th>Id</th>

                <th>User</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Products</th>
              </tr>
            </thead>
            {orders.map((order) => (
              <>
                {" "}
                <tbody>
                  <tr>
                    <td>{order.id}</td>
                    <td>{order.userId}</td>
                    <td>{order.email}</td>
                    <td>{order.address}</td>
                    <td>{order.phone}</td>
                    <td>{order.statusId}</td>

                    <td>
                      <Link to={`/orders/${order.id}`}>Expand</Link>
                    </td>

                    <td></td>
                  </tr>
                </tbody>
              </>
            ))}
          </Table>
        )}
      </div>
    </>
  );
}
