// React and DOM rendering
import ReactDOM from "react-dom/client";

// Routing
import { BrowserRouter } from "react-router-dom";

// Main App component
import App from "./App";

// Global styles
import "./index.css";

// Find the root element and check if it exists
const container = document.getElementById("root");

if (!container) {
  // Throw an error if the root element is not found
  throw new Error("Root element not found.");
}

// Create a root and render the application
const root = ReactDOM.createRoot(container as HTMLElement);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
