import { useToast } from "@chakra-ui/react";
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const InventoryContext = createContext();

// eslint-disable-next-line react/prop-types
export const InventoryProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
   const [popularProducts, setPopularProducts] = useState([]);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem("token");
  const toast = useToast();
  const location = useLocation();

  const fetchProducts = async (category) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_URL_KEY}/api/v1/products?category=${category}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (!res.ok) {
        throw Error("Network error");
      }

      const data = await res.json();
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.log("frontend error", error.message);
      setLoading(false);
    }
  };

  const addToCart = async (id, inputs) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_URL_KEY}/api/v1/carts/add-to-cart/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(inputs),
        }
      );
      if (!res.ok) {
        throw new Error("Error");
      }
      const result = await res.json();
      setLoading(false);
      toast({
        title: "Success",
        description: result.message,
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchCartProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_URL_KEY}/api/v1/carts/get-carts`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Error");
      }

      const result = await res.json();
      setCartProducts(result.cart);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchCartProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createProduct = async (data) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_URL_KEY}/api/v1/products/create-product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) {
        throw new Error("Error");
      }
      const result = await res.json();
      setLoading(false);
      toast({
        title: "Success",
        description: result.message,
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateProduct = (inputs, id) => {
    try {
      setLoading(true);
      const res = fetch(
        `${import.meta.env.VITE_URL_KEY}/api/v1/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(inputs),
        }
      );
      if (!res.ok) {
        throw new Error("Error");
      }
      const result = res.json();
      setLoading(false);
      toast({
        title: "Success",
        description: result.message,
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAProduct = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_URL_KEY}/api/v1/products/product/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Error");
      }
      const result = await res.json();
      setProduct(result.product);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_URL_KEY}/api/v1/products/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Error");
      }
      const result = await res.json();
      console.log(result);
      setMessage(result.message);
      setLoading(false);
      toast({
        title: "Success",
        description: result.message,
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const createOrder = async (data) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_URL_KEY}/api/v1/orders/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) {
        throw new Error("Error");
      }
      const result = await res.json();
      setLoading(false);
      toast({
        title: "Success",
        description: result.message,
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_URL_KEY}/api/v1/orders/get-orders`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Error");
      }
      const result = await res.json();
      setOrders(result.orders);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getOrders();
  }, [token, location.pathname]);

  const createCustomer = (data) => {
    try {
      setLoading(true);
      const res = fetch(
        `${import.meta.env.VITE_URL_KEY}/api/v1/customers/create-customer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) {
        throw new Error("Error");
      }
      const result = res.json();
      setLoading(false);
      toast({
        title: "Success",
        description: result.message,
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateCustomer = async (id, inputs) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_URL_KEY}/api/v1/customers/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(inputs),
        }
      );
      if (!res.ok) {
        throw new Error("Error");
      }
      const result = await res.json();
      console.log(result);
      setMessage(result.message);
      setLoading(false);
      toast({
        title: "Success",
        description: result.message,
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  const removeCustomer = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_URL_KEY}/api/v1/customers/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Error");
      }
      const result = await res.json();
      console.log(result);
      setMessage(result.message);
      setLoading(false);
      toast({
        title: "Success",
        description: result.message,
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getCustomers = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_URL_KEY}/api/v1/customers`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        if (!res.ok) {
          throw new Error("Error");
        }
        const result = await res.json();
        setCustomers(result.customers);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getCustomers();
  }, [token, location.pathname]);

  // suppliers functions
  const createSupplier = (data) => {
    try {
      setLoading(true);
      const res = fetch(
        `${import.meta.env.VITE_URL_KEY}/api/v1/suppliers/create-supplier`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) {
        throw new Error("Error");
      }
      const result = res.json();
      setLoading(false);
      toast({
        title: "Success",
        description: result.message,
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getSuppliers = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_URL_KEY}/api/v1/suppliers`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        if (!res.ok) {
          throw new Error("Error");
        }
        const result = await res.json();
        setSuppliers(result.suppliers);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getSuppliers();
  }, [token, location.pathname]);

  const updateSupplier = async (id, inputs) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_URL_KEY}/api/v1/suppliers/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(inputs),
        }
      );
      if (!res.ok) {
        throw new Error("Error updating supplier");
      }
      const result =await res.json();
      setLoading(false);
      toast({
        title: "Success",
        description: result.message,
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const removeSupplier = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_URL_KEY}/api/v1/suppliers/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Error");
      }
      const result = await res.json();
      console.log(result);
      setMessage(result.message);
      setLoading(false);
      toast({
        title: "Success",
        description: result.message,
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
      const getPopularProducts = async () => {
        try {
          setLoading(true);
          const res = await fetch(
            `${import.meta.env.VITE_URL_KEY}/api/v1/products/popular-products`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
            }
          );
          if (!res.ok) {
            throw new Error("Error");
          }
          const result = await res.json();
          setPopularProducts(result.popularProducts);
          setLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      };
      getPopularProducts();
    }, []);

    useEffect(() => {
      const getUsers = async () => {
        try {
          setLoading(true);
          const res = await fetch(
            `${import.meta.env.VITE_URL_KEY}/api/v1/users`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
            }
          );
          if (!res.ok) {
            throw new Error("Error");
          }
          const result = await res.json();
          setUsers(result.users);
          setLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      };
        getUsers();
    }, [ token ]);

    const updateUser = async (id, inputs) => {
      try {
        const res = await fetch(`${import.meta.env.VITE_URL_KEY}/api/v1/users/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(inputs),
        });
        if (!res.ok) {
          throw new Error("Error");
        }
        const result = await res.json();
        console.log(result);
        setMessage(result.message);
        setLoading(false);
        toast({
            title: "Success",
            description: result.message,  
            status: "success",
            isClosable: true,
          });
      } catch (error) {
        console.log(error.message);
      }
    }

    const passwordChange = async (id, inputs) => {
      try {
        const res = await fetch(`${import.meta.env.VITE_URL_KEY}/api/v1/users/change-password/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(inputs),
        });
        if (!res.ok) {
          throw new Error("Error");
        }
        const result = await res.json();
        console.log(result);
        setMessage(result.message);
        setLoading(false);
        toast({
            title: "Success",
            description: result.message,  
            status: "success",
            isClosable: true,
          });
      } catch (error) {
        console.log(error.message);
      }
    }

    const deleteUser = async (id) => {
      try {
        const res = await fetch(`${import.meta.env.VITE_URL_KEY}/api/v1/users/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        if (!res.ok) {
          throw new Error("Error");
        }
        const result = await res.json();
        setMessage(result.message);
        setLoading(false);
        toast({
            title: "Success",
            description: result.message,  
            status: "success",
            isClosable: true,
          });
      } catch (error) {
        console.log(error.message);
      }
    }

  return (
    <InventoryContext.Provider
      value={{
        fetchProducts,
        addToCart,
        createProduct,
        removeProduct,
        updateProduct,
        getAProduct,
        createOrder,
        createCustomer,
        updateCustomer,
        removeCustomer,
        createSupplier,
        updateSupplier,
        removeSupplier,
        updateUser,
        passwordChange,
        deleteUser,
        product,
        cartProducts,
        orders,
        customers,
        popularProducts,
        users,
        message,
        products,
        suppliers,
        setProducts,
        loading,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};
