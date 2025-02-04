import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { db } from "../../config/firebaseconfig";
import { collection, addDoc } from "firebase/firestore";
import Header from "../Header/header";
import "./produk.css";

const FormProduk = () => {
  const [selectedCollection, setSelectedCollection] = useState("Kuliner");
  const [namaProduk, setNamaProduk] = useState("");
  const [rangeHarga, setRangeHarga] = useState("");
  const [imageURL1, setImageURL1] = useState(""); // URL gambar dari Cloudinary
  const [imageURL2, setImageURL2] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [alamat, setAlamat] = useState("");
  const [alamatURL, setAlamatURL] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tagline, setTagline] = useState("");
  const [history, setHistory] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.onload = () => {
      console.log("Cloudinary widget script loaded");
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleUploadImage = (type) => {
    if (window.cloudinary) {
      window.cloudinary.openUploadWidget(
        {
          cloudName: "dnz2pxcrd",
          uploadPreset: "img_ekraf",
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
            if (type === "small") {
              setImageURL1(uploadedImageURL);
            } else {
              setImageURL2(uploadedImageURL);
            }
            console.log("Uploaded image URL:", uploadedImageURL);
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
    // Validasi apakah gambar telah diunggah
    if (!imageURL1) {
      alert("Gambar belum diunggah. Silakan unggah gambar terlebih dahulu.");
      return;
    }
    const newProduct = {
      namaProduk,
      rangeHarga,
      imageURL1, // URL gambar yang diunggah
      imageURL2,
      whatsapp,
      instagram,
      alamat,
      alamatURL,
      deskripsi,
      tagline,
      history,
    };

    try {
      await addDoc(collection(db, selectedCollection), newProduct);
      console.log(
        `Data produk berhasil disimpan ke koleksi ${selectedCollection}!`
      );
      setShowModal(true);

      // Reset form setelah data berhasil disimpan
      setNamaProduk("");
      setRangeHarga("");
      setImageURL1(""); // Reset URL gambar
      setImageURL2(""); // Reset URL gambar
      setWhatsapp("");
      setInstagram("");
      setAlamat("");
      setAlamatURL("");
      setDeskripsi("");
      setTagline("");
      setHistory("");
    } catch (error) {
      console.error(
        `Error menambahkan data ke koleksi ${selectedCollection}:`,
        error
      );
    }
  };

  return (
    <>
      <Header />

      <Container fluid className="form-produk-container">
        <h2 className="form-produk-title">Form Produk</h2>
        <Form onSubmit={handleSubmit} className="form-produk mt-4">
          <Form.Group controlId="formCollection">
            <Form.Label>Pilih Koleksi</Form.Label>
            <Form.Control
              as="select"
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
              required
            >
              <option value="Kuliner">Kuliner</option>
              <option value="Fashion">Fashion</option>
              <option value="Kriya">Kriya</option>
              <option value="Seni Pertunjukan">Seni Pertunjukan</option>
              <option value="Desain Komunikasi Visual">
                Desain Komunikasi Visual
              </option>
              <option value="Film, Animasi, Video">Film, Animasi, Video</option>
              <option value="Fotografi">Fotografi</option>
              <option value="Musik">Musik</option>
              <option value="Seni Rupa">Seni Rupa</option>
              <option value="TV & Radio">TV & Radio</option>
              <option value="Periklanan">Periklanan</option>
              <option value="Penerbitan">Penerbitan</option>
              <option value="Aplikasi & Games">Aplikasi & Games</option>
              <option value="Arsitektur">Arsitektur</option>
              <option value="Desain Produk">Desain Produk</option>
              <option value="Desain Interior">Desain Interior</option>
              <option value="Aplikasi">Aplikasi</option>
            </Form.Control>
          </Form.Group>
          <Row>
            <Col md={4}>
              <Form.Group controlId="formNamaProduk">
                <Form.Label>Nama Produk</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan Nama Produk"
                  value={namaProduk}
                  onChange={(e) => setNamaProduk(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formRangeHarga">
                <Form.Label>Range Harga</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan Range Harga"
                  value={rangeHarga}
                  onChange={(e) => setRangeHarga(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group controlId="formWhatsapp">
                <Form.Label>Whatsapp</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan Nomor Whatsapp"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formInstagram">
                <Form.Label>Instagram</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan Username Instagram"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group controlId="formAlamat">
                <Form.Label>Alamat</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan Alamat"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formAlamatURL">
                <Form.Label>Alamat URL (Google Maps)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan URL Google Maps"
                  value={alamatURL}
                  onChange={(e) => setAlamatURL(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="formTagline">
            <Form.Label>Tagline Produk</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Masukkan Tagline Produk"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formHistory">
            <Form.Label>History Produk</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Masukkan History Produk"
              value={history}
              onChange={(e) => setHistory(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formDeskripsi">
            <Form.Label> Deskripsi Produk</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Masukkan Deskripsi Produk"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              required
            />
          </Form.Group>

          <div className="form-group">
            <Form.Control
              type="text"
              value={imageURL1}
              readOnly
              placeholder="URL Gambar Kecil akan otomatis diisi"
            />
            <Button variant="dark" onClick={() => handleUploadImage("small")}>
              Upload Gambar
            </Button>
          </div>

          <div className="form-group">
            <Form.Control
              type="text"
              value={imageURL2}
              readOnly
              placeholder="URL Gambar Besar akan otomatis diisi"
            />
            <Button variant="dark" onClick={() => handleUploadImage("large")}>
              Upload Gambar
            </Button>
          </div>

          <Button
            variant="dark"
            type="submit"
            className="mt-3 form-produk-button"
          >
            Tambah Produk
          </Button>

          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Berhasil</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              <i
                className="bi bi-check-circle-fill text-success"
                style={{ fontSize: "50px" }}
              ></i>
              <p className="mt-3">Data produk berhasil disimpan!</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => setShowModal(false)}>
                Oke
              </Button>
            </Modal.Footer>
          </Modal>
        </Form>
      </Container>
    </>
  );
};

export default FormProduk;
