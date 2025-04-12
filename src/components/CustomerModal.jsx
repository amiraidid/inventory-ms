import React, { useContext, useState } from "react";
import { InventoryContext } from "../context/InventoryContext";
import { FaEdit } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

export default function CustomerModal({ type, customer }) {
  const { createCustomer, updateCustomer } = useContext(InventoryContext);
  const [showModal, setShowModal] = useState(false);
  const [inputs, setInputs] = useState(
    type === "add"
      ? {
          customerName: "",
          phone: "",
          address: "",
        }
      : {
          name: customer.name,
          phone: customer.phone,
          address: customer.address,
          dueAmount: customer.dueAmount
        }
  );

  const handleSubmit = async (e, inputs, type) => {
    e.preventDefault();
    if (type === "add") {
      createCustomer(inputs);
      setShowModal(false);
    } else {
      updateCustomer(customer._id, inputs);
      setShowModal(false);
    }
    window.location.reload();
  };

  return (
    <>
      {type === "add" ? (
        <button
          onClick={() => setShowModal(!showModal)}
          className="bg-sky-900 text-white px-4 py-2 rounded-md hover:bg-sky-950 transition duration-300 ease-in-out"
        >
          Add Customer
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
            {type === "add" ? "Add Customer" : "Update Customer"}
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="Customer-name"
                className="block text-sm font-medium text-gray-700"
              >
                Customer Name
              </label>
              <input
                type="text"
                id="Customer-name"
                placeholder="Customer Name"
                value={inputs.name}
                onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
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

            {type !== "add" && (
              <div>
                <label
                  htmlFor="DueAmount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Due Amount
                </label>
                <input
                  type="number"
                  id="DueAmount"
                  placeholder="Due Amount"
                  value={inputs.dueAmount}
                  onChange={(e) =>
                    setInputs({ ...inputs, dueAmount: e.target.value })
                  }
                  className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
            )}

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
                onClick={(e) => {
                  handleSubmit(e, inputs, type);
                }}
                className="px-6 py-4 text-xl bg-gray-900 text-white rounded-xl hover:bg-gray-950 transition"
              >
                {type === "add" ? "Add Customer" : "Update Customer"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
