import React, { useContext, useState } from "react";
import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { InventoryContext } from "../context/InventoryContext";
import { jwtDecode } from "jwt-decode";
import { FaTrash } from "react-icons/fa";
import SupplierModal from "../components/SupplierModal";

function Suppliers() {
  const { suppliers, removeSupplier } = useContext(InventoryContext);
  const [inputs, setInputs] = useState({ search: "" });
  const token = sessionStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const { role } = decodedToken || {};

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-center">Supplier List</h1>
        <form className="flex items-center gap-4">
          <input
            type="search"
            placeholder="Search Supplier"
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
          <SupplierModal type="add" />
      )}
    
      <div className="shadow-md shadow-sky-950 h-[75vh] overflow-x-hidden overflow-y-scroll my-5">
        <TableContainer >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Address</Th>
                {
                  role === "admin" && (
                    <Th>Actions</Th>
                  )
                }
              </Tr>
            </Thead>
            <Tbody>
              {suppliers &&
                suppliers.map((supplier) => (
                  <Tr key={supplier._id}>
                    <Th fontSize={'0.65rem'}>{supplier.supplierName}</Th>
                    <Th fontSize={'0.65rem'}>{supplier.email}</Th>
                    <Th fontSize={'0.65rem'}>{supplier.phone}</Th>
                    <Th fontSize={'0.65rem'}>{supplier.address}</Th>
                    {
                      role === "admin" ? (
                        <Th className="flex gap-2">
                          <SupplierModal type="update" supplier={supplier} />
                          <button
                            onClick={() => removeSupplier(supplier._id)}
                            className="text-red-600 bg-gray-200 p-4 rounded-md"
                          >
                            <FaTrash />
                          </button>
                        </Th>
                      ): null
                    }
                    
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Suppliers;
