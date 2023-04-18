import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import styles from "./NavbarPanel.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showLogin } from "../../redux/loginViewReducer";

import toast from "react-hot-toast";

function NavbarPanel() {
  const admin = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(showLogin());
  };

  return (
    <Navbar bg="light" className="fixed-top d-flex justify-content-between ">
      <Link to="/" className="text-decoration-none ">
        <div className={` ${styles.logoDiv} ${styles.flex} ms-3`}>
          <img src="img/logoEquipo.png" alt="logo" />
          <h2 id="rooted" className={`${styles.textLogo} mt-3`}>
            Rooted
          </h2>
        </div>
      </Link>
      {/* <Navbar.Brand href="#home" className="ms-4">
        <div className="title">
          <p>Hello {admin.admin.firstname}, welcome back!</p>
        </div>{" "}
      </Navbar.Brand> */}

      <div className="d-flex align-items-center">
        {!admin && (
          <Link
            className="text-decoration-none h5 fw-semibold mb-0  pe-3 me-4"
            to="/"
            onClick={handleLogin}
          >
            Sign In
          </Link>
        )}
        {admin && (
          <>
            {admin.admin.avatar ? (
              <img
                className={` ${styles.imgAdmin} ms-2  position-relative `}
                src={`${process.env.REACT_APP_IMAGES_URL}/${admin.admin.avatar}`}
                alt="image of admin"
              />
            ) : (
              <i
                className={`bi bi-person-circle text-white h4 ms-3 me-4  position-absolute `}
              ></i>
            )}
          </>
        )}
      </div>
    </Navbar>
  );
}

export default NavbarPanel;
