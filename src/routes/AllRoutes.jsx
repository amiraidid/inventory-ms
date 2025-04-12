import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Customers, Dashboard, Inventory, Orders, Products, Reports, Settings, Suppliers } from '../pages'
import SearchItem from '../pages/SearchItem'
import Carts from '../pages/Carts'
import ProtectedRoutes from './ProtectedRoutes'
import SingleProduct from '../pages/SingleProduct'

function AllRoutes() {
  return (
    <main className='mt-5 w-full mx-5'>
      <Routes>
        <Route path='/' element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
        <Route path='/orders' element={<ProtectedRoutes><Orders /></ProtectedRoutes>} />
        <Route path='/products' element={<ProtectedRoutes><Products /></ProtectedRoutes>} />
        <Route path='/reports' element={<ProtectedRoutes><Reports /></ProtectedRoutes>} />
        <Route path='/search' element={<ProtectedRoutes><SearchItem /></ProtectedRoutes>} />
        <Route path='/carts' element={<ProtectedRoutes><Carts /></ProtectedRoutes>} />
        <Route path='/suppliers' element={<ProtectedRoutes><Suppliers /></ProtectedRoutes>} />
        <Route path='/customers' element={<ProtectedRoutes><Customers /></ProtectedRoutes>} />
        <Route path='/settings' element={<ProtectedRoutes><Settings /></ProtectedRoutes>} />
        <Route path='/products/:id' element={<ProtectedRoutes><SingleProduct /></ProtectedRoutes>} />
        <Route path='/inventory' element={<ProtectedRoutes><Inventory /></ProtectedRoutes>} />
      </Routes>

    </main>
   
  )
}

export default AllRoutes