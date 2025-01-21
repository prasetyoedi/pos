import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ManageProducts from "./pages/ManageProducts";
import ManageCategories from "./pages/ManageCategories";
import SalesTransaction from "./pages/SalesTransaction";
import Reports from "./pages/Reports";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="bg-blue-500 text-white p-4">
          <ul className="flex space-x-6">
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/products">Manajemen Produk</Link></li>
            <li><Link to="/categories">Manajemen Kategori</Link></li>
            <li><Link to="/sales">Transaksi Penjualan</Link></li>
            <li><Link to="/reports">Laporan Penjualan</Link></li>
          </ul>
        </nav>
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<ManageProducts />} />
            <Route path="/categories" element={<ManageCategories />} />
            <Route path="/sales" element={<SalesTransaction />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
