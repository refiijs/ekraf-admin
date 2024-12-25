import React from "react";
import ListProduk from "../../component/Dashboard/list-produk";
import Dashboard from "../../component/Dashboard/dashboard";
import Sidebar from "../../component/Sidebar/sidebar-ekraf";

const ListKuliner = () => {
  return (
    <div className="main-content">
      <Dashboard />
      <Sidebar />
      <ListProduk collectionName="Kuliner" />
    </div>
  );
};

export default ListKuliner;
