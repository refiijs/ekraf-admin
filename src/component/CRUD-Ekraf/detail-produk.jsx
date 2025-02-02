import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../config/firebaseconfig";
import { doc, getDoc } from "firebase/firestore";

import { Row, Col } from "react-bootstrap";
import Dashboard from "../Dashboard/dashboard";
import "./detail-produk.css";

const DetailProduk = () => {
  const { id, collectionName } = useParams();
  const navigate = useNavigate();
  const [produk, setProduk] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduk = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, collectionName, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduk(docSnap.data());
        } else {
          console.error("Produk tidak ditemukan");
        }
      } catch (error) {
        console.error("Error mengambil produk:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduk();
  }, [id, collectionName]);

  if (loading) return <p>Loading...</p>;
  if (!produk) return <p>Produk tidak ditemukan</p>;

  return (
    <div className="detail-produk-page">
      {/* Header dengan tombol kembali */}
      <header className="header-container">
        <Dashboard />
        <h2>Detail Produk</h2>
        <button className="kembali-button" onClick={() => navigate(-1)}>
          Kembali
        </button>
      </header>

      {/* Kontainer utama produk */}
      <div className="produk-detail-container">
        <div className="produk-detail">
          {/* Gambar Produk */}
          <div className="produk-image">
            {produk.imageURL ? (
              <img
                src={produk.imageURL}
                alt={produk.namaProduk}
                className="produk-image-element"
              />
            ) : (
              <div className="placeholder">No Image</div>
            )}
          </div>

          {/* Informasi Produk */}
          <div className="produk-info">
            <h3>{produk.namaProduk}</h3>
            <h3>{produk.rangeHarga}</h3>
            <p>
              <strong>Tagline:</strong> {produk.tagline}
            </p>
            <p>
              <strong>Whatsapp:</strong>
              <a
                href={`https://wa.me/${produk.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {produk.whatsapp}
              </a>
            </p>
            <p>
              <strong>Instagram:</strong>
              <a
                href={`https://instagram.com/${produk.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                @{produk.instagram}
              </a>
            </p>
            <p>
              <strong>Alamat:</strong> {produk.alamat}
            </p>
          </div>
        </div>

        {/* Deskripsi dan History Produk */}

        <Row className="mt-4">
          <Col md={2}>
            <h4 className="fw-bold">History</h4>
          </Col>
          <Col md={9}>
            <p>{produk.history}</p>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <h4 className="fw-bold">Deskripsi</h4>
          </Col>
          <Col md={9}>
            <p>{produk.deskripsi}</p>
          </Col>
        </Row>

        {/* Google Maps */}
        {produk.alamatURL && (
          <div className="maps-container">
            <iframe
              src={produk.alamatURL}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi pada Peta"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailProduk;
