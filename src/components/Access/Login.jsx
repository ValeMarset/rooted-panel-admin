import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/adminReducer";
import styles from "../Access/Login.module.css";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import toast from "react-hot-toast";

export default function Login() {
  const admin = useSelector((state) => state.user);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_BACK_URL}/admin-token`,
        data: {
          email: inputEmail,
          password: inputPassword,
        },
      });

      dispatch(login(response.data));
      toast.success(`Welcome ${response.data.admin.firstname}!!!`);
      navigate("/");
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <>
      <section className="d-flex justify-content-center">
        <div className={` ${styles.contenedorLogin}  `}>
          <div className={`border-0 shadow rounded ${styles.sizelogin}`}>
            <div className="d-flex justify-content-center mb-3">
              <h1>Login</h1>
            </div>
            <Form onSubmit={handleSubmit} action="" className="">
              <Form.Group className="mb-3">
                <Form.Label htmlFor="" className="form-label"></Form.Label>
                <Form.Control
                  required
                  type="text"
                  className="rounded-0 py-2"
                  id="emailLogin"
                  name="email"
                  placeholder="Email"
                  value={inputEmail}
                  onChange={(event) => setInputEmail(event.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="" className="form-label"></Form.Label>
                <Form.Control
                  required
                  type="password"
                  className="rounded-0 py-2"
                  id="passwordLogin"
                  name="password"
                  placeholder="Password"
                  value={inputPassword}
                  onChange={(event) => setInputPassword(event.target.value)}
                />
              </Form.Group>
              <div className={`d-grid  mt-4${styles.Login}`}>
                <button className="secondaryButton" type="submit">
                  Login
                </button>
              </div>
              <div className="mt-4">
                <h6 className="fw-semibold">Mok Data</h6>
                <p>
                  To simplify access to the application, the following test
                  users are provided:
                </p>
                <span className="fw-semibold">Sign in as admin:</span>
                <div className="mt-2">
                  <span className="me-3 fw-semibold">Email:</span>
                  <span>ronaldlens@gmail.com</span>
                </div>
                <div className="mt-2">
                  <span className="me-3 fw-semibold">Password:</span>
                  <span>1234</span>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
}
