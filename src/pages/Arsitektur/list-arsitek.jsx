import React from "react";
import ListProduk from "../../component/Dashboard/list-produk";
// import "../produk-pages.css";
import Dashboard from "../../component/Dashboard/dashboard";
import Sidebar from "../../component/Sidebar/sidebar-ekraf";

const ListArsitek = () => {
  return (
    <div className="main-content">
      <Dashboard />
      <Sidebar />
      <ListProduk collectionName="Arsitektur" />
    </div>
  );
};

export default ListArsitek;
