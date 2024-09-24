import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Filme from "./pages/Filme/Filme";
import Header from "./components/Header/Header";
import { Erro } from "./pages/Error/Error";
import { Favoritos } from "./pages/Favoritos/Favoritos";
import { Search } from "./pages/Search/Search";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filme/:id" element={<Filme />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/search/:search" element={<Search />} />
        <Route path="*" element={<Erro />} />
      </Routes>
    </BrowserRouter>
  );
}
