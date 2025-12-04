import { useState } from "react";
import axios from "axios";

export default function CreateMenu() {
  const [nama, setNama] = useState("");
  const [jenisMenu, setJenisMenu] = useState("");
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nama) {
      setError("Nama menu wajib diisi!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/menu",
        { nama, jenisMenu }
      );

      console.log("Menu created:", response.data);
      alert("Menu berhasil dibuat!");

      setNama("");
    } catch (err) {
      console.error("Error creating playlist:", err);
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
      <h2 className="mb-4">Tambah Menu</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nama </label>
          <input
            type="text"
            className="form-control"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Contoh: Ayam Geprek"
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Jenis Menu</label>
          <input
          type="text"
          className="form-control"
          value={jenisMenu}
          onChange={(e) => setJenisMenu(e.target.value)}
          placeholder="Contoh: Menu Utama"
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
