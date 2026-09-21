import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

// ====================
// Mount React Application
// ====================
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* ====================
        Global Theme Provider
    ==================== */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);