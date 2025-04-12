import React, { useContext } from 'react'
import { InventoryContext } from '../context/InventoryContext'
import Loader from '../components/Loader'
import PayModal from '../components/PayModal';

export default function Carts() {
  const { cartProducts, loading } = useContext(InventoryContext);

  const subtotal = cartProducts?.reduce((acc, item) => acc + item.amount, 0) || 0;
  if (loading) return <Loader />

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

      {cartProducts && cartProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cartProducts.map((product) => (
              <div
                key={product._id}
                className="grid grid-cols-3 md:grid-cols-4 gap-4 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="col-span-2">
                  <p className="text-lg font-semibold text-gray-800">{product.name}</p>
                  <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 text-sm">Price</p>
                  <p className="font-medium text-lg">${product.sellingPrice}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 text-sm">Total</p>
                  <p className="font-semibold text-lg">${product.amount}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-gray-100 p-6 rounded-xl shadow-md h-fit flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cart Summary</h2>
              <div className="flex justify-between text-lg mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg font-medium mt-4">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
            <PayModal />
          </div>
        </div>
      ) : (
        <p className="text-center text-xl text-gray-600">Your cart is currently empty.</p>
      )}
    </div>
  );
}
