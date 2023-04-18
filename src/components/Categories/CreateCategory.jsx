import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
      <div
        className="d-flex justify-content-end mt-5  "
        style={{ width: "32rem" }}
      >
        <Link to="/categories">
          <button className="secondaryButton rounded-0">
            Back to Categories
          </button>
        </Link>
      </div>
      <section className="d-flex justify-content-center align-items-center mt-4 ">
        <Card style={{ width: "30rem" }} className="p-3 rounded-0">
          <Card.Body>
            <h2>Create Category</h2>
            <Card.Text>
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

                <div className=" mt-3 d-grid gap-2">
                  <Button className="secondaryButton rounded-0" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
      </section>
    </>
  );
}
