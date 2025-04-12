import {
  Box,
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
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { InventoryContext } from "../context/InventoryContext";
import Loader from "./Loader";

export default function PayModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputs, setInputs] = useState({ paidAmount: 0 });
  const { cartProducts, createOrder, customers } = useContext(InventoryContext);

  const handleOrderCreation = () => {
    createOrder(inputs);
    onClose(); 
    window.location.reload()
  };
  
  return (
    <>
      <Button
        colorScheme="blue.500"
        className="bg-sky-950 text-white px-3 py-1 rounded"
        onClick={onOpen}
      >
        <FaCartPlus />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add To Order</ModalHeader>
          <ModalCloseButton />
          {cartProducts &&
            cartProducts.map((product) => (
              <ModalBody key={product._id} pb={6}>
                <FormControl>
                  <FormLabel>Product Name</FormLabel>
                  <Input
                    defaultValue={product.name || ""}
                    placeholder="Product Name"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Total Amount</FormLabel>
                  <Input
                    defaultValue={product.amount}
                    disabled
                    placeholder="Price"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Paid Amount</FormLabel>
                  <Input
                    value={inputs.paidAmount}
                    onChange={(e) =>
                      setInputs({ ...inputs, paidAmount: e.target.value })
                    }
                    placeholder="Price"
                  />
                </FormControl>

                <Select
                  placeholder="Customer"
                  mt={4}
                  onChange={(e) =>
                    setInputs({ ...inputs, customer: e.target.value })
                  }
                >
                  {customers.map((customer) => (
                    <option key={customer._id} value={customer._id}>
                      {customer.name}
                    </option>
                  ))}
                </Select>
              </ModalBody>
            ))}

          <ModalFooter>
            <Button
              onClick={() => handleOrderCreation()}
              bgColor={"#082f49"}
              color={"white"}
              _hover={{ bgColor: "#052033" }}
              mr={3}
            >
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
