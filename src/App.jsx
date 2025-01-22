import { useState } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ManageProducts from "./pages/ManageProducts";
import ManageCategories from "./pages/ManageCategories";
import SalesTransaction from "./pages/SalesTransaction";
import Reports from "./pages/Reports";


const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <nav className="bg-blue-500 text-white p-4">
          {/* Mobile Hamburger Menu */}
          <div className="flex justify-between items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white text-2xl"
            >
              &#9776;
            </button>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-6">
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/products">Manajemen Produk</Link></li>
            <li><Link to="/categories">Manajemen Kategori</Link></li>
            <li><Link to="/sales">Transaksi Penjualan</Link></li>
            <li><Link to="/reports">Laporan Penjualan</Link></li>
          </ul>

          {/* Mobile Navigation (Hamburger Menu) */}
          {isMobileMenuOpen && (
            <ul className="md:hidden space-y-4 mt-4">
              <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link></li>
              <li><Link to="/products" onClick={() => setIsMobileMenuOpen(false)}>Manajemen Produk</Link></li>
              <li><Link to="/categories" onClick={() => setIsMobileMenuOpen(false)}>Manajemen Kategori</Link></li>
              <li><Link to="/sales" onClick={() => setIsMobileMenuOpen(false)}>Transaksi Penjualan</Link></li>
              <li><Link to="/reports" onClick={() => setIsMobileMenuOpen(false)}>Laporan Penjualan</Link></li>
            </ul>
          )}
        </nav>

        <main>
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
