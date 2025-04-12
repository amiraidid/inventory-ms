import React, { useContext, useEffect } from "react";
import { Box, Grid, HStack, Text,  GridItem} from "@chakra-ui/react";
import {
  FaArrowCircleUp,
  FaCartPlus,
  FaCheck,
  FaStar,
} from "react-icons/fa";
import SearchForm from "../components/SearchForm";
import SalesGraph from "../components/SalesGraph";
import { InventoryContext } from "../context/InventoryContext";
import PopularProducts from "../components/PopularProducts";
import RecentOrders from "../components/RecentOrders";
import PopularChart from "../components/PopularChart";

export const Cards = ({ icon, title, value, bgcolor }) => {
  return (
    <Box
      bg={`${bgcolor}`}
      className="shadow-md shadow-sky-950 p-5 w-full rounded-md"
    >
      <HStack>
        {icon}
        <Text className="text-gray-950">{title}</Text>
      </HStack>
      <Text fontSize="2xl" fontWeight="bold">
        {value}
      </Text>
    </Box>
  );
};


function Dashboard() {
  const { orders, suppliers, fetchProducts, products } = useContext(InventoryContext);
  const totalSales = orders.reduce((acc, order) => acc + order.totalAmount, 0);
  const supplierCount = suppliers.length;

  useEffect(() => {
    fetchProducts('');
  }, []);
  
  const inStockProducts = products?.reduce(
    (acc, product) => acc + product.quantity,
    0
  );
  
  

  return (
    <div className="">
      <div className="flex justify-between items-center ">
        <h1 className="text-2xl font-bold text-sky-950 px-4 pb-2">
          Inventory Management Dashboard
        </h1>
        <SearchForm  />
      </div>

      <div className="flex justify-start items-center gap-5 p-4 ">
        <Cards
          icon={<FaArrowCircleUp className="text-green-600" />}
          title="Total Sales"
          bgcolor="green.50"
          value={`$${totalSales.toFixed(2)}`}
        />
        <Cards
          icon={<FaCheck className="text-Blue-600" />}
          title="In-Stock Products"
          bgcolor="blue.10"
          value={inStockProducts}
        />
        <Cards
          icon={<FaStar className="text-yellow-600" />}
          title="Supplier Count"
          bgcolor="yellow.50"
          value={supplierCount}
        />
        <Cards
          icon={<FaCartPlus className="text-red-600" />}
          title="Total Orders"
          bgcolor="red.50"
          value={orders.length}
        />
      </div>
      <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={1} p={1}>
        <GridItem w="100%" h="350"  className="shadow-md  p-5 rounded-md">
          <SalesGraph />
        </GridItem>
        <GridItem w="100%" h="350" className="shadow-md shadow-sky-950 p-5 rounded-md">
          <PopularProducts />
        </GridItem>

        <GridItem w="100%" h="350" className="shadow-md shadow-sky-950 p-5 rounded-md">
          <RecentOrders orders={orders}/>
        </GridItem>

        <GridItem w="100%" h="350"  className="shadow-md  p-5 rounded-md">
          <PopularChart />
        </GridItem>
      </Grid>
    </div>
  );
}

export default Dashboard;
