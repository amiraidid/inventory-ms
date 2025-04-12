import React, { useContext, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { InventoryContext } from "../context/InventoryContext";


export default function SupplierModal({ type, supplier }) {
  const { createSupplier, updateSupplier } = useContext(InventoryContext);
  const [showModal, setShowModal] = useState(false);
  const [inputs, setInputs] = useState(
   type === "add" ? {
      supplierName: "",
      email: "",
      phone: "",
      address: "",
    } : {
      supplierName: supplier.supplierName,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
    }
  );

  const handleSubmit = async (e, inputs, type) => {
    e.preventDefault();
    if (type === "add") {
      createSupplier(inputs)
      setShowModal(false)
    } else {
      updateSupplier(supplier._id, inputs)
      setShowModal(false)
    }
    window.location.reload()  
  }
  return (
    <>
      {type === "add" ? (
        <button
          onClick={() => setShowModal(!showModal)}
          className="bg-sky-900 text-white px-4 py-2 rounded-md hover:bg-sky-950 transition duration-300 ease-in-out"
        >
          Add Supplier
        </button>
      ) : (
        <button
          onClick={() => setShowModal(!showModal)}
          className="bg-sky-900 text-white px-4 py-2 rounded-md hover:bg-sky-950 transition duration-300 ease-in-out"
        >
            <FaEdit className="text-white" />
        </button>
      )}
      <div
        className={`${
          showModal ? "flex" : "hidden"
        } items-start justify-center fixed inset-0 z-50 bg-black bg-opacity-50 `}
      >
        <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 mt-14 mx-4 overflow-y-auto max-h-[90vh] ">
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          >
            <FaX />
          </button>

          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            {type === "add" ? "Add Supplier" : "Update Supplier"}
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="supplier-name"
                className="block text-sm font-medium text-gray-700"
              >
                Supplier Name
              </label>
              <input
                type="text"
                id="supplier-name"
                placeholder="Supplier Name"
                value={inputs.supplierName}
                onChange={(e) =>
                  setInputs({ ...inputs, supplierName: e.target.value })
                }
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>


            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={inputs.email}
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="text"
                id="phone"
                placeholder="Phone"
                value={inputs.phone}
                onChange={(e) =>
                  setInputs({ ...inputs, phone: e.target.value })
                }
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                placeholder="Address"
                value={inputs.address}
                onChange={(e) =>
                  setInputs({ ...inputs, address: e.target.value })
                }
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>


            {/* Submit */}
            <div className="md:col-span-2 flex justify-end mt-4">
              <button
                type="submit"
                onClick={(e) => {handleSubmit(e, inputs, type)}}
                className="px-6 py-4 text-xl bg-gray-900 text-white rounded-xl hover:bg-gray-950 transition"
              >
                {type === "add" ? "Add Supplier" : "Update Supplier"}
              </button>
              
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
