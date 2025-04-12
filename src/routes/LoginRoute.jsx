import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../pages";

export default function LoginRoute() {
  return (
    <main>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  );
}
