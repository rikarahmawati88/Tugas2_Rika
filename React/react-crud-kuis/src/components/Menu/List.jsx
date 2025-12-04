// Import hooks dari React untuk state management dan side effects
import { useState, useEffect } from "react";
// Import axios untuk HTTP request
import axios from "axios";
// Import NavLink untuk navigasi antar route
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function MenuList() {
  // State untuk data menu
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load data saat komponen pertama kali muncul
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
        // LOKAL
          "http://localhost:3000/api/menu"
        );

        setMenu(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching menu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  // Loading & Error
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Hapus menu
  const handleDelete = (id, nama) => {
    Swal.fire({
      title: `Yakin mau hapus menu "${nama}"?`,
      text: "Aksi ini tidak bisa dibatalkan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#faff6b",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/api/menu/${id}`)
          .then((response) => {
            // Update state
            setMenu(menu.filter((p) => p._id !== id));

            Swal.fire({
              title: "Deleted!",
              text: response.data.message,
              icon: "success",
            });
          });
      }
    });
  };

  return (
    <div>
      <h1>Daftar Menu</h1>

      <NavLink to="/menu/create" className="btn btn-primary mb-3">
        Tambah Menu
      </NavLink>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Jenis Menu</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {menu.map((men) => (
            <tr key={men._id}>
              <td>{men.nama}</td>
              <td>{men.jenisMenu}</td>

              <td>
                <NavLink
                  to={`/menu/edit/${men._id}`}
                  className="btn btn-warning me-2"
                >
                  Ubah
                </NavLink>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(men._id, men.nama)}
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
