import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../components/Loader";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FaCartPlus, FaTrash } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import AddProductModal from "../components/AddProductModal";
import CartModal from "../components/CartModal";

export default function SearchItem() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({ search: "" });
  const [products, setProducts] = useState([]);
  const token = sessionStorage.getItem("token");
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get("slug");
  const decodedToken = token ? jwtDecode(token) : null;
    const { role } = decodedToken || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${
            import.meta.env.VITE_URL_KEY
          }/api/v1/products/search?slug=${searchValue.replace(/\s+/g, "-")}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        const data = await res.json();
        setProducts(data.products);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(true);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();
  const handleSearch = async (e) => {
    e.preventDefault();
    navigate(`/search?slug=${inputs.search}`);
    window.location.reload();
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="flex justify-between items-center text-white p-4">
        <h1 className="text-2xl font-bold text-sky-950 px-4 py-2">
          Search Result for "{searchValue}"
        </h1>
        <form onSubmit={handleSearch} className="flex items-center gap-4">
          <input
            type="search"
            placeholder="Search Product"
            name="search"
            id="search"
            value={inputs.search || ""}
            onChange={(e) => setInputs({ ...inputs, search: e.target.value })}
            className="px-3 py-2 rounded-md outline-none text-black border border-sky-950 w-96"
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

      <div className="shadow-md shadow-sky-950 p-5  h-fit overflow-hidden overflow-y-scroll">
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Category</Th>
                <Th>Price</Th>
                <Th>Quantity</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>

            <Tbody>
              {products ? (
                products.map((product) => (
                  <Tr key={product._id}>
                    <Td><Link to={`/products/${product._id}`}>{product.ItemName}</Link></Td>
                    <Td>{product.category}</Td>
                    <Td>${product.sellingPrice}</Td>
                    <Td>{product.status}</Td>
                    <Td>
                      {product.quantity} {product.unit}
                    </Td>
                    <Td className="flex gap-2">
                      {role === "admin" ? (
                        <>
                          <CartModal product={product} />
                          <button
                            onClick={() => removeProduct(product._id)}
                            className="bg-red-950 text-white px-3 py-1 rounded"
                          >
                            <FaTrash />
                          </button>
                          <AddProductModal product={product} type="edit" />
                        </>
                      ) : (
                        <div>
                          <CartModal product={product} />
                        </div>
                      )}
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={6} className="text-center">
                    No products found
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
