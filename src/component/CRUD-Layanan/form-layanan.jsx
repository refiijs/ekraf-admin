import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebaseconfig"; // Sesuaikan path jika berbeda
import Header from "../Header/header";
import "./layanan.css";

const FormLayanan = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    speaker: "",
    role: "",
    image: "",
    instagramUrl: "", // Tambahkan URL Instagram di sini
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.onload = () => console.log("Cloudinary widget script loaded");
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

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
          cloudName: "dnz2pxcrd",
          uploadPreset: "img_ekraf",
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
      !formData.date ||
      !formData.time ||
      !formData.speaker ||
      !formData.role ||
      !formData.image ||
      !formData.instagramUrl // Validasi tambahan untuk URL Instagram
    ) {
      alert("Semua kolom wajib diisi, termasuk gambar dan URL Instagram.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      await addDoc(collection(db, "layanan"), formData);
      alert("Layanan berhasil ditambahkan!");
      setFormData({
        title: "",
        date: "",
        time: "",
        speaker: "",
        role: "",
        image: "",
        instagramUrl: "", // Reset URL Instagram
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Terjadi kesalahan saat menambahkan layanan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="form-layanan-container">
        <h2 className="form-layanan-title">Tambah Layanan Baru</h2>
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
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                readOnly
                className="form-control"
              />
            </div>
          </div>
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
                required
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
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      </div>
    </>
  );
};

export default FormLayanan;
