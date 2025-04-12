import React, { useContext, useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  Box,
  Divider,
  VStack,
  HStack,
  Badge,
} from '@chakra-ui/react';

export default function ViewModal({ order }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
 
  return (
    <>
      <button
        onClick={onOpen}
        className="bg-sky-900 text-gray-100 px-6 py-2 rounded-sm"
      >
        VIEW
      </button>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack align="start" spacing={3}>
              <Text fontWeight="bold">Order Name:</Text>
              <Text>{order.name}</Text>

              <Text fontWeight="bold">Customer ID:</Text>
              <Text>{order.customer && order.customer.name }</Text>

              <HStack spacing={4}>
                <Badge colorScheme="green">Total: ${order.totalAmount}</Badge>
                <Badge colorScheme="blue">Paid: ${order.paidAmount}</Badge>
                <Badge colorScheme="red">Due: ${order.dueAmount}</Badge>
              </HStack>

              <Divider />

              <Text fontWeight="bold" mt={2}>Items:</Text>
              {order.items?.map((item, idx) => (
                <Box key={idx} p={3} borderWidth="1px" borderRadius="md" w="100%">
                  <Text><strong>Product ID:</strong> {item.product}</Text>
                  <Text><strong>Quantity:</strong> {item.quantity}</Text>
                  <Text><strong>Purchase Price:</strong> ${item.purchasePrice}</Text>
                  <Text><strong>Selling Price:</strong> ${item.sellingPrice}</Text>
                </Box>
              ))}

              <Divider />

              <Text fontSize="sm" color="gray.500">
                Created At: {new Date(order.createdAt).toLocaleString()}
              </Text>
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
