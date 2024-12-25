import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/Header/header";
import LoginForm from "./component/LoginForm/login-form";
import Dashboard from "./component/Dashboard/dashboard";
import FormKuliner from "./component/CRUD-Ekraf/form-produk";
import ListProduk from "./component/Dashboard/list-produk";
import EditProduk from "./component/CRUD-Ekraf/edit-produk";
import DetailProduk from "./component/CRUD-Ekraf/detail-produk";
import ListFashion from "./pages/Fashion/list-fashion";
import ListKuliner from "./pages/Kuliner/list-kuliner";
import ListKriya from "./pages/Kriya/list-kriya";
import ListPertunjukan from "./pages/Pertunjukan/list-pertunjukan";
import ListDKV from "./pages/DKV/list-dkv";
import ListFilm from "./pages/Film/list-film";
import ListFotografi from "./pages/Fotografi/list-fotografi";
import ListMusik from "./pages/Musik/list-musik";
import ListRupa from "./pages/Seni Rupa/list-rupa";
import ListTV from "./pages/TV/list-tv";
import ListIklan from "./pages/Periklanan/list-iklan";
import ListPenerbitan from "./pages/Penerbitan/list-penerbitan";
import ListGames from "./pages/Games/list-games";
import ListArsitek from "./pages/Arsitektur/list-arsitek";
import ListDesainProduk from "./pages/Desain Produk/list-desainproduk";
import ListInterior from "./pages/Desain Interior/list-interior";
import ListAplikasi from "./pages/Aplikasi/list-aplikasi";
import FormLayanan from "./component/CRUD-Layanan/form-layanan";
import EditLayanan from "./component/CRUD-Layanan/edit-layanan";
import ListLayanan from "./pages/Layanan/layanan";
import Layanan from "./pages/Layanan/layanan";
import DetailLayanan from "./component/CRUD-Layanan/detail-layanan";
import FormKabar from "./component/CRUD-KabarEkraf/form-kabar";
import KabarEkraf from "./pages/Kabar Ekraf/kabar-ekraf";
import ListKabar from "./component/CRUD-KabarEkraf/list-kabar";
import EditKabar from "./component/CRUD-KabarEkraf/edit-kabar";
import DetailKabar from "./component/CRUD-KabarEkraf/detail-kabar";

function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman utama Login */}
        <Route path="/" element={<LoginForm />} />
        {/* Header dan Dashboard */}
        <Route path="/header" element={<Header />} />
        <Route path="/dashboard*" element={<Dashboard />} />
        {/* CRUD Produk */}
        <Route path="/form-produk/:collectionName" element={<FormKuliner />} />
        <Route path="/list-produk/:collectionName" element={<ListProduk />} />
        <Route path="/edit-produk/:id" element={<EditProduk />} />
        <Route
          path="/detail-produk/:collectionName/:id"
          element={<DetailProduk />}
        />
        {/* Halaman List Produk*/}
        <Route path="/list/kuliner/*" element={<ListKuliner />} />{" "}
        <Route path="/list/fashion/*" element={<ListFashion />} />{" "}
        <Route path="/list/kriya/*" element={<ListKriya />} />{" "}
        <Route path="/list/pertunjukan/*" element={<ListPertunjukan />} />{" "}
        <Route path="/list/dkv/*" element={<ListDKV />} />{" "}
        <Route path="/list/film/*" element={<ListFilm />} />{" "}
        <Route path="/list/fotografi/*" element={<ListFotografi />} />{" "}
        <Route path="/list/musik/*" element={<ListMusik />} />{" "}
        <Route path="/list/rupa/*" element={<ListRupa />} />{" "}
        <Route path="/list/tv/*" element={<ListTV />} />{" "}
        <Route path="/list/iklan/*" element={<ListIklan />} />{" "}
        <Route path="/list/penerbitan/*" element={<ListPenerbitan />} />{" "}
        <Route path="/list/games/*" element={<ListGames />} />{" "}
        <Route path="/list/arsitek/*" element={<ListArsitek />} />{" "}
        <Route path="/list/desainproduk/*" element={<ListDesainProduk />} />{" "}
        <Route path="/list/interior/*" element={<ListInterior />} />{" "}
        <Route path="/list/aplikasi/*" element={<ListAplikasi />} />{" "}
        {/* CRUD Layanan */}
        <Route path="/form-layanan/:collectionName" element={<FormLayanan />} />
        <Route path="/list-layanan/:collectionName" element={<ListLayanan />} />
        <Route path="/edit-layanan/:id" element={<EditLayanan />} />
        <Route path="/layanan/*" element={<Layanan />} />{" "}
        <Route path="/detail-layanan/:id" element={<DetailLayanan />} />
        {/* CRUD KabarEkraf */}
        <Route path="/form-kabar/:collectionName" element={<FormKabar />} />
        <Route path="/list-kabar/:collectionName" element={<ListKabar />} />
        <Route path="/edit-kabar/:id" element={<EditKabar />} />
        <Route path="/kabar/ekraf*" element={<KabarEkraf />} />{" "}
        <Route path="/detail-kabar/:id" element={<DetailKabar />} />
      </Routes>
    </Router>
  );
}

export default App;
