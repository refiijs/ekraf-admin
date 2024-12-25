import React from "react";
import ListProduk from "../../component/Dashboard/list-produk";
// import "../produk-pages.css";
import Dashboard from "../../component/Dashboard/dashboard";
import Sidebar from "../../component/Sidebar/sidebar-ekraf";

const ListFilm = () => {
  return (
    <div className="main-content">
      <Dashboard />
      <Sidebar />
      <ListProduk collectionName="Film" />
    </div>
  );
};

export default ListFilm;
