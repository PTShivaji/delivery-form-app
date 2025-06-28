import React, { useState, useEffect } from "react";

const DeliveryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    apartment: "",
    flatNo: "",
    paymentStatus: "",
  });

  const [showDialog, setShowDialog] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700">
          Delivery Form
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />

        <input
          type="tel"
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />

        <input
          type="text"
          name="apartment"
          placeholder="Apartment Name"
          value={formData.apartment}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />

        <input
          type="text"
          name="flatNo"
          placeholder="Flat Number"
          value={formData.flatNo}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Payment Status
          </label>
          <div className="flex flex-col gap-2">
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
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DeliveryForm;
