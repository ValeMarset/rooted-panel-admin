import React from "react";
import styles from "./Sidebar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { logout } from "../../redux/adminReducer";
import toast from "react-hot-toast";

//Imported logos
import { IoMdSpeedometer } from "react-icons/io";
import { MdDeliveryDining } from "react-icons/md";
import { MdOutlineExplore } from "react-icons/md";
import { TbPlant } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import { AiFillEdit } from "react-icons/ai";
import { BsQuestionCircle } from "react-icons/bs";

export default function Sidebar() {
  const admin = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    toast.success("See you soon!");

    navigate("/");
  };

  const handleImg = (image) => {
    navigate(`/profile/${admin && admin.admin.id}`);
  };

  return (
    <div
      className={` ${styles.sideBar} ${styles.grid} ${styles.bgSidebar} fixed-bottom  z-2`}
    >
      <div className={` ${styles.menuDiv}`}>
        <h3 className={`${styles.divTitle} pt-5`}>QUICK MENU</h3>
        <ul
          className={` ${styles.menuLists} ${styles.grid} list-unstyled ps-md-4`}
        >
          <li className={`${styles.listItem}`}>
            <Link to="/" className={` ${styles.menuLink} ${styles.flex}`}>
              <TbPlant className={` ${styles.icon}`} />
              <span className={`${styles.smallText}`}>Products</span>
            </Link>
          </li>

          <li className={`${styles.listItem}`}>
            <Link to="/orders" className={` ${styles.menuLink} ${styles.flex}`}>
              <MdDeliveryDining className={` ${styles.icon}`} />
              <span className={`${styles.smallText}`}>My Orders</span>
            </Link>
          </li>

          <li className={`${styles.listItem}`}>
            <Link
              to="/categories"
              className={` ${styles.menuLink} ${styles.flex}`}
            >
              <IoMdSpeedometer className={` ${styles.icon}`} />{" "}
              <span className={`${styles.smallText}`}>Categories</span>
            </Link>
          </li>
          <li className={`${styles.listItem}`}>
            <Link to="/admins" className={` ${styles.menuLink} ${styles.flex}`}>
              <MdOutlineExplore className={` ${styles.icon}`} />
              <span className={`${styles.smallText}`}>Administrators</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className={`${styles.settingsDiv}`}>
        <h3 className={`${styles.divTitle}`}>ACCOUNT</h3>
        <ul
          className={` ${styles.menuLists} ${styles.grid} list-unstyled ps-md-4`}
        >
          <li className={`${styles.listItem}`}>
            <Link
              to="/login"
              className={` ${styles.menuLink} ${styles.flex}`}
              onClick={handleLogout}
            >
              <FiLogOut className={` ${styles.icon}`} />
              <span className={` ${styles.smallText}`}>Log out</span>
            </Link>
          </li>
          <li className={`${styles.listItem}`}>
            <Link
              onClick={handleImg}
              to={`/profile/${admin.admin.id}`}
              className={` ${styles.menuLink} ${styles.flex}`}
            >
              <AiFillEdit className={` ${styles.icon}`} />
              <span className={` ${styles.smallText}`}>Edit profile</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
