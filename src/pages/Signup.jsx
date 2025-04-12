import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";

function Signup() {
  const [inputs, setInputs] = useState({});

  const { userAuth, loading } = useAuth(`${import.meta.env.VITE_URL_KEY}/api/v1/auth/signup`, 'Signup Successfully', "You are now logged in")

  if (loading) return <div className="text-center">loading...</div>

  return (
    <div className="w-2/4 max-sm:w-3/4 max-md:w-2/3 mx-auto my-5">
      <h1 className="text-3xl text-center my-10">
        Create Your Account
      </h1>
      <form action="" onSubmit={userAuth} className="flex flex-col justify-center">
        <FormControl className="mb-4">
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input type="text" id='name' placeholder="Your name" value={inputs.name} onChange={(e) => setInputs({...inputs, name: e.target.value})}/>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input type="email" id='email' placeholder="Your email" value={inputs.email || ""} onChange={(e) => setInputs({...inputs, email: e.target.value})}/>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input type="password" id='password' placeholder="Your Password" value={inputs.password} onChange={(e) => setInputs({...inputs, password: e.target.value})}/>
        </FormControl>
        <input type="file" accept="image/*" className="mb-4"/>
        <button type="submit" className=" text-sky-50 border bg-sky-950 py-2 mt-4 text-2xl rounded-lg">Create Now</button>
      </form>
    </div>
  );
}

export default Signup;
