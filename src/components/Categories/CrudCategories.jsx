import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import styles from "./CrudCategories.module.css";
import toast from "react-hot-toast";
import Loader from "../Loader";

export default function CrudCategories() {
  const admin = useSelector((state) => state.admin);
  const [categories, setCategories] = useState([]);
  const [categoryDelete, setCategoryDelete] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios({
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
          method: "get",
          url: `${process.env.REACT_APP_BACK_URL}/categories`,
        });
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Something went wrong");
        setLoading(false);
      }
    };
    getCategories();
  }, [admin.token]);

  const deleteCategory = async (category) => {
    try {
      await axios({
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
        method: "delete",
        url: `${process.env.REACT_APP_BACK_URL}/categories`,
        data: category,
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleModal = (category) => {
    setShow(true);
    setCategoryDelete(category);
  };

  const handleDeleteCategory = () => {
    deleteCategory(categoryDelete);
    setShow(false);
  };

  return (
    <>
      <div className="container shadow p-5 rounded my-5">
        <div className="d-flex justify-content-between align-items-baseline my-4">
          <h2 className="mt-3 titleDashboard">Categories</h2>

          <Link to="/categories/create" className=" secondaryButton">
            Add Category
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
                <th>Img</th>
                <th>Actions</th>
              </tr>
            </thead>
            {categories.map((category) => (
              <>
                {" "}
                <tbody>
                  <tr>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>
                      {category.description.length > 70
                        ? category.description.slice(0, 70) + "..."
                        : category.description}
                    </td>
                    <td className="">
                      <img
                        src={`${process.env.REACT_APP_IMAGES_URL}/${category.img}`}
                        alt={category.name}
                        className=""
                        style={{ width: "7rem " }}
                      />
                    </td>
                    <td>
                      <div className="d-flex">
                        <Link
                          to={`/categories/update/${category.id}`}
                          className="me-4"
                        >
                          <i
                            className={`${styles.colorText} bi bi-pencil h5`}
                          ></i>{" "}
                        </Link>{" "}
                        <i
                          className={`${styles.colorText} clickable bi bi-trash-fill h5`}
                          onClick={() => handleModal(category)}
                        ></i>{" "}
                        <Modal show={show} onHide={() => setShow(false)}>
                          <Modal.Header closeButton>
                            <Modal.Title>Are you sure?</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            Removing this category is permanent and cannot be
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
                              onClick={() => handleDeleteCategory()}
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
