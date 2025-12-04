import { useState } from "react";
import axios from "axios";

export default function CreateMakanan() {
  const [formData, setFormData] = useState({
    deskripsi: "",
    asalDaerah: "",
    menuId: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.deskripsi || !formData.asalDaerah|| !formData.menuId) {
      setError("Semua field wajib diisi!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/makanan",
        formData
      );

      console.log("Makanan created:", response.data);
      alert("Makanan berhasil ditambahkan!");

      setFormData({
        deskripsi: "",
        asalDaerah: "",

      });
    } catch (err) {
      console.error("Error creating menu:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Terjadi kesalahan saat menyimpan menu"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Tambah Makanan</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Deskripsi Menu </label>
          <input
            type="text"
            className="form-control"
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            placeholder="Contoh: Nasi Goreng Spesial Mantap dan banyak toping melimpah"
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Asal Daerah</label>
          <input
            type="text"
            className="form-control"
            name="asalDaerah"
            value={formData.asalDaerah}
            onChange={handleChange}
            placeholder="Contoh: Malang"
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Menu ID</label>
          <input
            type="text"
            className="form-control"
            name="menuId"
            value={formData.menuId}
            onChange={handleChange}
            placeholder="Masukkan ID Menu"
            disabled={loading}
          />
        </div>

        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
}
