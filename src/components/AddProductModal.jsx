import { Select } from "@chakra-ui/react";
import React, { useContext, useMemo, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { InventoryContext } from "../context/InventoryContext";
import { fetchCategories, fetchSupplier } from "../utils/utils";

export default function AddProductModal({ type, product }) {
  const [showModal, setShowModal] = useState(false);
  const [inputs, setInputs] = useState(
    type === "edit"
      ? { ...product }
      : {
          ItemName: "",
          category: "",
          supplier: "",
          quantity: 0,
          sellingPrice: 0,
          unit: "",
          description: "",
          slug: "",
          image: "",
          purchasingPrice: 0,
          minQuantity: 0,
          status: "",
        }
  );
  const [newCategory, setNewCategory] = useState(false);
  const [newSupplier, setNewSupplier] = useState(false);
  const { createProduct, updateProduct, products } =
    useContext(InventoryContext);
  const categories = fetchCategories(products);
  const sup = fetchSupplier(products);
  const suppliers = useMemo(() => {
    if (!sup || sup.length < 0) return;
    return [...new Set(sup.map((supplier) => supplier.supplierName))];
  });

  const handleFormChange = (e) => {
    e.preventDefault();
    if (type === "edit") {
      updateProduct(inputs, product._id);
    } else {
      createProduct(inputs);
    }
    setShowModal(false);
  };

  return (
    <>
      {type === "edit" ? (
        <button
          onClick={() => setShowModal(!showModal)}
          className="bg-sky-950 text-white px-3 py-1 rounded"
        >
          <FaEdit />
        </button>
      ) : (
        <button
          onClick={() => setShowModal(!showModal)}
          className="bg-sky-950 text-white px-3 py-1 rounded"
        >
          Add A Product
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
            {type === "add" ? "Add Product" : "Update Product"}
          </h2>

          <form
            onSubmit={handleFormChange}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Row 1 */}
            <div>
              <label
                htmlFor="item-name"
                className="block text-sm font-medium text-gray-700"
              >
                Item Name
              </label>
              <input
                type="text"
                id="item-name"
                placeholder="Item Name"
                value={inputs.ItemName}
                onChange={(e) =>
                  setInputs({ ...inputs, ItemName: e.target.value })
                }
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            {/* Row 2 */}
            <div>
              <label
                htmlFor="item-quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Item Quantity
              </label>
              <input
                type="number"
                id="item-quantity"
                placeholder="Item Quantity"
                value={inputs.quantity}
                onChange={(e) =>
                  setInputs({ ...inputs, quantity: e.target.value })
                }
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            <div>
              <label
                htmlFor="item-category"
                className="block text-sm font-medium text-gray-700"
              >
                Item Category
              </label>
              {/* select from existing categories */}
              <Select
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                value={inputs.category}
                onChange={(e) =>
                  setInputs({ ...inputs, category: e.target.value })
                }
                placeholder="Select Category"
              >
                {categories &&
                  categories.map((category, idx) => (
                    <option key={idx} value={category}>
                      {category}
                    </option>
                  ))}
              </Select>
              {/* create a new category */}
              <button
                onClick={() => setNewCategory(!newCategory)}
                className="text-sm text-blue-500 px-3 py-1"
              >
                {newCategory ? "Cancel" : "Create New Category"}
              </button>
              {newCategory && (
                <input
                  type="text"
                  id="item-category"
                  placeholder="Item Category"
                  value={inputs.category}
                  onChange={(e) =>
                    setInputs({ ...inputs, category: e.target.value })
                  }
                  className="mt-1 w-52 border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              )}
            </div>

            {/* Row 3 */}
            <div>
              <label
                htmlFor="item-status"
                className="block text-sm font-medium text-gray-700"
              >
                Item Status
              </label>
              <Select
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                value={inputs.status}
                onChange={(e) =>
                  setInputs({ ...inputs, status: e.target.value })
                }
              >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </Select>
            </div>

            <div>
              <label
                htmlFor="item-supplier"
                className="block text-sm font-medium text-gray-700"
              >
                Item Supplier
              </label>
              <Select
                className="mt-1 w-full border rounded-lg px-3 py-2 bg-slate-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                value={inputs.supplier.supplierName}
                onChange={(e) =>
                  setInputs({ ...inputs, supplier: e.target.value })
                }
                placeholder="Select Supplier"
              >
                {suppliers &&
                  suppliers.map((supplier, idx) => (
                    <option key={idx} value={supplier}>
                      {supplier}
                    </option>
                  ))}
              </Select>
              {/* create a new supplier */}
              <button
                onClick={() => setNewSupplier(!newSupplier)}
                className="text-sm text-blue-500 px-3 py-1"
              >
                {newSupplier ? "Cancel" : "Create New Supplier"}
              </button>
              {newSupplier && (
                <input
                  type="text"
                  id="item-supplier"
                  placeholder="Item Supplier"
                  value={inputs.supplier}
                  onChange={(e) =>
                    setInputs({ ...inputs, supplier: e.target.value })
                  }
                  className="mt-1 w-52 border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              )}
            </div>

            {/* Row 4 */}
            <div>
              <label
                htmlFor="item-unit"
                className="block text-sm font-medium text-gray-700"
              >
                Item Unit
              </label>
              <Select
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                value={inputs.unit}
                onChange={(e) => setInputs({ ...inputs, unit: e.target.value })}
              >
                <option value="Pcs">Pcs</option>
                <option value="Kg">Kg</option>
                <option value="Dozen">Dozen</option>
              </Select>
            </div>

            <div>
              <label
                htmlFor="item-min-quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Min Quantity
              </label>
              <input
                type="number"
                id="item-min-quantity"
                placeholder="Minimum Quantity"
                value={inputs.minQuantity}
                onChange={(e) =>
                  setInputs({ ...inputs, minQuantity: e.target.value })
                }
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            {/* Row 5 */}
            <div>
              <label
                htmlFor="item-purchasing-price"
                className="block text-sm font-medium text-gray-700"
              >
                Purchasing Price
              </label>
              <input
                type="number"
                id="item-purchasing-price"
                placeholder="Purchasing Price"
                value={inputs.purchasingPrice}
                onChange={(e) =>
                  setInputs({ ...inputs, purchasingPrice: e.target.value })
                }
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            <div>
              <label
                htmlFor="item-selling-price"
                className="block text-sm font-medium text-gray-700"
              >
                Selling Price
              </label>
              <input
                type="number"
                id="item-selling-price"
                placeholder="Selling Price"
                value={inputs.sellingPrice}
                onChange={(e) =>
                  setInputs({ ...inputs, sellingPrice: e.target.value })
                }
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            {/* Row 6 */}
            <div className="md:col-span-2">
              <label
                htmlFor="item-description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="item-description"
                placeholder="Item Description"
                value={inputs.description}
                onChange={(e) =>
                  setInputs({ ...inputs, description: e.target.value })
                }
                className="mt-1 w-full border rounded-lg px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2 flex justify-end mt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-950 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
