import React, { useState, useEffect } from "react";
import { db } from "../../config/firebaseconfig"; // Sesuaikan dengan path konfigurasi Firebase Anda
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import Header from "../Header/header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./kabar-ekraf.css"; // Custom CSS

const DetailKabar = () => {
  const { id } = useParams(); // Mengambil ID dari URL
  const [kabarData, setKabarData] = useState(null); // State untuk menyimpan data kabar
  const [loading, setLoading] = useState(true);

  // Fetch data untuk menampilkan detail kabar
  useEffect(() => {
    const fetchKabar = async () => {
      try {
        const docRef = doc(db, "news", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setKabarData(docSnap.data()); // Menyimpan data kabar
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching kabar data: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchKabar();
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!kabarData) {
    return <p>Kabar tidak ditemukan.</p>;
  }

  return (
    <>
      <Header />
      <div className="detail-kabar-container">
        <h2 className="detail-kabar-title">{kabarData.title}</h2>
        <p className="detail-kabar-category">{kabarData.category}</p>
        <p className="detail-kabar-date">{kabarData.date}</p>
        <img
          src={kabarData.image || "/placeholder.png"}
          alt={kabarData.title || "No Image"}
          className="detail-kabar-image"
        />
        <p className="detail-kabar-description">{kabarData.description}</p>
        {kabarData.instagramUrl && (
          <a
            href={kabarData.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="detail-kabar-instagram"
          >
            Instagram Link
          </a>
        )}
      </div>
    </>
  );
};

export default DetailKabar;
