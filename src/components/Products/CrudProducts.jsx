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
      <div className="container p-md-5 p-2 rounded my-5 containerSections">
        <div className="d-flex justify-content-between align-items-baseline mb-5 w-100">
          <h2 className="mt-3  titleDashboard">Products</h2>

          <Link to="/products/create" className="secondaryButton">
            Add Products
          </Link>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <Table className={` ${styles.table} lh-lg `}>
            <thead>
              <tr>
                <th className="d-none d-md-table-cell">Id</th>
                <th>Name</th>
                <th className="d-none d-lg-table-cell">Description</th>
                <th className="d-none d-lg-table-cell">Summary</th>
                <th className="d-none d-md-table-cell">Price</th>
                <th>Img</th>
                <th className="d-none d-md-table-cell">Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            {products.map((product) => (
              <>
                {" "}
                <tbody>
                  <tr>
                    <td className="d-none d-md-table-cell">{product.id}</td>
                    <td>{product.name}</td>
                    <td className="d-none d-lg-table-cell">
                      {product.description.length > 70
                        ? product.description.slice(0, 70) + "..."
                        : product.description}
                    </td>

                    <td className="d-none d-lg-table-cell">
                      {product.summary.length > 70
                        ? product.summary.slice(0, 70) + "..."
                        : product.summary}
                    </td>
                    <td className="d-none d-md-table-cell">
                      USD {product.price}
                    </td>
                    <td>
                      <img
                        src={`${process.env.REACT_APP_IMAGES_URL}/${product.img}`}
                        alt={product.name}
                        style={{ width: "5rem " }}
                      />
                    </td>
                    <td className="d-none d-md-table-cell">{product.stock}</td>
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
                            <button
                              className="primaryButton px-3"
                              onClick={() => setShow(false)}
                            >
                              Take me back
                            </button>
                            <button
                              className="secondaryButton px-3"
                              onClick={() => handleDeleteProduct()}
                            >
                              Yes
                            </button>
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
