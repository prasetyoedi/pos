import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

const ProductManagement = () => {
    // State untuk produk
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [sku, setSku] = useState('');
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const [stock, setStock] = useState(0);
    const [buyPrice, setBuyPrice] = useState(0);
    const [sellPrice, setSellPrice] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    const [showModal, setShowModal] = useState(false); // Untuk kontrol modal
    const [editProductId, setEditProductId] = useState(null); // Untuk menyimpan id produk yang akan diedit

    // Fetch produk dari Supabase
    const fetchProducts = async () => {
        const { data, error } = await supabase.from('products').select('*');
        if (error) {
            console.error(error);
        } else {
            setProducts(data);
        }
    };

    // Menambahkan produk
    const addProduct = async () => {
        const { data, error } = await supabase.from('products').insert([
            {
                name,
                sku,
                size,
                color,
                stock,
                buy_price: buyPrice,
                sell_price: sellPrice,
                image_url: imageUrl,
            },
        ]);
        if (error) {
            console.error(error);
        } else {
            fetchProducts();
            clearForm();
            setShowModal(false); // Menutup modal setelah produk ditambahkan
        }
    };

    // Mengubah produk
    const updateProduct = async () => {
        const { data, error } = await supabase
            .from('products')
            .update([
                {
                    name,
                    sku,
                    size,
                    color,
                    stock,
                    buy_price: buyPrice,
                    sell_price: sellPrice,
                    image_url: imageUrl,
                },
            ])
            .eq('id', editProductId);

        if (error) {
            console.error(error);
        } else {
            fetchProducts();
            clearForm();
            setShowModal(false); // Menutup modal setelah produk diperbarui
        }
    };

    // Menghapus produk
    const deleteProduct = async (id) => {
        const { data, error } = await supabase.from('products').delete().eq('id', id);
        if (error) {
            console.error(error);
        } else {
            fetchProducts();
        }
    };

    // Clear form setelah tambah atau update produk
    const clearForm = () => {
        setName('');
        setSku('');
        setSize('');
        setColor('');
        setStock(0);
        setBuyPrice(0);
        setSellPrice(0);
        setImageUrl('');
    };

    // Menangani saat mengedit produk
    const handleEditProduct = (product) => {
        setName(product.name);
        setSku(product.sku);
        setSize(product.size);
        setColor(product.color);
        setStock(product.stock);
        setBuyPrice(product.buy_price);
        setSellPrice(product.sell_price);
        setImageUrl(product.image_url);
        setEditProductId(product.id); // Simpan id produk yang sedang diedit
        setShowModal(true); // Tampilkan modal
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="w-full mx-auto md:p-6 lg:p-8">
            <h1 className="text-center text-2xl font-bold">Daftar Produk</h1>
            {/* Tombol untuk menambah produk */}
            <button
                onClick={() => {
                    clearForm();
                    setShowModal(true);
                    setEditProductId(null); // Reset id jika menambah produk baru
                }}
                className="mb-4 bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
                Tambah Produk
            </button>

            {/* Daftar produk */}
            <div className="mb-6">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full mt-4 bg-white shadow-lg rounded-lg overflow-hidden">
                        <thead className="bg-indigo-600 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left">Nama</th>
                                <th className="px-6 py-3 text-left">SKU</th>
                                <th className="px-6 py-3 text-left">Harga</th>
                                <th className="px-6 py-3 text-left">Stok</th>
                                <th className="px-6 py-3 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="px-6 py-4">{product.name}</td>
                                    <td className="px-6 py-4">{product.sku}</td>
                                    <td className="px-6 py-4">{product.sell_price}</td>
                                    <td className="px-6 py-4">{product.stock}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center space-x-4">
                                            <button
                                                onClick={() => handleEditProduct(product)}
                                                className="text-indigo-600 hover:text-indigo-800"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteProduct(product.id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal untuk tambah atau edit produk */}
            {showModal && (
                <>
                    <div
                        className="fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center z-50 overflow-y-auto"
                        onClick={() => setShowModal(false)}
                    >
                        <div
                            className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full mx-4 my-8 sm:mt-24 md:mt-80"
                            onClick={(e) => e.stopPropagation()} // Stop event propagation
                        >
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">
                                {editProductId ? 'Edit Produk' : 'Tambah Produk'}
                            </h3>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (editProductId) {
                                        updateProduct();
                                    } else {
                                        addProduct();
                                    }
                                }}
                            >
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Nama Produk</label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">SKU</label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={sku}
                                            onChange={(e) => setSku(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Ukuran</label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={size}
                                            onChange={(e) => setSize(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Warna</label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={color}
                                            onChange={(e) => setColor(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Stok</label>
                                        <input
                                            type="number"
                                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={stock}
                                            onChange={(e) => setStock(Number(e.target.value))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Harga Beli</label>
                                        <input
                                            type="number"
                                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={buyPrice}
                                            onChange={(e) => setBuyPrice(Number(e.target.value))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Harga Jual</label>
                                        <input
                                            type="number"
                                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={sellPrice}
                                            onChange={(e) => setSellPrice(Number(e.target.value))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">URL Gambar</label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={imageUrl}
                                            onChange={(e) => setImageUrl(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-between">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="bg-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-400"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
                                    >
                                        {editProductId ? 'Perbarui Produk' : 'Tambah Produk'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>

    );

};

export default ProductManagement;
