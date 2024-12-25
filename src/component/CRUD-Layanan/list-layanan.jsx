import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebaseconfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap"; // Mengimpor Modal dan Button
import "./layanan.css";

const ListLayanan = () => {
  const navigate = useNavigate();
  const [layananList, setLayananList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [layananToDelete, setLayananToDelete] = useState(null); // Layanan yang akan dihapus
  const collectionName = "Daftar Layanan";

  const fetchData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "layanan"));
      const dataList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLayananList(dataList);
    } catch (error) {
      console.error("Error fetching layanan data:", error);
      alert("Gagal mengambil data layanan.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (layanan) => {
    setLayananToDelete(layanan); // Set layanan yang akan dihapus
    setShowDeleteModal(true); // Tampilkan modal konfirmasi
  };

  const confirmDelete = async () => {
    if (layananToDelete) {
      try {
        const docRef = doc(db, "layanan", layananToDelete.id);
        await deleteDoc(docRef); // Hapus dokumen dari Firestore
        setShowDeleteModal(false); // Tutup modal
        setShowSuccessModal(true); // Tampilkan modal sukses
        fetchData(); // Refresh daftar layanan setelah penghapusan
      } catch (error) {
        console.error("Error deleting service:", error);
        alert("Gagal menghapus layanan.");
      }
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false); // Tutup modal konfirmasi hapus
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false); // Tutup modal sukses
  };

  const handleCreateClick = () => {
    navigate(`/form-layanan/${collectionName}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="list-content">
      <div className="content-header">
        <h2>{collectionName}</h2>
        <button className="create-btn" onClick={handleCreateClick}>
          Buat
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : layananList.length > 0 ? (
        <div className="layanan-list">
          {layananList.map((layanan) => (
            <div
              key={layanan.id}
              className="layanan-item"
              onClick={() => navigate(`/detail-layanan/${layanan.id}`)} // Tambahkan handler onClick
              style={{ cursor: "pointer" }} // Tambahkan pointer cursor agar lebih interaktif
            >
              <img
                src={layanan.image || "/placeholder.png"}
                alt={layanan.title || "No Image"}
                className="layanan-image"
              />
              <div className="layanan-info">
                <h3>{layanan.title || "No Title"}</h3>
                <p>{layanan.speaker || "No Speaker"}</p>
              </div>
              <div
                className="layanan-actions"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Tindakan individual tetap ada dan tidak ikut ter-trigger */}
                <button
                  className="edit-btn"
                  onClick={() => navigate(`/edit-layanan/${layanan.id}`)}
                >
                  <FaEdit />
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(layanan)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Tidak ada layanan tersedia.</p>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus Layanan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Apakah Anda yakin ingin menghapus layanan{" "}
            <strong>{layananToDelete?.title}</strong>?
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
          <p>Layanan telah berhasil dihapus!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSuccessModal}>
            Oke
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListLayanan;
