import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import styles from "./CrudAdmin.module.css";
import toast from "react-hot-toast";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Loader from "../Loader";

export default function CrudAdmins() {
  const admin = useSelector((state) => state.admin);
  const [admins, setAdmins] = useState([]);
  const [adminDelete, setAdminDelete] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAdmins = async () => {
      try {
        const response = await axios({
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
          method: "get",
          url: `${process.env.REACT_APP_BACK_URL}/admins`,
        });
        setAdmins(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Something went wrong");
        setLoading(false);
      }
    };
    getAdmins();
  }, [admin.token]);

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
      <div className="container p-md-5 p-2 rounded my-5 containerSections">
        <div className="d-flex justify-content-between align-items-baseline my-4">
          <h2 className="mt-3 titleDashboard">Administrator</h2>

          <Link to="/admins/create" className=" secondaryButton">
            Add Administrator
          </Link>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <Table className={` ${styles.table} table-responsive`}>
            <thead>
              <tr>
                <th className="d-none d-lg-table-cell">Id</th>
                <th className="d-none d-lg-table-cell">Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
                <th className="d-none d-lg-table-cell">Address</th>
                <th className="d-none d-lg-table-cell">Phone</th>
                <th>Avatar</th>
                <th>Actions</th>
              </tr>
            </thead>
            {admins.map((administrator) => (
              <>
                {" "}
                <tbody>
                  <tr>
                    <td className="d-none d-lg-table-cell">
                      {administrator.id}
                    </td>
                    <td className="d-none d-lg-table-cell">
                      {administrator.firstname}
                    </td>
                    <td>{administrator.lastname}</td>
                    <td>{administrator.email}</td>
                    <td className="d-none d-lg-table-cell">
                      {administrator.address}
                    </td>
                    <td className="d-none d-lg-table-cell">
                      {administrator.phone}
                    </td>
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
                              onClick={() => handleDeleteAdmin()}
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
