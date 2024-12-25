import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebaseconfig"; // Sesuaikan path jika berbeda
import Header from "../Header/header";
import { Modal, Button } from "react-bootstrap";
import "./kabar-ekraf.css";

const EditKabar = () => {
  const { id } = useParams(); // Mengambil ID kabar dari URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    description: "",
    image: "",
    instagramUrl: "", // Menambahkan input instagramUrl
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "news", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
        } else {
          alert("Data tidak ditemukan!");
          navigate("/kabar"); // Kembali ke halaman kabar jika ID tidak valid
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
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
          folder: "img/news",
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
            console.log("Uploaded image URL:", uploadedImageURL);
            alert("Gambar berhasil diunggah!");
          }
        }
      );
    } else {
      console.error("Cloudinary widget is not available.");
    }
  };

  const validateForm = () => {
    if (
      !formData.title ||
      !formData.category ||
      !formData.date ||
      !formData.description ||
      !formData.image
    ) {
      alert("Semua kolom wajib diisi, termasuk gambar.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const docRef = doc(db, "news", id);
      await updateDoc(docRef, formData);
      setShowModal(true); // Tampilkan modal jika berhasil
    } catch (error) {
      console.error("Error updating document:", error);
      alert("Terjadi kesalahan saat memperbarui kabar.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/list-kabar/news"); // Navigasi kembali setelah modal ditutup
  };

  return (
    <>
      <Header />
      <div className="form-news-container">
        <h2 className="form-news-title">Edit Kabar</h2>
        <form onSubmit={handleSubmit} className="form-news">
          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="title" className="form-label">
                Title
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
            <div className="col-md-4 mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="date" className="form-label">
                Date
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
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="image" className="form-label">
                Image URL
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                className="form-control"
                readOnly
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="instagramUrl" className="form-label">
                Instagram URL
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
            <div className="col-md-4 mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                className="form-control"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button
            type="button"
            className="form-news-button mt-2"
            onClick={handleUploadImage}
          >
            Upload Image
          </button>
          <button type="submit" className="form-news-button" disabled={loading}>
            {loading ? "Saving..." : "Simpan Perubahan"}
          </button>
        </form>

        {/* Modal for Success */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Berhasil!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <i
              className="bi bi-check-circle-fill text-success"
              style={{ fontSize: "50px" }}
            ></i>
            <p className="mt-3">Kabar Ekraf berhasil diperbarui!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseModal}>
              Oke
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default EditKabar;
