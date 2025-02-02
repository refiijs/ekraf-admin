import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebaseconfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap"; // Import modal from react-bootstrap

const ListProduk = ({ collectionName = "Kuliner" }) => {
  const navigate = useNavigate();
  const [produkList, setProdukList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete confirmation modal
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State for success modal
  const [produkToDelete, setProdukToDelete] = useState(null); // State to hold the product to delete

  const fetchData = async () => {
    if (!collectionName) {
      console.error("Error: collectionName tidak diberikan.");
      return;
    }

    setProdukList([]);
    setLoading(true);

    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      if (querySnapshot.empty) {
        console.warn("Tidak ada data di koleksi:", collectionName);
      }

      const dataList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProdukList(dataList);
    } catch (error) {
      console.error(
        `Error mengambil data produk dari koleksi ${collectionName}:`,
        error
      );
      alert(`Terjadi kesalahan saat mengambil data produk: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [collectionName]);

  const handleCreateClick = () => {
    navigate(`/form-produk/${collectionName}`);
  };

  const handleEdit = (produk, e) => {
    e.stopPropagation(); // Mencegah event bubbling jika ada handler lain di div
    navigate(`/edit-produk/${produk.id}`, {
      state: { ...produk, collectionName },
    });
  };

  const handleViewDetail = (produk) => {
    navigate(`/detail-produk/${collectionName}/${produk.id}`);
  };

  const handleDelete = async () => {
    if (!produkToDelete) return;

    try {
      await deleteDoc(doc(db, collectionName, produkToDelete.id));
      setProdukList(
        produkList.filter((produk) => produk.id !== produkToDelete.id)
      );
      setShowDeleteModal(false); // Close delete modal
      setShowSuccessModal(true); // Show success modal
    } catch (error) {
      console.error(`Error menghapus produk: ${error}`);
      alert(`Gagal menghapus produk: ${error.message}`);
    }
  };

  const handleShowDeleteModal = (produk, e) => {
    e.stopPropagation();
    setProdukToDelete(produk); // Set the product to delete
    setShowDeleteModal(true); // Show delete confirmation modal
  };

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    fetchData(); // Re-fetch the data after deletion
  };

  return (
    <div className="list-content">
      <div className="content-header">
        <h2>{collectionName || "Koleksi tidak ditemukan"}</h2>
        <button className="create-btn" onClick={handleCreateClick}>
          Buat
        </button>
      </div>

      <div className="item-list">
        {loading ? (
          <p>Loading data produk...</p>
        ) : produkList.length > 0 ? (
          produkList.map((produk) => (
            <div
              key={produk.id}
              className="item"
              onClick={() => handleViewDetail(produk)}
              style={{ cursor: "pointer" }}
            >
              <div className="item-image">
                {produk.imageURL1 ? (
                  <img
                    src={produk.imageURL1}
                    alt={produk.namaProduk}
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.target.src = "/path/to/placeholder-image.jpg";
                    }}
                  />
                ) : (
                  <div className="placeholder">No Image</div>
                )}
              </div>

              <div className="item-info">
                <h3>{produk.namaProduk || "Nama produk tidak tersedia"}</h3>
                <p>{produk.tagline || "Deskripsi tidak tersedia"}</p>
              </div>
              <div className="item-actions">
                <button onClick={(e) => handleEdit(produk, e)}>
                  <FaEdit className="icon" />
                </button>

                <button onClick={(e) => handleShowDeleteModal(produk, e)}>
                  <FaTrash className="icon" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-5 text-secondary">
            <i
              className="fas fa-box-open"
              style={{ fontSize: "8rem", paddingTop: "2rem" }}
            ></i>
            <p className="mt-3 fs-5" style={{ padding: "3rem" }}>
              Tidak ada data produk {collectionName} untuk ditampilkan.
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus Produk</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Apakah Anda yakin ingin menghapus produk ini?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Batal
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Produk Berhasil Dihapus</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <i
            className="bi bi-check-circle-fill text-success"
            style={{ fontSize: "50px" }}
          ></i>
          <p className="mt-3">Produk telah berhasil dihapus!</p>
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

export default ListProduk;
