import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Menyimpan menu yang aktif
  const [activeMenu, setActiveMenu] = useState(location.pathname);

  const handleMenuClick = (path) => {
    navigate(path); // Navigasi ke halaman sesuai menu yang diklik
    setActiveMenu(path); // Set aktif menu yang dipilih
  };

  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        {/* <li
          onClick={() => handleMenuClick("/list/kuliner")}
          className={`menu-item ${
            activeMenu === "/list/kuliner" ? "active" : ""
          }`}
        >
          <i className="bi bi-basket2-fill"></i>
        </li> */}
        <li
          onClick={() => handleMenuClick("/layanan")}
          className={`menu-item ${activeMenu === "/layanan" ? "active" : ""}`}
        >
          <i className="bi bi-gear-fill"></i>
        </li>
        {/* <li
          onClick={() => handleMenuClick("/regulations")}
          className={`menu-item ${
            activeMenu === "/regulations" ? "active" : ""
          }`}
        >
          <i className="bi bi-file-earmark-text-fill"></i>
        </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
