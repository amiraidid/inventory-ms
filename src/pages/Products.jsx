import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import {
  TableContainer,
  Table,
  Center,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Select,
} from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";
import Loader from "../components/Loader";
import { InventoryContext } from "../context/InventoryContext";
import CartModal from "../components/CartModal";
import { handleFilterFunc } from "../utils/utils";
import AddProductModal from "../components/AddProductModal";

function Products() {
  const [category, setCategory] = useState("");
  const [inputs, setInputs] = useState({ search: "" });
  const [priceFilter, setPriceFilter] = useState();
  const { removeProduct, products, loading, fetchProducts } =
    useContext(InventoryContext);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const decodedToken = token ? jwtDecode(token) : null;
  const { role } = decodedToken || {};

  const handleSearch = async (e) => {
    e.preventDefault();
    navigate(`/search?slug=${inputs.search}`);
  };

  useEffect(() => {
    fetchProducts(category);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, priceFilter]);

  const categories = useMemo(() => {
    if (!products || products.length === 0) return [];
    return [...new Set(products.map((product) => product.category))];
  }, [products]);



  const handleFilterOptions = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setPriceFilter(value);
    const filteredProducts = handleFilterFunc(value, products);
    return filteredProducts;
  };

  if (loading) return <Loader />;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center my-3 ">
        <h1 className="text-2xl font-bold text-sky-950 px-4 pb-2">
          Product List
        </h1>
        <form onSubmit={handleSearch} className="flex items-center gap-4">
          <input
            type="search"
            placeholder="Search Product"
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

      <div
        className={`flex ${
          role === "admin" ? "justify-between" : "justify-end"
        } items-center my-3 gap-3 `}
      >
        <div className="flex gap-3">
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Categories"
            w="200px"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
          <Select
            onChange={handleFilterOptions}
            placeholder="Filter By Price"
            w="200px"
          >
            <option value="low-to-high">Low to High</option>
            <option value="high-to-low">High to Low</option>
          </Select>
        </div>
        {role === "admin" && <AddProductModal />}
      </div>

      <div className="shadow-md shadow-sky-950 p-5 h-[75vh] overflow-hidden overflow-y-scroll">
        <TableContainer>
          {products && products.length > 0 ? (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Category</Th>
                  <Th>Price</Th>
                  <Th>Quantity</Th>
                  <Th>Supplier</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.map((product) => (
                  <Tr key={product._id}>
                    <Td>
                      <Link to={`/products/${product._id}`}>
                        {product.ItemName}
                      </Link>
                    </Td>
                    <Td>{product.category}</Td>
                    <Td>${product.sellingPrice}</Td>
                    <Td>{product.quantity}</Td>
                    <Td>{product.supplier.supplierName}</Td>
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
                ))}
              </Tbody>
            </Table>
          ) : (
            <Center>No products</Center>
          )}
        </TableContainer>
      </div>
    </div>
  );
}

export default Products;
