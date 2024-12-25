import React, { useState, useEffect } from "react";
import { db } from "../../config/firebaseconfig"; // Sesuaikan dengan path konfigurasi Firebase Anda
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header/header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./kabar-ekraf.css"; // Custom CSS

const FormKabar = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    description: "",
    image: "", // URL gambar
    instagramUrl: "", // URL Instagram
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch data untuk mode edit
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const docRef = doc(db, "news", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setFormData({
              title: data.title,
              category: data.category,
              date: data.date,
              description: data.description,
              image: data.image,
              instagramUrl: data.instagramUrl || "", // Mengisi link Instagram jika ada
            });
          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error fetching data for edit: ", error);
        }
      }
    };
    fetchData();
  }, [id]);

  // Function untuk menangani upload gambar menggunakan Cloudinary
  const handleUploadImage = () => {
    if (window.cloudinary) {
      window.cloudinary.openUploadWidget(
        {
          cloudName: "dnz2pxcrd", // Ganti dengan Cloud Name Anda
          uploadPreset: "img_ekraf", // Ganti dengan Upload Preset Anda
          sources: ["local", "url", "camera"],
          folder: "img/news", // Ganti folder jika perlu
          multiple: false,
          maxFileSize: 5000000, // Maksimal ukuran file 5MB
        },
        (error, result) => {
          if (error) {
            console.error("Error uploading image:", error);
          } else if (result.event === "success") {
            const uploadedImageURL = result.info.secure_url;
            setFormData((prev) => ({
              ...prev,
              image: uploadedImageURL, // Set URL gambar setelah berhasil di-upload
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        // Update existing document
        const docRef = doc(db, "news", id);
        await updateDoc(docRef, {
          ...formData,
        });
      } else {
        // Add new document
        await addDoc(collection(db, "news"), formData);
        // Reset form after adding
        setFormData({
          title: "",
          category: "",
          date: "",
          description: "",
          image: "",
          instagramUrl: "",
        });
        alert("Kabar berhasil ditambahkan!");
      }
    } catch (error) {
      console.error("Error saving data: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="form-news-container">
        <h2 className="form-news-title">
          {id ? "Edit News" : "Tambah Kabar Baru"}
        </h2>
        <form className="form-news" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="form-control"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
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
                className="form-control"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
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
                className="form-control"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
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
                className="form-control"
                value={formData.image}
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
                className="form-control"
                value={formData.instagramUrl}
                onChange={(e) =>
                  setFormData({ ...formData, instagramUrl: e.target.value })
                }
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                id="description"
                className="form-control"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
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
            {loading ? "Saving..." : id ? "Update News" : "Tambah Kabar"}
          </button>
        </form>
      </div>
    </>
  );
};

export default FormKabar;
