import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebaseconfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import Header from "../Header/header";
import "./kabar-ekraf.css";

const ListKabar = () => {
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState(null);

  const collectionName = "News";

  const fetchData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "news"));
      const dataList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNewsList(dataList);
    } catch (error) {
      console.error("Error fetching news data:", error);
      alert("Gagal mengambil data kabar.");
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (newsId) => {
    navigate(`/detail-kabar/${newsId}`);
  };

  const handleDeleteClick = (news, e) => {
    e.stopPropagation(); // Mencegah klik pada kartu
    setNewsToDelete(news);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(db, "news", newsToDelete.id));
      setNewsList(newsList.filter((news) => news.id !== newsToDelete.id));
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error deleting news:", error);
      alert("Gagal menghapus kabar.");
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleCreateClick = () => {
    navigate(`/form-kabar/${collectionName}`);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="list-content">
        <div className="content-header">
          <h2>{collectionName}</h2>
          <button className="create-btn" onClick={handleCreateClick}>
            Buat
          </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : newsList.length > 0 ? (
          <div className="news-list">
            {newsList.map((news) => (
              <div
                key={news.id}
                className="news-item"
                onClick={() => handleCardClick(news.id)}
                style={{ cursor: "pointer" }} // Tambahkan cursor pointer
              >
                <img
                  src={news.image || "/placeholder.png"}
                  alt={news.title || "No Image"}
                  className="news-image"
                />
                <div className="news-info">
                  <h3>{news.title || "No Title"}</h3>
                  <p>{news.category || "No Category"}</p>
                </div>
                <div className="news-actions">
                  <button
                    className="edit-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // Mencegah navigasi kartu
                      navigate(`/edit-kabar/${news.id}`);
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={(e) => handleDeleteClick(news, e)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Tidak ada kabar tersedia.</p>
        )}

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Konfirmasi Hapus Berita</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Apakah Anda yakin ingin menghapus berita{" "}
              <strong>{newsToDelete?.title}</strong>?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteModal}>
              Batal
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Hapus
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Success Modal */}
        <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
          <Modal.Header closeButton>
            <Modal.Title>Berhasil</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Berita telah berhasil dihapus!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseSuccessModal}>
              Oke
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ListKabar;
