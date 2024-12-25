import React, { useState } from "react";
import "./login-form.css";
import { Form, Button, Container } from "react-bootstrap";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { auth } from "../../config/firebaseconfig.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import img from "../Assets/img/ekraf.png";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validasi format email
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi format email
    if (!isValidEmail(email)) {
      setError("Format email tidak valid. Masukkan alamat email yang valid.");
      return;
    }

    try {
      // Melakukan autentikasi menggunakan Firebase
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      // Menangani password yang salah
      if (error.code === "auth/wrong-password") {
        setError("Kata sandi yang Anda masukkan salah.");
      } else {
        setError(
          "Terjadi kesalahan.Silakan periksa email atau kata sandi Anda. "
        );
      }
      console.error("Error logging in:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container className="login-container">
      <div className="wrapper">
        <div className="left-section">
          <img src={img} alt="Logo" className="img-fluid" />
        </div>
        <div className="right-section">
          <h1 className="text-center">Login Admin</h1>
          {error && <p className="text-danger text-center">{error}</p>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <div className="input-group">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <FaUser />
                  </span>
                </div>
              </div>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="input-group-append">
                  <span
                    className="input-group-text"
                    onClick={togglePasswordVisibility}
                    style={{ cursor: "pointer" }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="button-primary w-100"
            >
              Login
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default LoginForm;
