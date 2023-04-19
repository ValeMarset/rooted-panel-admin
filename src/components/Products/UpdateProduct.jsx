import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import NavbarPanel from "../home/NavbarPanel";

export default function UpdateProduct() {
  const admin = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");
  const [upkeep, setUpkeep] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState();
  const [img, setImg] = useState();
  const [stock, setStock] = useState();
  const [categories, setCategories] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/products/${id}`
      );
      const { data } = response;

      setName(data.name);
      setDescription(data.description);
      setSummary(data.summary);
      setUpkeep(data.upkeep);
      setCategoryId(data.categoryId);
      setPrice(data.price);
      setStock(data.stock);
      setImg(data.img);
    };
    getProduct();
  }, []);

  const updateProduct = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("summary", summary);
    formData.append("upkeep", upkeep);
    formData.append("categoryId", categoryId);
    formData.append("price", price);
    formData.append("img", img);
    formData.append("stock", stock);

    try {
      await axios({
        headers: {
          Authorization: `Bearer ${admin.token}`,
          "Content-Type": "multipart/form-data",
        },
        url: `${process.env.REACT_APP_BACK_URL}/products/${id}`,
        method: "patch",
        data: formData,
      });

      toast.success("Product modifyed successfully!");
      navigate("/products");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios({
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
        method: "get",
        url: `${process.env.REACT_APP_BACK_URL}/categories`,
      });
      setCategories(response.data);
    };
    getCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (upkeep !== "" && categoryId !== "" && img !== undefined) {
      updateProduct();
    } else {
      toast.error("Missing fields");
    }
  };

  return (
    categories && (
      <>
        {/* <Link to="/products">
            <button className="secondaryButton rounded-0">
              Back to Products
            </button>
          </Link> */}
        <NavbarPanel />

        <div className="row justify-content-center g-0">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <section className="container shadow p-5 mt-5">
              <h2 className="pt-3 mb-5 titleDashboard">Update Product</h2>

              <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="nameProduct"
                    id="nameProduct"
                    type="name"
                    placeholder="Name of Product"
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
                  <Form.Label>Summary</Form.Label>
                  <textarea
                    name="summary"
                    id="summary"
                    cols="30"
                    rows="3"
                    className="form-control rounded-0"
                    required
                    onChange={(e) => setSummary(e.target.value)}
                    value={summary}
                  ></textarea>
                </Form.Group>
                <div className="d-flex ">
                  <Form.Group className="mb-3 me-5 w-100">
                    <Form.Label>Upkeep</Form.Label>
                    <Form.Select
                      aria-label="Select Upkeep"
                      value={upkeep}
                      name="upkeep"
                      id="upkeep"
                      onChange={(e) => setUpkeep(e.target.value)}
                      className="rounded-0"
                    >
                      <option>Select Upkeep</option>
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className=" w-100">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      aria-label="Select Category"
                      value={categoryId}
                      name="categoryId"
                      id="categoryId"
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="rounded-0"
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>

                <div className="d-flex mb-2">
                  <Form.Group className=" me-5">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Price"
                      required
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                      className="rounded-0"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Stock"
                      className="mb-4 rounded-0"
                      required
                      onChange={(e) => setStock(e.target.value)}
                      value={stock}
                    />
                  </Form.Group>
                </div>

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
                  <Link to="/products" className="primaryButton px-3 pt-2">
                    Cancel
                  </Link>
                </div>
              </Form>
            </section>
          </div>
        </div>
      </>
    )
  );
}
