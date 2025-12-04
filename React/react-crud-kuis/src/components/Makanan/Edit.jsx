import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditLagu() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    deskripsi: "",
    asalDaerah: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const fetchMakanan = async () => {
      try {
        setIsLoadingData(true);
        const response = await axios.get(
         `http://localhost:3000/api/makanan/${id}`
        );

        setFormData({
          deskripsi: response.data.deskripsi,
          asalDaerah: response.data.asalDaerah,
        });
      } catch (err) {
        setError("Gagal mengambil data Makanan");
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchMakanan();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.deskripsi || !formData.asalDaerah) {
      setError("Semua field wajib diisi!");
      return;
    }

    setLoading(true);
    try {
      await axios.patch(
        `http://localhost:3000/api/makanan/${id}`,
        {
          deskripsi: formData.deskripsi,
          asalDaerah: formData.asalDaerah,
        }
      );
      navigate("/makanan");
    } catch (err) {
      setError("Gagal update makanan");
    } finally {
      setLoading(false);
    }
  };

  if (isLoadingData) return <div className="mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>Edit Makanan</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Deskripsi Menu</label>
          <input
            type="text"
            className="form-control"
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Daerah Asal</label>
          <input
            type="text"
            className="form-control"
            name="asalDaerah"
            value={formData.asalDaerah}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}
