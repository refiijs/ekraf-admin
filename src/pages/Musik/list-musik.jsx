import React from "react";
import ListProduk from "../../component/Dashboard/list-produk";
import Dashboard from "../../component/Dashboard/dashboard";
import Sidebar from "../../component/Sidebar/sidebar-ekraf";

const ListMusik = () => {
  return (
    <div className="main-content">
      <Dashboard />
      <Sidebar />
      <ListProduk collectionName="Musik" />
    </div>
  );
};

export default ListMusik;
