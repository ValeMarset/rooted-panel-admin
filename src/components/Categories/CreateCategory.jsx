import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import NavbarPanel from "../home/NavbarPanel";

export default function CreateCategory() {
  const admin = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState();

  const createCategory = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("img", img);

    try {
      await axios({
        headers: {
          Authorization: `Bearer ${admin.token}`,
          "Content-Type": "multipart/form-data",
        },
        url: `${process.env.REACT_APP_BACK_URL}/categories`,
        method: "post",
        data: formData,
      });

      setName("");
      setDescription("");
      setImg(undefined);

      toast.success("Category created successfully!");
      navigate("/categories/create");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (img !== undefined) {
      createCategory();
    } else {
      toast.error("Missing fields");
    }
  };

  return (
    <>
      <NavbarPanel />
      <div className="row justify-content-center g-0">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
          <section className="container shadow p-5 mt-5 ">
            <h2 className="pt-3 mb-5 titleDashboard">Create Category</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="nameCategory"
                  id="nameCategory"
                  type="name"
                  placeholder="Name of Category"
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="rounded-0"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <textarea
                  name="description"
                  id="description"
                  cols="30"
                  rows="5"
                  className="form-control rounded-0"
                  required
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                ></textarea>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Image"
                  onChange={(e) => setImg(e.target.files[0])}
                  className="rounded-0"
                />
              </Form.Group>

              <div className=" mt-3 d-flex justify-content-end">
                <button
                  className="secondaryButton me-3 px-3 pt-2"
                  type="submit"
                >
                  Submit
                </button>
                <Link to="/categories" className="primaryButton px-3 pt-2">
                  Cancel
                </Link>
              </div>
            </Form>
          </section>
        </div>{" "}
      </div>
    </>
  );
}
