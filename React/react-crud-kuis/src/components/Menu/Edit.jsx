import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditMenu() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    namaMenu: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setIsLoadingData(true);
        const response = await axios.get(
          `http://localhost:3000/api/menu/${id}`
        );

        setFormData({
          namaMenu: response.data.namaMenu,
        });
      } catch (err) {
        setError("Gagal mengambil data menu");
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchMenu();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ namaMenu: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.namaMenu) {
      setError("Nama menu tidak boleh kosong!");
      return;
    }

    setLoading(true);
    try {
      await axios.patch(
        `http://localhost:3000/api/menu/${id}`,
        { namaMenu: formData.namaMenu }
      );
      navigate("/menu");
    } catch (err) {
      setError("Gagal update menu");
    } finally {
      setLoading(false);
    }
  };

  if (isLoadingData) return <div className="mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>Edit Menu</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nama Menu</label>
          <input
            type="text"
            className="form-control"
            value={formData.namaMenu}
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
