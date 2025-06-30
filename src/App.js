import React, { useState, useEffect } from "react";

const apartmentList = [
  "Brichwood",
  "Norwood",
  "Lake Side view",
  "Sriram city",
  "Arat requizza",
  "Herculus",
  "Smandow",
  "Green terrace",
  "arat firinza",
];

const DeliveryForm = () => {
  const [formData, setFormData] = useState({
    amount: "",
    contact: "",
    apartment: "",
    flatNo: "",
    paymentStatus: "",
  });

  const [showDialog, setShowDialog] = useState(false);
  const [filteredApartments, setFilteredApartments] = useState(apartmentList);
  const [showApartmentDropdown, setShowApartmentDropdown] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Live search for apartment
    if (name === "apartment") {
      const filtered = apartmentList.filter((apt) =>
        apt.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredApartments(filtered);
      setShowApartmentDropdown(true);
    }
  };

  const handleApartmentSelect = (value) => {
    setFormData((prev) => ({ ...prev, apartment: value }));
    setShowApartmentDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowDialog(true);
  };

  useEffect(() => {
    if (showDialog) {
      const timer = setTimeout(() => setShowDialog(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showDialog]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 relative">
      {showDialog && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-500 text-white px-6 py-3 rounded-md shadow-md">
            ✅ Form submitted successfully!
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl"
      >
        <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
          Delivery Form
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Amount */}
          <div className="bg-gray-50 border rounded-xl p-4 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (₹)
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Contact */}
          <div className="bg-gray-50 border rounded-xl p-4 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Number
            </label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter contact"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Apartment Live Search Dropdown */}
          <div className="bg-gray-50 border rounded-xl p-4 shadow-sm relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Apartment Name
            </label>
            <input
              type="text"
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
              onFocus={() => setShowApartmentDropdown(true)}
              placeholder="Search apartment"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="off"
              required
            />
            {showApartmentDropdown && filteredApartments.length > 0 && (
              <ul className="absolute z-50 bg-white border border-gray-300 rounded-lg mt-1 w-full max-h-48 overflow-y-auto">
                {filteredApartments.map((apt, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleApartmentSelect(apt)}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                  >
                    {apt}
                  </li>
                ))}
              </ul>
            )}
          </div>

       
          <div className="bg-gray-50 border rounded-xl p-4 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Flat Number
            </label>
            <select
              name="flatNo"
              value={formData.flatNo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Flat Number</option>
              <option value="A-101">A-101</option>
              <option value="A-102">A-102</option>
              <option value="A-201">A-201</option>
              <option value="A-202">A-202</option>
              <option value="B-101">B-101</option>
              <option value="B-102">B-102</option>
              <option value="B-201">B-201</option>
              <option value="B-202">B-202</option>
            </select>
          </div>

         
          <div className="sm:col-span-2 bg-gray-50 border rounded-xl p-4 shadow-sm">
            <label className="block mb-2 font-medium text-gray-700">
              Payment Status
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentStatus"
                  value="Paid"
                  checked={formData.paymentStatus === "Paid"}
                  onChange={handleChange}
                  className="accent-green-600"
                  required
                />
                <span>Paid</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentStatus"
                  value="Unpaid"
                  checked={formData.paymentStatus === "Unpaid"}
                  onChange={handleChange}
                  className="accent-red-600"
                  required
                />
                <span>Unpaid</span>
              </label>
            </div>
          </div>

        
          <button
            type="submit"
            className="sm:col-span-2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 font-semibold transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeliveryForm;
