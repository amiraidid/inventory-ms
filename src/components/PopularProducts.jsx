import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import Loader from "./Loader";
import { InventoryContext } from "../context/InventoryContext";

export default function PopularProducts() {
  
  const { popularProducts, loading } = useContext(InventoryContext);
  if (loading) return <Loader />;
  
  return (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Product Name</Th>
              <Th>Quantity Sold</Th>
              <Th>Total Sales</Th>
            </Tr>
          </Thead>
            <Tbody>
                {popularProducts.map((product) => (
                <Tr key={product._id}>
                    <Td>{product.ItemName}</Td>
                    <Td>{product.soldQuantity} pcs</Td>
                    <Td>${(product.sellingPrice * product.soldQuantity).toFixed(2)}</Td>
                </Tr>
                ))}
            </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
