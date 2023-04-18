import React, { useState } from "react";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CreateAdmin() {
  const admin = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState();

  const createAdmin = async () => {
    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("avatar", avatar);

    try {
      await axios({
        headers: {
          Authorization: `Bearer ${admin.token}`,
          "Content-Type": "multipart/form-data",
        },
        url: `${process.env.REACT_APP_BACK_URL}/admins`,
        method: "post",
        data: formData,
      });

      toast.success("Product created successfully!");
      navigate("/admins");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createAdmin();
  };

  return (
    <>
      <div
        className="d-flex justify-content-end mt-5"
        style={{ width: "32rem" }}
      >
        <Link to="/admins">
          <button className="secondaryButton rounded-0">
            Back to Administrators
          </button>
        </Link>
      </div>
      <section className="d-flex justify-content-center align-items-center mt-5 pt-5">
        <Card style={{ width: "30rem" }} className="p-3 rounded-0">
          <Card.Body>
            <h2>Create Administrator</h2>
            <Card.Text>
              <Form className="" onSubmit={(e) => handleSubmit(e)}>
                <div className="d-flex">
                  <Form.Group className="mb-3 me-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      name="firstname"
                      id="firstname"
                      className="me-3 rounded-0"
                      required
                      onChange={(e) => setFirstname(e.target.value)}
                      value={firstname}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
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
                  </Form.Group>
                </div>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
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
                </Form.Group>
                <div className="d-flex">
                  <Form.Group className="mb-3 me-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="number"
                      required
                      placeholder="Your Phone"
                      name="phone"
                      id="phone"
                      className="me-3 rounded-0"
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 ">
                    <Form.Label>Email</Form.Label>
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
                  </Form.Group>
                </div>

                <Form.Group className="mb-3">
                  <Form.Label>Avatar</Form.Label>
                  <Form.Control
                    type="file"
                    name="avatar"
                    id="avatar"
                    onChange={(e) => setAvatar(e.target.files[0])}
                    className="rounded-0"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    id="passwordRegister"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="rounded-0"
                  />
                </Form.Group>
                <div className="d-grid gap-2 mt-4">
                  <button className="secondaryButton" type="submit">
                    Sumbit
                  </button>
                </div>
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
      </section>
    </>
  );
}
