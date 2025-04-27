import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentMedicine, setCurrentMedicine] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: "",
    manufacturer: "",
    price: "",
    expiryDate: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const API_URL = "https://pvault.onrender.com/api/medicine";

  const getToken = () => localStorage.getItem("token");

  const fetchMedicines = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setMedicines(response.data || []);
    } catch (err) {
      setError("Failed to fetch medicines: " + (err.response?.data?.message || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const prepareFormData = () => {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });
    if (imageFile) data.append('image', imageFile);
    return data;
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      quantity: "",
      manufacturer: "",
      price: "",
      expiryDate: ""
    });
    setImageFile(null);
    setImagePreview(null);
    setCurrentMedicine(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAddMedicine = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = prepareFormData();
      await axios.post(API_URL, data, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "multipart/form-data"
        }
      });
      await fetchMedicines();
      setIsAddModalOpen(false);
      resetForm();
    } catch (err) {
      setError("Failed to add medicine: " + (err.response?.data?.message || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateMedicine = async () => {
    if (!currentMedicine) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = prepareFormData();
      await axios.patch(`${API_URL}/${currentMedicine.id}`, data, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "multipart/form-data"
        }
      });
      await fetchMedicines();
      setIsEditModalOpen(false);
      resetForm();
    } catch (err) {
      setError("Failed to update medicine: " + (err.response?.data?.message || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMedicine = async (id) => {
    if (!window.confirm("Are you sure you want to delete this medicine?")) return;
    setIsLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      await fetchMedicines();
    } catch (err) {
      setError("Failed to delete medicine: " + (err.response?.data?.message || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  const openEditModal = (medicine) => {
    setCurrentMedicine(medicine);
    setFormData({
      name: medicine.name || "",
      description: medicine.description || "",
      quantity: medicine.quantity || "",
      manufacturer: medicine.manufacturer || "",
      price: medicine.price || "",
      expiryDate: medicine.expiryDate ? medicine.expiryDate.split('T')[0] : ""
    });
    setImageFile(null);
    setImagePreview(medicine.imageUrl || null);
    setIsEditModalOpen(true);
  };

  const MedicineModal = ({ isOpen, onClose, title, onSubmit }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">{title}</h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            {/* Form fields */}
            {["name", "description", "quantity", "manufacturer", "price", "expiryDate"].map(field => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === "description" ? "textarea" : field === "expiryDate" ? "date" : "text"}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  required={["name", "quantity", "manufacturer", "price", "expiryDate"].includes(field)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            ))}

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Medicine Image</label>
              <div className="flex items-center mt-2">
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="h-20 w-20 object-cover rounded mr-4" />
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md">
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {isLoading ? "Saving..." : title}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600">Medicine Management</h1>
        <button
          onClick={() => { setIsAddModalOpen(true); resetForm(); }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Add Medicine
        </button>
      </div>

      {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>}

      {isLoading ? (
        <div className="text-center py-6">Loading...</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full table-auto divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Image", "Name", "Description", "Manufacturer", "Price", "Quantity", "Expiry Date", "Actions"].map(col => (
                  <th key={col} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {medicines.map(medicine => (
                <tr key={medicine.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {medicine.imageUrl ? (
                      <img src={medicine.imageUrl} alt={medicine.name} className="h-10 w-10 rounded-full object-cover" />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">N/A</div>
                    )}
                  </td>
                  <td className="px-6 py-4">{medicine.name}</td>
                  <td className="px-6 py-4">{medicine.description}</td>
                  <td className="px-6 py-4">{medicine.manufacturer}</td>
                  <td className="px-6 py-4">${medicine.price}</td>
                  <td className="px-6 py-4">{medicine.quantity}</td>
                  <td className="px-6 py-4">{medicine.expiryDate ? new Date(medicine.expiryDate).toLocaleDateString() : "N/A"}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button onClick={() => openEditModal(medicine)} className="text-blue-600">Edit</button>
                    <button onClick={() => handleDeleteMedicine(medicine.id)} className="text-red-600">Delete</button>
                  </td>
                </tr>
              ))}
              {medicines.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">No medicines found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      <MedicineModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Medicine"
        onSubmit={handleAddMedicine}
      />
      <MedicineModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Update Medicine"
        onSubmit={handleUpdateMedicine}
      />
    </div>
  );
};

export default Medicines;
