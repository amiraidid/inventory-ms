import React from 'react'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Box,
  Divider,
  VStack,
  HStack,
  Badge,
  useDisclosure,
} from '@chakra-ui/react';

export default function ViewCustomerModal({ customer }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <>
        <button
          onClick={onOpen}
          className="bg-sky-900 text-gray-100 px-3 py-2 rounded-sm"
        >
          VIEW
        </button>
  
        <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Customer Orders</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <VStack align="start" spacing={4}>
                <Box>
                  <Text fontWeight="bold">Customer Name:</Text>
                  <Text>{customer.name}</Text>
                </Box>
  
                <Box>
                  <Text fontWeight="bold">Phone:</Text>
                  <Text>{customer.phone}</Text>
                </Box>
  
                <Box>
                  <Text fontWeight="bold">Address:</Text>
                  <Text>{customer.address}</Text>
                </Box>
  
                <Box>
                  <Text fontWeight="bold">Total Due:</Text>
                  <Badge colorScheme="red">${customer.dueAmount}</Badge>
                </Box>
  
                <Divider />
  
                <Text fontSize="lg" fontWeight="bold">Orders:</Text>
  
                {customer.orders?.map((order, index) => (
                  <Box
                    key={order._id || index}
                    borderWidth="1px"
                    borderRadius="lg"
                    p={4}
                    w="100%"
                  >
                    <Text fontWeight="semibold">Order Name: {order.name}</Text>
                    <HStack spacing={4} mt={2} mb={2}>
                      <Badge colorScheme="green">Total: ${order.totalAmount}</Badge>
                      <Badge colorScheme="blue">Paid: ${order.paidAmount}</Badge>
                      <Badge colorScheme="red">Due: ${order.dueAmount}</Badge>
                    </HStack>
  
                    <Text fontWeight="medium">Items:</Text>
                    <VStack align="start" spacing={2} mt={1}>
                      {order.items.map((item, idx) => (
                        <Box
                          key={item._id || idx}
                          p={2}
                          borderWidth="1px"
                          borderRadius="md"
                          w="100%"
                        >
                          <Text><strong>Product ID:</strong> {item.product}</Text>
                          <Text><strong>Selling Price:</strong> ${item.sellingPrice}</Text>
                          <Text><strong>Quantity:</strong> {item.quantity}</Text>
                        </Box>
                      ))}
                    </VStack>
  
                    <Text mt={2} fontSize="sm" color="gray.500">
                      Created At: {new Date(order.createdAt).toLocaleString()}
                    </Text>
                  </Box>
                ))}
              </VStack>
            </ModalBody>
  
            <ModalFooter>
              <Button
                bgColor="#082f49"
                color="white"
                _hover={{ bgColor: '#052033' }}
                mr={3}
              >
                Download Now
              </Button>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
}
