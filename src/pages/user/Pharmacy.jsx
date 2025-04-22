import { useState, useEffect } from 'react';
import { Search, MapPin, ShoppingCart, Filter, Calendar, Truck, Store, Upload } from 'lucide-react';

export default function PharmacyPage() {
  const [medications, setMedications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pharmacySearchTerm, setPharmacySearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [nearbyPharmacies, setNearbyPharmacies] = useState([]);
  const [activeTab, setActiveTab] = useState('find');
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [prescription, setPrescription] = useState(null);

  useEffect(() => {
    // Simulating API call to fetch medications
    const fetchMedications = () => {
      const sampleMedications = [
        {
          name: "Vicodon",
          description: "Pain relief medication",
          quantity: 85,
          manufacturer: "Amoro Drugs",
          price: 22.99,
          expiryDate: "2025-09-11"
        },
        {
          name: "Amoxicillin",
          description: "Antibiotic for bacterial infections",
          quantity: 120,
          manufacturer: "HealthPlus",
          price: 15.50,
          expiryDate: "2025-07-23"
        },
        {
          name: "Loratadine",
          description: "Antihistamine for allergies",
          quantity: 60,
          manufacturer: "AllCare Pharmaceuticals",
          price: 8.99,
          expiryDate: "2026-01-15"
        },
        {
          name: "Metformin",
          description: "Diabetes medication",
          quantity: 100,
          manufacturer: "DiaCare",
          price: 12.75,
          expiryDate: "2025-11-30"
        }
      ];
      setMedications(sampleMedications);
    };

    const fetchNearbyPharmacies = () => {
      const pharmacies = [
        { 
          id: 1, 
          name: "HealthFirst Pharmacy", 
          distance: "0.8 km", 
          address: "23 Main St, Accra", 
          rating: 4.7,
          inventory: [
            {
              name: "Vicodon",
              description: "Pain relief medication",
              quantity: 85,
              manufacturer: "Amoro Drugs",
              price: 22.99,
              expiryDate: "2025-09-11"
            },
            {
              name: "Amoxicillin",
              description: "Antibiotic for bacterial infections",
              quantity: 120,
              manufacturer: "HealthPlus",
              price: 15.50,
              expiryDate: "2025-07-23"
            }
          ]
        },
        { 
          id: 2, 
          name: "MediPlus Pharmacy", 
          distance: "1.2 km", 
          address: "45 Circle Road, Accra", 
          rating: 4.5,
          inventory: [
            {
              name: "Loratadine",
              description: "Antihistamine for allergies",
              quantity: 60,
              manufacturer: "AllCare Pharmaceuticals",
              price: 8.99,
              expiryDate: "2026-01-15"
            },
            {
              name: "Metformin",
              description: "Diabetes medication",
              quantity: 100,
              manufacturer: "DiaCare",
              price: 12.75,
              expiryDate: "2025-11-30"
            }
          ]
        },
        { 
          id: 3, 
          name: "Care Pharmacy", 
          distance: "2.5 km", 
          address: "12 Independence Ave, Accra", 
          rating: 4.3,
          inventory: [
            {
              name: "Vicodon",
              description: "Pain relief medication",
              quantity: 35,
              manufacturer: "Amoro Drugs",
              price: 23.99,
              expiryDate: "2025-09-11"
            },
            {
              name: "Loratadine",
              description: "Antihistamine for allergies",
              quantity: 45,
              manufacturer: "AllCare Pharmaceuticals",
              price: 9.50,
              expiryDate: "2026-01-15"
            }
          ]
        },
        { 
          id: 4, 
          name: "QuickMeds", 
          distance: "3.1 km", 
          address: "78 Liberty Street, Accra", 
          rating: 4.8,
          inventory: [
            {
              name: "Amoxicillin",
              description: "Antibiotic for bacterial infections",
              quantity: 80,
              manufacturer: "HealthPlus",
              price: 16.25,
              expiryDate: "2025-07-23"
            },
            {
              name: "Metformin",
              description: "Diabetes medication",
              quantity: 75,
              manufacturer: "DiaCare",
              price: 13.50,
              expiryDate: "2025-11-30"
            }
          ]
        }
      ];
      setNearbyPharmacies(pharmacies);
    };

    fetchMedications();
    fetchNearbyPharmacies();
  }, []);

  const addToCart = (medication) => {
    setCart([...cart, { ...medication, id: Date.now(), pharmacyName: selectedPharmacy ? selectedPharmacy.name : "General" }]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const selectPharmacy = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setActiveTab('pharmacy-inventory');
  };

  const handleBackToPharmacies = () => {
    setSelectedPharmacy(null);
    setActiveTab('find');
  };

  const handleUploadPrescription = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPrescription(file);
      // You would typically upload this file to a server
      // For now, we'll just store it in state
    }
  };

  const submitPrescription = () => {
    if (prescription && selectedPharmacy) {
      alert(`Prescription submitted to ${selectedPharmacy.name}. They will contact you shortly.`);
      setPrescription(null);
    } else if (prescription) {
      alert("Prescription uploaded successfully. Select a pharmacy to process your order.");
    }
  };

  const filteredMedications = medications.filter(med => 
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    med.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPharmacies = nearbyPharmacies.filter(pharmacy =>
    pharmacy.name.toLowerCase().includes(pharmacySearchTerm.toLowerCase()) || 
    pharmacy.address.toLowerCase().includes(pharmacySearchTerm.toLowerCase())
  );

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-32">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">pVault Pharmacy Services</h1>
          <p className="mt-1">Find, order, and manage your medications easily</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <button 
              onClick={() => {
                setActiveTab('find');
                setSelectedPharmacy(null);
              }} 
              className={`px-4 py-3 font-medium text-sm ${activeTab === 'find' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            >
              <MapPin className="inline mr-1 w-4 h-4" /> Find Pharmacy
            </button>
            <button 
              onClick={() => setActiveTab('medications')} 
              className={`px-4 py-3 font-medium text-sm ${activeTab === 'medications' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            >
              <Filter className="inline mr-1 w-4 h-4" /> Browse Medications
            </button>
            <button 
              onClick={() => setActiveTab('prescriptions')} 
              className={`px-4 py-3 font-medium text-sm ${activeTab === 'prescriptions' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            >
              <Calendar className="inline mr-1 w-4 h-4" /> My Prescriptions
            </button>
            <button 
              onClick={() => setActiveTab('cart')} 
              className={`ml-auto px-4 py-3 font-medium text-sm ${activeTab === 'cart' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            >
              <ShoppingCart className="inline mr-1 w-4 h-4" /> Cart ({cart.length})
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {activeTab === 'find' && (
          <div>
            <div className="mb-6">
              <div className="flex items-center bg-white shadow rounded-lg p-4">
                <Search className="text-gray-400 w-5 h-5 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search pharmacies by name or location" 
                  className="flex-1 outline-none text-gray-700"
                  value={pharmacySearchTerm}
                  onChange={(e) => setPharmacySearchTerm(e.target.value)}
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md ml-4 text-sm">
                  Search
                </button>
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-4">Nearby Pharmacies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPharmacies.map(pharmacy => (
                <div key={pharmacy.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">{pharmacy.name}</h3>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                      {pharmacy.rating} ★
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">{pharmacy.address}</p>
                  <p className="text-blue-600 text-sm mt-2">
                    <MapPin className="inline mr-1 w-4 h-4" /> {pharmacy.distance} away
                  </p>
                  <div className="mt-4">
                    <button 
                      className="w-full bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition"
                      onClick={() => selectPharmacy(pharmacy)}
                    >
                      View Inventory
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'pharmacy-inventory' && selectedPharmacy && (
          <div>
            <div className="flex items-center mb-6">
              <button 
                onClick={handleBackToPharmacies}
                className="text-blue-600 hover:underline flex items-center mr-4"
              >
                ← Back to pharmacies
              </button>
              <h2 className="text-xl font-semibold">{selectedPharmacy.name} Inventory</h2>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{selectedPharmacy.address}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    <MapPin className="inline mr-1 w-4 h-4" /> {selectedPharmacy.distance} away
                  </p>
                </div>
                <div className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded">
                  {selectedPharmacy.rating} ★
                </div>
              </div>
              
              <div className="mt-4 border-t pt-4">
                <div className="flex flex-wrap gap-2">
                  <button 
                    className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-700 transition flex items-center"
                    onClick={() => setActiveTab('upload-prescription')}
                  >
                    <Upload className="w-4 h-4 mr-1" /> Upload Prescription
                  </button>
                </div>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold mb-4">Available Medications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {selectedPharmacy.inventory.map((medication, index) => (
                <div key={index} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition">
                  <div className="bg-gray-200 h-48 flex items-center justify-center">
                    <img src="/api/placeholder/200/150" alt={medication.name} className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{medication.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{medication.description}</p>
                    <p className="text-sm text-gray-500 mt-2">Manufacturer: {medication.manufacturer}</p>
                    <div className="flex justify-between items-center mt-3">
                      <p className="font-bold text-blue-600">${medication.price.toFixed(2)}</p>
                      <span className={`text-xs px-2 py-1 rounded ${medication.quantity > 50 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {medication.quantity > 50 ? 'In Stock' : 'Low Stock'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Expires: {new Date(medication.expiryDate).toLocaleDateString()}</p>
                    <button 
                      className="w-full mt-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                      onClick={() => addToCart(medication)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'upload-prescription' && selectedPharmacy && (
          <div>
            <div className="flex items-center mb-6">
              <button 
                onClick={() => setActiveTab('pharmacy-inventory')}
                className="text-blue-600 hover:underline flex items-center mr-4"
              >
                ← Back to {selectedPharmacy.name}
              </button>
              <h2 className="text-xl font-semibold">Upload Prescription to {selectedPharmacy.name}</h2>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                {prescription ? (
                  <div>
                    <p className="text-green-600 mb-2">Prescription file selected: {prescription.name}</p>
                    <div className="flex justify-center gap-2">
                      <button 
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                        onClick={() => setPrescription(null)}
                      >
                        Remove
                      </button>
                      <button 
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        onClick={submitPrescription}
                      >
                        Submit to {selectedPharmacy.name}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-500 mb-4">Drag and drop your prescription here, or click to upload</p>
                    <label className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer">
                      Upload Prescription
                      <input 
                        type="file" 
                        className="hidden" 
                        accept=".pdf,.jpg,.jpeg,.png" 
                        onChange={handleUploadPrescription}
                      />
                    </label>
                  </>
                )}
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">Instructions:</h3>
                <ul className="list-disc pl-5 text-gray-600 text-sm">
                  <li>Upload a clear image or PDF of your prescription</li>
                  <li>Ensure all details are clearly visible</li>
                  <li>Your prescription will be reviewed by the pharmacy staff</li>
                  <li>You will be contacted for confirmation before processing</li>
                </ul>

                <div className="mt-6">
                  <h3 className="font-medium mb-2">Add Special Instructions (Optional):</h3>
                  <textarea 
                    className="w-full border border-gray-300 rounded p-2 text-sm" 
                    rows="3" 
                    placeholder="Any special instructions for the pharmacy..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'medications' && (
          <div>
            <div className="mb-6">
              <div className="flex items-center bg-white shadow rounded-lg p-4">
                <Search className="text-gray-400 w-5 h-5 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search medications by name or description" 
                  className="flex-1 outline-none text-gray-700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredMedications.map((medication, index) => (
                <div key={index} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition">
                  <div className="bg-gray-200 h-48 flex items-center justify-center">
                    <img src="/api/placeholder/200/150" alt={medication.name} className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{medication.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{medication.description}</p>
                    <p className="text-sm text-gray-500 mt-2">Manufacturer: {medication.manufacturer}</p>
                    <div className="flex justify-between items-center mt-3">
                      <p className="font-bold text-blue-600">${medication.price.toFixed(2)}</p>
                      <span className={`text-xs px-2 py-1 rounded ${medication.quantity > 50 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {medication.quantity > 50 ? 'In Stock' : 'Low Stock'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Expires: {new Date(medication.expiryDate).toLocaleDateString()}</p>
                    <button 
                      className="w-full mt-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                      onClick={() => addToCart(medication)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'prescriptions' && (
          <div>
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Upload Prescription</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                {prescription ? (
                  <div>
                    <p className="text-green-600 mb-2">Prescription file selected: {prescription.name}</p>
                    <div className="flex justify-center gap-2">
                      <button 
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                        onClick={() => setPrescription(null)}
                      >
                        Remove
                      </button>
                      <button 
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        onClick={submitPrescription}
                      >
                        Submit Prescription
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-500 mb-4">Drag and drop your prescription here, or click to upload</p>
                    <label className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer">
                      Upload Prescription
                      <input 
                        type="file" 
                        className="hidden" 
                        accept=".pdf,.jpg,.jpeg,.png" 
                        onChange={handleUploadPrescription}
                      />
                    </label>
                  </>
                )}
              </div>
              
              {prescription && !selectedPharmacy && (
                <div className="mt-4 p-4 bg-yellow-50 text-yellow-800 rounded-lg">
                  <p>Please select a pharmacy to process your prescription.</p>
                  <button 
                    className="mt-2 bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700 transition"
                    onClick={() => setActiveTab('find')}
                  >
                    Find Pharmacy
                  </button>
                </div>
              )}
            </div>

            <h2 className="text-xl font-semibold mb-4">Recent Prescriptions</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <p className="text-sm text-gray-500">No recent prescriptions found.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
              
              {cart.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <ShoppingCart className="mx-auto w-12 h-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-4">Add medications to your cart to see them here.</p>
                  <button 
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    onClick={() => setActiveTab('medications')}
                  >
                    Browse Medications
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  {cart.map(item => (
                    <div key={item.id} className="p-4 border-b border-gray-200 flex items-center">
                      <div className="bg-gray-200 w-16 h-16 rounded flex-shrink-0 flex items-center justify-center">
                        <img src="/api/placeholder/64/64" alt={item.name} className="object-cover" />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.manufacturer} · From {item.pharmacyName}
                        </p>
                      </div>
                      <div className="ml-4 text-right">
                        <p className="font-bold text-blue-600">${item.price.toFixed(2)}</p>
                        <button 
                          className="text-red-600 text-sm hover:underline mt-1"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${calculateTotal()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span>{cart.length > 0 ? '$3.99' : '$0.00'}</span>
                  </div>
                </div>
                <div className="pt-4 pb-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${cart.length > 0 ? (parseFloat(calculateTotal()) + 3.99).toFixed(2) : '0.00'}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <button 
                    className={`w-full py-3 rounded font-medium ${cart.length > 0 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    disabled={cart.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Delivery Options</h3>
                  <div className="flex items-center mb-3">
                    <input type="radio" id="delivery" name="deliveryOption" className="mr-2" defaultChecked />
                    <label htmlFor="delivery" className="flex items-center text-sm">
                      <Truck className="w-4 h-4 mr-2 text-gray-600" /> 
                      <span>Home Delivery</span>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="pickup" name="deliveryOption" className="mr-2" />
                    <label htmlFor="pickup" className="flex items-center text-sm">
                      <Store className="w-4 h-4 mr-2 text-gray-600" /> 
                      <span>Pickup from Pharmacy</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}