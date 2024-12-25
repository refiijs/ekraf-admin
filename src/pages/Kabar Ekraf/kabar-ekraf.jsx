import React from "react";
import ListKabar from "../../component/CRUD-KabarEkraf/list-kabar"; // Sesuaikan path
import Header from "../../component/Header/header";
// import Sidebar from "../../component/Sidebar/sidebar-dash";

const KabarEkraf = () => {
  return (
    <div>
      <Header />
      {/* <Sidebar /> */}
      <ListKabar />
    </div>
  );
};

export default KabarEkraf;
