import React, { useContext, useEffect } from "react";
import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
} from "@chakra-ui/react";
import { InventoryContext } from "../context/InventoryContext";
import Loader from "../components/Loader";
import ViewModal from "../components/ViewModal";

function Orders() {

  const { orders, loading } = useContext(InventoryContext);
  if (loading) return <Loader />
  
  return (
    <>
      <h1 className="text-3xl font-bold my-3">Orders</h1>
  
      <div className="shadow-md shadow-sky-950 p-5  h-[85vh] overflow-hidden overflow-y-scroll">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>OrderId</Th>
                <Th>Order-Name</Th>
                <Th>Order-Item</Th>
                <Th>Amount</Th>
                <Th>Paid Amount</Th>
                <Th>Due Amount</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            {orders && (
              <Tbody>
                {orders.map((order, idx) => (
                  <Tr key={order._id}>
                    <Th>{idx}</Th>
                    <Th>{order.name}</Th>
                    <Th>{order.items.length} PCS</Th>
                    <Th>${order.totalAmount}</Th>
                    <Th>${order.paidAmount}</Th>
                    <Th>${order.dueAmount}</Th>
                    <Th>
                      <ViewModal order={order} />
                    </Th>
                  </Tr>
                ))}
              </Tbody>
            )}
          </Table>
        </TableContainer>
      </div>
      
    </>
  );
}

export default Orders;
