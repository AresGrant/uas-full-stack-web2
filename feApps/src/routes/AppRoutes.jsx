import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/Dashboard";
import Obat from "../pages/Obat";
import Suplier from "../pages/Suplier";
import Pelanggan from "../pages/Pelanggan";
import User from "../pages/User";
import GolonganObat from "../pages/GolonganObat";
import KelasTerapi from "../pages/KelasTerapi";
import SubKelasTerapi from "../pages/SubKelasTerapi";
import Pembelian from "../pages/pembelian";
import Penjualan from "../pages/penjualan";

function AppRoutes() {
    return (
        <BrowserRouter>

            <AdminLayout>

                <Routes>

                    <Route path="/" element={<Dashboard />} />

                    <Route path="/obat" element={<Obat />} />

                    <Route path="/suplier" element={<Suplier />} />

                    <Route path="/pelanggan" element={<Pelanggan />} />

                    <Route path="/user" element={<User />} />

                    <Route path="/golongan-obat" element={<GolonganObat />} />

                    <Route path="/kelas-terapi" element={<KelasTerapi />} />

                    <Route path="/sub-kelas-terapi" element={<SubKelasTerapi />} />

                    <Route path="/pembelian" element={<Pembelian />} />

                    <Route path="/penjualan" element={<Penjualan />} />

                </Routes>

            </AdminLayout>

        </BrowserRouter>
    );
}

export default AppRoutes;