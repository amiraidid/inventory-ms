import React, { useContext, useState } from "react";
import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { InventoryContext } from "../context/InventoryContext";
import { jwtDecode } from "jwt-decode";
import { FaTrash } from "react-icons/fa";
import ViewCustomerModal from "../components/ViewCustomerModal";
import CustomerModal from "../components/CustomerModal";

function Customers() {

  const { customers, removeCustomer } = useContext(InventoryContext);
  const [inputs, setInputs] = useState({ search: "" });
  const token = sessionStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const { role } = decodedToken || {};


  return (
    <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-center">Customer List</h1>
            <form className="flex items-center gap-4">
              <input
                type="search"
                placeholder="Search Customer"
                name="search"
                id="search"
                value={inputs.search || ""}
                onChange={(e) => setInputs({ ...inputs, search: e.target.value })}
                className="px-3 py-2 rounded-md outline-none border border-sky-950 w-96"
              />
              <button
                type="submit"
                disabled={inputs.search === ""}
                className="bg-sky-950 text-white px-3 py-2 rounded-md"
              >
                Search
              </button>
            </form>
          </div>
          {
            role === "admin" && (
              <CustomerModal type="add" />
          )}
        
          <div className="shadow-md shadow-sky-950 h-[75vh] overflow-y-scroll my-5">
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Phone</Th>
                    <Th>Address</Th>
                    <Th>Due Amount</Th>
                    {
                      role === "admin" && (
                        <Th>Actions</Th>
                      )
                    }
                  </Tr>
                </Thead>
                <Tbody>
                  {customers &&
                    customers.map((customer) => (
                      <Tr key={customer._id}>
                        <Th>{customer.name}</Th>
                        <Th>{customer.phone}</Th>
                        <Th>{customer.address}</Th>
                        <Th>${customer.dueAmount}</Th>
                        
                        {
                          role === "admin" ? (
                            <Th className="flex gap-2">
                              <ViewCustomerModal customer={customer} />
                              <CustomerModal type="update" customer={customer} />
                              <button
                                onClick={() => removeCustomer(customer._id)}
                                className="text-red-600 bg-gray-200 p-4 rounded-md"
                              >
                                <FaTrash />
                              </button>
                              
                            </Th>
                          ): <Th>
                          <ViewCustomerModal customer={customer} />
                          </Th>
                        }
                        
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        </div>
  )
}

export default Customers