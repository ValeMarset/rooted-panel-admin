import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import styles from "./CrudAdmin.module.css";
import toast from "react-hot-toast";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function CrudAdmins() {
  const admin = useSelector((state) => state.admin);
  const [admins, setAdmins] = useState([]);
  const [adminDelete, setAdminDelete] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const getAdmins = async () => {
      const response = await axios({
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
        method: "get",
        url: `${process.env.REACT_APP_BACK_URL}/admins`,
      });
      setAdmins(response.data);
    };
    getAdmins();
  }, [admins]);

  const deleteAdmin = async (administrator) => {
    try {
      await axios({
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
        method: "delete",
        url: `${process.env.REACT_APP_BACK_URL}/admins`,
        data: administrator,
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleModal = (administrator) => {
    setShow(true);
    setAdminDelete(administrator);
  };

  const handleDeleteAdmin = () => {
    deleteAdmin(adminDelete);
    setShow(false);
  };

  return (
    <>
      <div className="pt-5 ps-4 ">
        <div className="d-flex justify-content-between align-items-baseline my-4">
          <h2 className="mt-3 titleDashboard">Administrator</h2>

          <Link to="/admins/create" className=" secondaryButton">
            Add Administrator
          </Link>
        </div>
        <Table className={` ${styles.table} table-responsive`}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Avatar</th>
              <th>Actions</th>
            </tr>
          </thead>
          {admins.map((administrator) => (
            <>
              {" "}
              <tbody>
                <tr>
                  <td>{administrator.id}</td>
                  <td>{administrator.firstname}</td>
                  <td>{administrator.lastname}</td>
                  <td>{administrator.email}</td>
                  <td>{administrator.address}</td>
                  <td>{administrator.phone}</td>
                  <td>
                    <img
                      src={
                        process.env.REACT_APP_IMAGES_URL +
                        "/" +
                        administrator.avatar
                      }
                      alt={administrator.firstname}
                      className="rounded-circle object-fit-cover"
                      style={{ width: "35px", height: "2.5rem " }}
                    />
                  </td>
                  <td>
                    <div className="d-flex">
                      <i
                        className={`${styles.colorText} clickable bi bi-trash-fill h5`}
                        onClick={() => handleModal(administrator)}
                      ></i>{" "}
                      <Modal show={show} onHide={() => setShow(false)}>
                        <Modal.Header closeButton>
                          <Modal.Title>Are you sure?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          Removing this administrator is permanent and cannot be
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
                            onClick={() => handleDeleteAdmin()}
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
      </div>
    </>
  );
}
