import React from 'react'
import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';

export default function RecentOrders({orders}) {
    const recentOrders = orders.slice(0, 5); // Get the last 5 orders
  return (
    <div>
        <TableContainer>
            <Table variant='simple' colorScheme='gray' className='shadow-md shadow-sky-950'>
                <Thead>
                    <Tr>
                        <Th>Order-Name</Th>
                        <Th>Amount</Th>
                        <Th>Paid Amount</Th>
                        <Th>Due Amount</Th>
                    </Tr>
                </Thead>
                {
                    recentOrders.map((order) => (
                        <Tbody key={order._id}>
                            <Tr>
                                <Th>{order.name}</Th>
                                <Th>${order.totalAmount.toFixed(2)}</Th>
                                <Th>${order.paidAmount.toFixed(2)}</Th>
                                <Th>${order.dueAmount.toFixed(2)}</Th>
                            </Tr>
                        </Tbody>
                    ))
                }
                
            </Table>
        </TableContainer>
    </div>
  )
}
