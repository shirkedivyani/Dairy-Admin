import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import { UserProvider } from "./context/UserContext";
import "../public/css/tailwind.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <UserProvider>
        <BrowserRouter>
          <ThemeProvider>
            <MaterialTailwindControllerProvider>
              <App />
            </MaterialTailwindControllerProvider>
          </ThemeProvider>
        </BrowserRouter>
      </UserProvider>
  </React.StrictMode>
);
