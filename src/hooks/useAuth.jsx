import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";

function useAuth(url, title, description) {
 
    const [inputs, setInputs] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const toast = useToast()
    const location = useLocation()
    const navigate = useNavigate()


    const userAuth = async (e) => {
        e.preventDefault();
        try {
          setLoading(true);
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(inputs),
          });
    
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
    
          const data = await response.json();
          setInputs(data);
          setLoading(false);
          sessionStorage.setItem("token", data.token);
          // if (location.pathname === "/login-page") {
          //   navigate("/");
          // } else {
          //   navigate("/login-page");
          // }
          toast({title: title, description: description, status: 'success', isClosable: true})
        } catch (error) {
          setLoading(true)
          setError(error);
          toast({title: 'Error', description: error.message, status: 'error', isClosable: true})
        }
      };
  return {userAuth, loading, error, inputs, setInputs}
}

export default useAuth