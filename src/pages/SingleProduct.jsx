import React, { useContext, useEffect } from "react";
import { InventoryContext } from "../context/InventoryContext";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { FaArrowLeft } from "react-icons/fa";

export default function SingleProduct() {
  const { id } = useParams();
  const { getAProduct, loading, product } = useContext(InventoryContext);

  useEffect(() => {
    getAProduct(id);
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-6 space-y-6">
      <div className="flex items-center justify-between">
        <Link
          to="/products"
          className="flex items-center gap-2 text-indigo-700 hover:text-indigo-900"
        >
          <FaArrowLeft />
          <span>Back To Products</span>
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Product Details</h1>
      </div>

      <div className="border-t border-gray-300 pt-4 space-y-2">
        <p className="text-2xl font-semibold tracking-wide text-gray-900">
          {product.ItemName}
        </p>
        <p className="text-gray-700 text-lg">{product.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
        <div>
          <p className="text-gray-600 font-medium">Category</p>
          <p className="text-lg">{product.category}</p>
        </div>
        <div>
          <p className="text-gray-600 font-medium">Status</p>
          <p
            className={`text-lg font-semibold ${
              product.status === "available" ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.status}
          </p>
        </div>
        <div>
          <p className="text-gray-600 font-medium">Purchasing Price</p>
          <p className="text-lg">${product.purchasingPrice}</p>
        </div>
        <div>
          <p className="text-gray-600 font-medium">Selling Price</p>
          <p className="text-lg">${product.sellingPrice}</p>
        </div>
        <div>
          <p className="text-gray-600 font-medium">Quantity</p>
          <p className="text-lg">{product.quantity} {product.unit}</p>
        </div>
        <div>
          <p className="text-gray-600 font-medium">Min Quantity</p>
          <p className="text-lg">
            {product.minQuantity} {product.unit}
          </p>
        </div>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Supplier Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 font-medium">Name</p>
            <p className="text-lg">{product.supplier?.supplierName}</p>
          </div>
          <div>
            <p className="text-gray-600 font-medium">Email</p>
            <p className="text-lg">{product.supplier?.email}</p>
          </div>
          <div>
            <p className="text-gray-600 font-medium">Phone</p>
            <p className="text-lg">{product.supplier?.phone}</p>
          </div>
          <div>
            <p className="text-gray-600 font-medium">Address</p>
            <p className="text-lg">{product.supplier?.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
