import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebaseconfig"; // Sesuaikan path jika berbeda
import Header from "../Header/header";
import { Modal, Button } from "react-bootstrap";
import "./layanan.css";

const EditLayanan = () => {
  const { id } = useParams(); // Mengambil ID layanan dari URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    speaker: "",
    role: "",
    image: "",
    instagramUrl: "", // Menambahkan input instagramUrl
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Mengambil data untuk edit
  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "layanan", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
        } else {
          alert("Data tidak ditemukan!");
          navigate("/layanan"); // Kembali ke halaman layanan jika ID tidak valid
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, [id, navigate]);

  // Menghandle perubahan input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle upload gambar dengan Cloudinary
  const handleUploadImage = () => {
    if (window.cloudinary) {
      window.cloudinary.openUploadWidget(
        {
          cloudName: "dnz2pxcrd", // Ganti dengan Cloud Name Anda
          uploadPreset: "img_ekraf", // Ganti dengan Upload Preset Anda
          sources: ["local", "url", "camera"],
          folder: "img/layanan",
          multiple: false,
          maxFileSize: 5000000,
        },
        (error, result) => {
          if (error) {
            console.error("Error uploading image:", error);
          } else if (result.event === "success") {
            const uploadedImageURL = result.info.secure_url;
            setFormData((prev) => ({
              ...prev,
              image: uploadedImageURL,
            }));
            alert("Gambar berhasil diunggah!");
          }
        }
      );
    } else {
      console.error("Cloudinary widget is not available.");
    }
  };

  // Validasi form
  const validateForm = () => {
    if (
      !formData.title ||
      !formData.date ||
      !formData.time ||
      !formData.speaker ||
      !formData.role ||
      !formData.image
    ) {
      alert("Semua kolom wajib diisi, termasuk gambar.");
      return false;
    }
    return true;
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const docRef = doc(db, "layanan", id);
      await updateDoc(docRef, formData);
      setShowModal(true); // Tampilkan modal berhasil
    } catch (error) {
      console.error("Error updating document:", error);
      alert("Terjadi kesalahan saat memperbarui layanan.");
    } finally {
      setLoading(false);
    }
  };

  // Menutup modal dan navigasi
  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/layanan"); // Navigasi kembali ke halaman layanan
  };

  return (
    <>
      <Header />
      <div className="form-layanan-container">
        <h2 className="form-layanan-title">Edit Layanan</h2>
        <form onSubmit={handleSubmit} className="form-layanan">
          <div className="row">
            <div className="col-md-4">
              <label htmlFor="title" className="form-label">
                Judul Layanan
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="date" className="form-label">
                Tanggal
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="time" className="form-label">
                Waktu
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <label htmlFor="speaker" className="form-label">
                Pembicara
              </label>
              <input
                type="text"
                id="speaker"
                name="speaker"
                value={formData.speaker}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="role" className="form-label">
                Peran Pembicara
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="image" className="form-label">
                URL Gambar
              </label>
              <div className="d-flex">
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  className="form-control me-2"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Input Instagram */}
          <div className="row">
            <div className="col-md-4">
              <label htmlFor="instagramUrl" className="form-label">
                URL Instagram
              </label>
              <input
                type="text"
                id="instagramUrl"
                name="instagramUrl"
                value={formData.instagramUrl}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>

          <button
            type="button"
            className="form-layanan-button"
            onClick={handleUploadImage}
          >
            Upload Gambar
          </button>
          <button
            type="submit"
            className="form-layanan-button"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </form>
      </div>

      {/* Modal setelah berhasil edit */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Berhasil!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <i
            className="bi bi-check-circle-fill text-success"
            style={{ fontSize: "50px" }}
          ></i>
          <p className="mt-3">Layanan berhasil diperbarui!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Oke
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditLayanan;
