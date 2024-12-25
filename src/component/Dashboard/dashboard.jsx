import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./dashboard.css";
import Header from "../Header/header.jsx";
import { db, collection, getDocs } from "../../config/firebaseconfig.js";
import { Bar } from "react-chartjs-2"; // Import Bar Chart dari Chart.js

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrasi komponen Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MainContent = () => {
  const [stats, setStats] = useState({
    totalPelakuEkraf: 0,
    totalLayanan: 0,
    totalNews: 0,
  });
  const [subsectorDetails, setSubsectorDetails] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  // Daftar kategori koleksi, disamakan dengan form-produk.jsx
  const pelakuEkrafCategories = [
    "Kuliner",
    "Fashion",
    "Kriya",
    "Seni Pertunjukan",
    "Desain Komunikasi Visual",
    "Film, Animasi, Video",
    "Fotografi",
    "Musik",
    "Seni Rupa",
    "TV & Radio",
    "Periklanan",
    "Penerbitan",
    "Aplikasi & Games",
    "Arsitektur",
    "Desain Produk",
    "Desain Interior",
    "Aplikasi",
  ];

  // Fungsi untuk mengambil data statistik dari Firestore
  const fetchStats = async () => {
    try {
      let totalPelakuEkraf = 0;
      const details = [];

      for (const category of pelakuEkrafCategories) {
        const categoryRef = collection(db, category);
        const categorySnapshot = await getDocs(categoryRef);
        const categoryCount = categorySnapshot.size;

        totalPelakuEkraf += categoryCount;
        details.push({ name: category, count: categoryCount });
      }

      const layananRef = collection(db, "layanan");
      const layananSnapshot = await getDocs(layananRef);

      const newsRef = collection(db, "news");
      const newsSnapshot = await getDocs(newsRef);

      setStats({
        totalPelakuEkraf,
        totalLayanan: layananSnapshot.size,
        totalNews: newsSnapshot.size,
      });

      setSubsectorDetails(details);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const showHomepageMenu = location.pathname === "/dashboard";

  // Data untuk Bar Chart
  const chartData = {
    labels: subsectorDetails.map((subsector) => subsector.name),
    datasets: [
      {
        label: "Jumlah Pelaku Ekraf",
        data: subsectorDetails.map((subsector) => subsector.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Jumlah Pelaku Ekraf per Subsektor",
      },
    },
  };

  return (
    <div className="main-content">
      {showHomepageMenu && (
        <div className="homepage-menu">
          <h2>Dashboard Admin Ekraf</h2>
          <p>
            Kelola dan kembangkan potensi ekonomi kreatif Anda melalui berbagai
            fitur di sini.
          </p>

          {/* Ringkasan Statistik */}
          <div className="statistics-summary">
            <div className="stat-card">
              <h3>Total Pelaku Ekraf</h3>
              <p>{stats.totalPelakuEkraf} Pelaku</p>
            </div>
            <div className="stat-card">
              <h3>Total Layanan Ekraf</h3>
              <p>{stats.totalLayanan} Layanan</p>
            </div>
            <div className="stat-card">
              <h3>Total Kabar Ekraf</h3>
              <p>{stats.totalNews} Kabar Ekraf</p>
            </div>
          </div>

          {/* Grafik Statistik per Subsektor */}
          <div className="chart-container">
            <h3>Visualisasi Pelaku Ekraf</h3>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

// Main Component that integrates everything
const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="main">
        <Header />
        <MainContent />
      </div>
    </div>
  );
};

export default Dashboard;
