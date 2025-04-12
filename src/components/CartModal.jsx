import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { FaCartPlus, FaEdit } from 'react-icons/fa'
import { InventoryContext } from '../context/InventoryContext';
import Loader from './Loader';

export default function CartModal({product}) {
  const { addToCart, loading } = useContext(InventoryContext);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [inputs, setInputs] = useState({quantity: 0});

  const handleAddToCart = (id) => {
    addToCart(id, inputs);
    setInputs({quantity: 0});
    onClose();
    window.location.reload();
  }

  if (loading) return <Loader />

  return (
    <>
    <Button colorScheme='blue.500' className="bg-sky-950 text-white px-3 py-1 rounded" onClick={onOpen}><FaCartPlus /></Button>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Quantity</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Product Name</FormLabel>
              <Input defaultValue={product.ItemName} placeholder='Product Name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Quantity</FormLabel>
              <Input value={inputs.quantity} onChange={(e) => setInputs({ ...inputs, quantity: e.target.value})} placeholder='Quantity' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => handleAddToCart(product._id)} bgColor={'#082f49'} color={'white'} _hover={{bgColor: '#052033'}} mr={3}>Update Quantity</Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
    </Modal>
    </>
  )
}
