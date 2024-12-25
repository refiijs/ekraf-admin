import React from "react";
import ListLayanan from "../../component/CRUD-Layanan/list-layanan"; // Sesuaikan path
import Header from "../../component/Header/header";
// import Sidebar from "../../component/Sidebar/sidebar-dash";

const Layanan = () => {
  return (
    <div>
      <Header />
      {/* <Sidebar /> */}
      <ListLayanan />
    </div>
  );
};

export default Layanan;
