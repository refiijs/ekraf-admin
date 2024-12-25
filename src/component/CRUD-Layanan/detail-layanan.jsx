import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebaseconfig"; // Sesuaikan path jika berbeda
import Header from "../Header/header";
import "./layanan.css";

const DetailLayanan = () => {
  const { id } = useParams(); // Mendapatkan ID layanan dari parameter URL
  const [layanan, setLayanan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLayanan = async () => {
      try {
        const layananDoc = await getDoc(doc(db, "layanan", id));
        if (layananDoc.exists()) {
          setLayanan(layananDoc.data());
        } else {
          console.error("Dokumen layanan tidak ditemukan!");
        }
      } catch (error) {
        console.error("Error fetching layanan: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLayanan();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!layanan) {
    return <p>Layanan tidak ditemukan.</p>;
  }

  return (
    <>
      <Header />
      <div className="detail-layanan-container">
        <h2 className="detail-layanan-title">{layanan.title}</h2>
        <div className="detail-layanan-content">
          <img
            src={layanan.image}
            alt={layanan.title}
            className="detail-layanan-image"
          />
          <div className="detail-layanan-info">
            <p>
              <strong>Tanggal:</strong> {layanan.date}
            </p>
            <p>
              <strong>Waktu:</strong> {layanan.time}
            </p>
            <p>
              <strong>Pembicara:</strong> {layanan.speaker}
            </p>
            <p>
              <strong>Peran:</strong> {layanan.role}
            </p>
            <p>
              <a
                href={layanan.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="instagram-button"
              >
                Instagram Link
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailLayanan;
