import React, { useContext } from 'react'
import { InventoryContext } from '../context/InventoryContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function SalesGraph() {
  const { orders } = useContext(InventoryContext);
  const data = orders.map(order => ({
    name: order.createdAt.slice(11, 16), // Extracting the date from the createdAt field
    sales: order.totalAmount,
  }));
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
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
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
        
      </LineChart>
    </ResponsiveContainer>
  )
}
