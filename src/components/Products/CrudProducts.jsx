import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import styles from "./CrudProducts.module.css";
import toast from "react-hot-toast";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Loader from "../Loader";

export default function CrudProducts() {
  const admin = useSelector((state) => state.admin);
  const [products, setProducts] = useState([]);
  const [productDelete, setProductDelete] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios({
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
          method: "get",
          url: `${process.env.REACT_APP_BACK_URL}/products`,
        });
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Something went wrong");
        setLoading(false);
      }
    };
    getProducts();
  }, [admin.token]);
  const deleteProduct = async (product) => {
    try {
      await axios({
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
        method: "delete",
        url: `${process.env.REACT_APP_BACK_URL}/products`,
        data: product,
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleModal = (product) => {
    setShow(true);
    setProductDelete(product);
  };

  const handleDeleteProduct = () => {
    deleteProduct(productDelete);
    setShow(false);
  };

  return (
    <>
      <div className="container shadow p-5 rounded my-5">
        <div className="d-flex justify-content-between align-items-baseline mb-5">
          <h2 className="mt-3 titleDashboard">Products</h2>

          <Link to="/products/create" className=" secondaryButton">
            Add Products
          </Link>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <Table className={` ${styles.table} lh-lg`}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Description</th>
                <th>Summary</th>
                <th>Price</th>
                <th>Img</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            {products.map((product) => (
              <>
                {" "}
                <tbody>
                  <tr>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>
                      {product.description.length > 70
                        ? product.description.slice(0, 70) + "..."
                        : product.description}
                    </td>

                    <td>
                      {product.summary.length > 70
                        ? product.summary.slice(0, 70) + "..."
                        : product.summary}
                    </td>
                    <td>USD {product.price}</td>
                    <td>
                      <img
                        src={`${process.env.REACT_APP_IMAGES_URL}/${product.img}`}
                        alt={product.name}
                        style={{ width: "7rem " }}
                      />
                    </td>
                    <td>{product.stock}</td>
                    <td>
                      <div className="d-flex">
                        <Link
                          to={`/products/update/${product.id}`}
                          className="me-4"
                        >
                          <i
                            className={`${styles.colorText} bi bi-pencil h5`}
                          ></i>{" "}
                        </Link>
                        <i
                          className={`${styles.colorText} clickable bi bi-trash-fill h5`}
                          onClick={() => handleModal(product)}
                        ></i>{" "}
                        <Modal show={show} onHide={() => setShow(false)}>
                          <Modal.Header closeButton>
                            <Modal.Title>Are you sure?</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            Removing this product is permanent and cannot be
                            undone.
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="secondary"
                              onClick={() => setShow(false)}
                            >
                              Take me back
                            </Button>
                            <Button
                              variant="primary"
                              onClick={() => handleDeleteProduct()}
                            >
                              Yes
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    </td>
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
