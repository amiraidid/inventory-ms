import { useState } from "react";
import { FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";


function Login() {


  const [inputs, setInputs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast()
  const navigate = useNavigate()
  
  const LoginFunc = async(e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_URL_KEY}/api/v1/auth/login`, {
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
      navigate('/')
      window.location.reload()
      toast({title: 'login Successfully', description: 'You are now logged in', status: 'success', isClosable: true})
    } catch (error) {
      setLoading(true)
      setError(error);
      toast({title: 'Error', description: error.message, status: 'error', isClosable: true})
    }
  }

  if (loading) return <Loader />
  if(error) return <div className="text-center">{error.message}</div>

  return (
    <div className="w-2/4 max-sm:w-3/4 max-md:w-2/3 mx-auto">
      <h1 className="text-3xl max-sm:text-xl text-center my-10">
        Welcome Again
        <br /> Login Now
      </h1>
      <form onSubmit={LoginFunc} className="flex flex-col justify-center">
        <FormControl className="mb-4" isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input type="email" id='email' placeholder="Your email" value={inputs.email || ""} onChange={(e) => setInputs({...inputs, email: e.target.value})}/>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input type="password" id='password' placeholder="Your Password" value={inputs.password || ""} onChange={(e) => setInputs({...inputs, password: e.target.value})}/>
        </FormControl>
        {/* <Link to={'/forget-password'} className="text-sky-950 flex justify-end my-3 underline">Forgot Password</Link> */}
       <button type="submit" className="bg-sky-950 text-white py-2 mt-4 text-2xl rounded-lg">Login</button>
      </form>
    </div>
  );
}

export default Login;
