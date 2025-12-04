// Import hooks dari React untuk state management dan side effects
import { useState, useEffect } from "react";
// Import axios untuk melakukan HTTP request ke API
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function MakananList() {
  // State untuk menyimpan data lagu
  const [makanan, setMakanan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data dari API saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchMakanan= async () => {
      try {
        setLoading(true);
        const response = await axios.get(
        // LOKAL
         "http://localhost:3000/api/makanan"
        );
        setMakanan(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching makanan:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMakanan();
  }, []);

  // Loading
  if (loading) return <div>Loading...</div>;
  // Error
  if (error) return <div>Error: {error}</div>;

  // Hapus Makanan
  const handleDelete = (id, deskripsi) => {
    Swal.fire({
      title: `Yakin mau menghapus makanan"${deskripsi}"?`,
      text: "Data akan hilang permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/api/makanan/${id}`)
          .then(() => {
            setMakanan(makanan.filter((item) => item._id !== id));
            Swal.fire({
              title: "Berhasil!",
              text: "Makanan telah dihapus.",
              icon: "success"
            });
          });
      }
    });
  };

  return (
    <div>
      <h1>Daftar Makanan</h1>

      <NavLink to="/makanan/create" className="btn btn-primary mb-3">
        Tambah Makanan
      </NavLink>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>deskripsi</th>
            <th>asalDaerah</th>
            <th>Menu</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {makanan.map((mkn) => (
            <tr key={mkn._id}>
              <td>{mkn.deskripsi}</td>
              <td>{mkn.asalDaerah}</td>

              {/* Tampilkan nama Menu jika ada relasi */}
              <td>{mkn.menuId ? mkn.menuId.nama : "-"}</td>

              <td>
                <NavLink
                  to={`/makanan/edit/${mkn._id}`}
                  className="btn btn-warning me-2"
                >
                  Edit
                </NavLink>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(mkn._id, mkn.deskripsi)}
                >
                  Hapus
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
