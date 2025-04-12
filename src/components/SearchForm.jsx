import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchForm() {

 const [inputs, setInputs] = useState({search: ""});
 const naviagte = useNavigate()

  const handleSearch = async(e) => {
    e.preventDefault();
    naviagte(`/search?slug=${inputs.search}`)
  };
  return (
    <form onSubmit={handleSearch} className="flex items-center gap-4">
      <input
        type="search"
        placeholder="Search Product"
        name="search"
        id="search"
        value={inputs.search || ""}
        onChange={(e) => setInputs({...inputs, search: e.target.value})}
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
  );
}
