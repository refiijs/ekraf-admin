import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import { db } from "../../config/firebaseconfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "./produk.css";
import Header from "../Header/header";

const EditProduk = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [selectedCollection, setSelectedCollection] = useState(
    state?.collectionName || "Kuliner"
  );
  const [formData, setFormData] = useState({
    namaProduk: "",
    rangeHarga: "",
    imageURL: "",
    whatsapp: "",
    instagram: "",
    alamat: "",
    alamatURL: "",
    deskripsi: "",
  });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.onload = () => console.log("Cloudinary widget script loaded");
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, selectedCollection, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
        } else {
          console.error("Produk tidak ditemukan.");
        }
      } catch (error) {
        console.error("Error mengambil data produk:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, selectedCollection]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUploadImage = () => {
    if (window.cloudinary) {
      window.cloudinary.openUploadWidget(
        {
          cloudName: "dnz2pxcrd", // Ganti dengan Cloud Name Anda
          uploadPreset: "img_ekraf", // Ganti dengan Upload Preset Anda
          sources: ["local", "url", "camera"],
          folder: "img/ekraf",
          multiple: false,
          maxFileSize: 5000000,
        },
        (error, result) => {
          if (error) {
            console.error("Error uploading image:", error);
          } else if (result.event === "success") {
            const uploadedImageURL = result.info.secure_url;
            setFormData((prevData) => ({
              ...prevData,
              imageURL: uploadedImageURL,
            }));
            alert("Gambar berhasil diunggah!");
          }
        }
      );
    } else {
      console.error("Cloudinary widget is not available.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.imageURL) {
      alert("Gambar belum diunggah. Silakan unggah gambar terlebih dahulu.");
      return;
    }

    try {
      const docRef = doc(db, selectedCollection, id);
      await updateDoc(docRef, formData);
      setShowModal(true);
    } catch (error) {
      console.error("Error memperbarui data produk:", error);
      alert(`Gagal memperbarui produk: ${error.message}`);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate(`/list/${selectedCollection.toLowerCase()}`);
  };

  if (loading) {
    return <p>Loading data produk...</p>;
  }

  return (
    <>
      <Header />
      <Container fluid className="form-produk-container">
        <h2 className="form-produk-title">Edit Produk</h2>
        <Form onSubmit={handleSubmit} className="form-produk mt-4">
          <Row>
            <Col md={4}>
              <Form.Group controlId="formNamaProduk">
                <Form.Label>Nama Produk</Form.Label>
                <Form.Control
                  type="text"
                  name="namaProduk"
                  value={formData.namaProduk}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formRangeHarga">
                <Form.Label>Range Harga</Form.Label>
                <Form.Control
                  type="text"
                  name="rangeHarga"
                  value={formData.rangeHarga}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formImageURL">
                <Form.Label>Image URL</Form.Label>
                <Form.Control type="text" value={formData.imageURL} readOnly />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group controlId="formWhatsapp">
                <Form.Label>Whatsapp</Form.Label>
                <Form.Control
                  type="text"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formInstagram">
                <Form.Label>Instagram</Form.Label>
                <Form.Control
                  type="text"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formAlamat">
                <Form.Label>Alamat</Form.Label>
                <Form.Control
                  type="text"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form.Group controlId="formAlamatURL">
                <Form.Label>Alamat URL (Google Maps)</Form.Label>
                <Form.Control
                  type="text"
                  name="alamatURL"
                  value={formData.alamatURL}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="formDeskripsi">
            <Form.Label>Deskripsi Produk</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Button
            variant="dark"
            onClick={handleUploadImage}
            className="mt-3 form-produk-button"
          >
            Upload Gambar
          </Button>
          <Button
            variant="dark"
            type="submit"
            className="mt-3 form-produk-button"
          >
            Simpan Perubahan
          </Button>
        </Form>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Berhasil</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <i
              className="bi bi-check-circle-fill text-success"
              style={{ fontSize: "50px" }}
            ></i>
            <p className="mt-3">Data produk berhasil diperbarui!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseModal}>
              Oke
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default EditProduk;
