import React, { useState, useEffect } from "react";

const apartmentList = [
  "Brichwood", "Norwood", "Lake Side View", "Sriram City",
  "Aratt Requizza", "Herculus", "Smandow", "Green Terrace", "Aratt Firinza",
];

const flatList = [
  "A-101", "A-102", "A-201", "A-202",
  "B-101", "B-102", "B-201", "B-202",
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

    if (name === "contact" && !/^\d{0,10}$/.test(value)) return;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

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
    const { amount, contact, apartment, flatNo, paymentStatus } = formData;

    if (!amount || !contact || !apartment || !flatNo || !paymentStatus) {
      alert("Please fill all fields");
      return;
    }

    setShowDialog(true);
  };

  useEffect(() => {
    if (showDialog) {
      const timer = setTimeout(() => setShowDialog(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showDialog]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6">
      {showDialog && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg">
            ✅ Form submitted successfully!
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-3xl p-6 sm:p-8 rounded-xl shadow-xl"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-700 mb-6">
          Delivery Form
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Amount */}
          <div>
            <label className="block mb-1 font-medium">Amount (₹)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block mb-1 font-medium">Contact Number</label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="10-digit number"
              className="w-full border rounded-lg p-3"
              maxLength={10}
            />
          </div>

          {/* Apartment Search */}
          <div className="relative">
            <label className="block mb-1 font-medium">Apartment Name</label>
            <input
              type="text"
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
              placeholder="Type to search"
              className="w-full border rounded-lg p-3"
              onFocus={() => setShowApartmentDropdown(true)}
            />
            {showApartmentDropdown && filteredApartments.length > 0 && (
              <ul className="absolute z-50 bg-white border mt-1 w-full rounded-md shadow-md max-h-48 overflow-y-auto">
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

          {/* Flat Number */}
          <div>
            <label className="block mb-1 font-medium">Flat Number</label>
            <select
              name="flatNo"
              value={formData.flatNo}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="">Select Flat</option>
              {flatList.map((flat, index) => (
                <option key={index} value={flat}>
                  {flat}
                </option>
              ))}
            </select>
          </div>

          {/* Payment Status */}
          <div className="sm:col-span-2">
            <label className="block mb-2 font-medium">Payment Status</label>
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentStatus"
                  value="Paid"
                  checked={formData.paymentStatus === "Paid"}
                  onChange={handleChange}
                  className="accent-green-500"
                />
                Paid
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentStatus"
                  value="Unpaid"
                  checked={formData.paymentStatus === "Unpaid"}
                  onChange={handleChange}
                  className="accent-red-500"
                />
                Unpaid
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DeliveryForm;
