import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebaseconfig.js";
import "./header.css";
import img from "./../Assets/img/logo-disparbud.png";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        console.log("Logged out successfully");
      })
      .catch((error) => {
        console.error("Logout failed", error);
      });
  };

  const handleNavigate = (path) => {
    navigate(path); // Navigasi ke path yang diinginkan
  };

  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container fluid>
        {/* Logo or Image on the left */}
        <Navbar.Brand onClick={() => handleNavigate("/")}>
          <img
            src={img} // Path gambar
            alt="Disparbud Kota Bogor"
            className="d-inline-block align-top"
            style={{ width: "50%", height: "auto" }} // Sesuaikan ukuran gambar
          />
        </Navbar.Brand>

        {/* Navbar Menu */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => handleNavigate("/dashboard")}>
              Home
            </Nav.Link>
            <Nav.Link onClick={() => handleNavigate("/list/kuliner")}>
              Pelaku Ekraf
            </Nav.Link>
            <Nav.Link onClick={() => handleNavigate("/layanan")}>
              Layanan
            </Nav.Link>
            <Nav.Link onClick={() => handleNavigate("/kabar/ekraf")}>
              Kabar Ekraf
            </Nav.Link>
            {/* <Nav.Link onClick={() => handleNavigate("/regulasi")}>
              Regulasi
            </Nav.Link> */}
          </Nav>

          {/* Button Logout */}
          <Button
            variant="outline-dark"
            className="logout-btn"
            onClick={handleLogout}
          >
            Sign Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
