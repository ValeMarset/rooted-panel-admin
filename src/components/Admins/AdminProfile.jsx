import React from "react";
import styles from "./AdminProfile.module.css";
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { update } from "../../redux/adminReducer";

function AdminProfile() {
  const admin = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    setFirstname(admin.admin.firstname);
    setLastname(admin.admin.lastname);
    setEmail(admin.admin.email);
    setAddress(admin.admin.address);
    setPhone(admin.admin.phone);
    setImage(admin.admin.image);
  }, [admin]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("image", image);

    try {
      const updatedAdmin = await axios({
        url: `${process.env.REACT_APP_BACK_URL}/admin/${admin.admin.id}`,
        method: "PATCH",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      handleSave(updatedAdmin.data);
      toast.success("Your changes are successfully saveed");
      navigate("/");
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  const handleSave = (admin) => {
    dispatch(update(admin));
  };

  return (
    admin && (
      <>
        {" "}
        <div
          className={`d-flex align-items-center ps-5 py-3 w-100 container shadow mt-5`}
        >
          <div className="w-75 pt-5">
            {/* <h2 className="mt-3 titleDashboard">Profile</h2> */}
            <div>
              <div className="row border-bottom mb-4 pb-4 align-items-center mx-1">
                <div className="col-12">
                  {" "}
                  <h1>{admin.admin.firstname} </h1>
                </div>
              </div>

              <Form className="" onSubmit={handleUpdate}>
                <Form.Group className="border-bottom mb-4 pb-4 ms-3 me-3 d-flex">
                  <div className="row w-100 g-0">
                    <div className="col-6">
                      <Form.Label className="me-5">First Name</Form.Label>
                    </div>
                    <div className="col-6">
                      <Form.Control
                        type="text"
                        placeholder="First Name"
                        name="firstname"
                        id="firstname"
                        className="me-3 rounded-0 "
                        required
                        onChange={(e) => setFirstname(e.target.value)}
                        value={firstname}
                      />
                    </div>
                  </div>
                </Form.Group>

                <Form.Group className="border-bottom mb-4 pb-4 ms-3 me-3">
                  <div className="row w-100 g-0">
                    <div className="col-6">
                      <Form.Label>Last Name</Form.Label>
                    </div>
                    <div className="col-6">
                      {" "}
                      <Form.Control
                        type="text"
                        placeholder="Last Name"
                        name="lastname"
                        id="lastname"
                        className="me-3 rounded-0"
                        required
                        onChange={(e) => setLastname(e.target.value)}
                        value={lastname}
                      />
                    </div>
                  </div>
                </Form.Group>

                <Form.Group className="border-bottom mb-4 pb-4 ms-3 me-3">
                  <div className="row g-0">
                    <div className="col-6">
                      {" "}
                      <Form.Label>Address</Form.Label>
                    </div>
                    <div className="col-6">
                      {" "}
                      <Form.Control
                        type="text"
                        placeholder="Address"
                        name="address"
                        id="address"
                        required
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        className="rounded-0"
                      />
                    </div>
                  </div>
                </Form.Group>

                <Form.Group className="border-bottom mb-4 pb-4 ms-3 me-3">
                  <div className="row g-0">
                    <div className="col-6">
                      <Form.Label>Phone</Form.Label>
                    </div>
                    <div className="col-6">
                      <Form.Control
                        type="text"
                        placeholder="Your Phone"
                        name="phone"
                        id="phone"
                        className="rounded-0"
                        required
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                      />
                    </div>
                  </div>
                </Form.Group>
                <Form.Group className="border-bottom mb-4 pb-4 ms-3 me-3 ">
                  <div className="row g-0">
                    <div className="col-6">
                      {" "}
                      <Form.Label>Email</Form.Label>
                    </div>
                    <div className="col-6">
                      {" "}
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        id="emailRegister"
                        className="me-3 rounded-0"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </div>
                  </div>
                </Form.Group>

                <Form.Group className="border-bottom mb-4 pb-4 ms-3 me-3">
                  <div className="row g-0">
                    <div className="col-6">
                      {" "}
                      <Form.Label>Image</Form.Label>
                    </div>
                    <div className="col-6">
                      {" "}
                      <Form.Control
                        type="file"
                        name="image"
                        id="image"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="rounded-0"
                      />
                    </div>
                  </div>
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <button
                    className=" secondaryButton mt-4 mb-4 pe-5 ps-5 me-3"
                    type="submit"
                  >
                    Save changes
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default AdminProfile;
