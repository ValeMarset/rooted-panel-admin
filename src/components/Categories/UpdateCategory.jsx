import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import NavbarPanel from "../home/NavbarPanel";

export default function UpdateCategory() {
  const admin = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState();

  useEffect(() => {
    const getCategory = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/categories/${id}`
      );
      const { data } = response;

      setName(data.name);
      setDescription(data.description);
      setImg(data.img);
    };
    getCategory();
  }, []);

  const updateCategory = async () => {
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
        url: `${process.env.REACT_APP_BACK_URL}/categories/${id}`,
        method: "patch",
        data: formData,
      });

      toast.success("Category modifyed successfully!");
      navigate("/categories");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (img !== undefined) {
      updateCategory();
    } else {
      toast.error("Missing fields");
    }
  };

  return (
    <>
      <NavbarPanel />
      <div className="row justify-content-center g-0">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
          <section className="container shadow p-5 mt-5">
            <h2 className="pt-3 mb-5 titleDashboard">Update Category</h2>
            <Form onSubmit={(e) => handleSubmit(e)}>
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
                  Update
                </button>
                <Link to="/categories" className="primaryButton px-3 pt-2">
                  Cancel
                </Link>
              </div>
            </Form>
          </section>
        </div>
      </div>
    </>
  );
}
