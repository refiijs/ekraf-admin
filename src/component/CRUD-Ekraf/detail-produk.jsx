import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../config/firebaseconfig";
import { doc, getDoc } from "firebase/firestore";
import Dashboard from "../Dashboard/dashboard";
import "./detail-produk.css";

const DetailProduk = () => {
  const { id, collectionName } = useParams(); // Ambil ID dan collectionName dari URL
  const navigate = useNavigate(); // Untuk navigasi kembali
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
  }, [id, collectionName]); // Dependency array hanya id dan collectionName

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!produk) {
    return <p>Produk tidak ditemukan</p>;
  }

  return (
    <div className="produk-detail-container">
      <div className="header-container">
        <Dashboard />

        <h2>Detail Produk</h2>
        <button className="kembali-button" onClick={() => navigate(-1)}>
          Kembali
        </button>
      </div>
      <div className="produk-detail">
        <div className="produk-image">
          {produk.imageURL ? (
            <img
              src={produk.imageURL} // Gunakan URL asli dari Cloudinary
              alt={produk.namaProduk}
              onError={(e) => {
                // Fallback ke gambar placeholder jika gagal dimuat
                e.target.src = "/path/to/placeholder-image.jpg";
              }}
              className="produk-image-element"
            />
          ) : (
            <div className="placeholder">No Image</div>
          )}
        </div>
        <div className="produk-info">
          <h3>{produk.namaProduk}</h3>
          <h3>{produk.rangeHarga}</h3>

          <p>
            <strong>Deskripsi:</strong> {produk.deskripsi}
          </p>
          <p>
            <strong>Whatsapp:</strong>{" "}
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
      {/* Menampilkan embed maps di luar produk-info */}
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
  );
};

export default DetailProduk;
