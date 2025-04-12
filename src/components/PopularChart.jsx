import React, { useContext } from 'react'
import { InventoryContext } from '../context/InventoryContext';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function PopularChart() {
    const { popularProducts } = useContext(InventoryContext);
    
    const data = popularProducts.map((product) => ({
      quantity: product.soldQuantity,
      sales: product.soldQuantity * product.sellingPrice,
    }))
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="quantity" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill="#8884d8" />
        <Bar dataKey="quantity" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}
