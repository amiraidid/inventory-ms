import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { InventoryProvider } from "./context/InventoryContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <InventoryProvider>
          <App />
        </InventoryProvider>
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
);
