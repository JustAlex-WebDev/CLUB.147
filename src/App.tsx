import React from "react";

// Context and Providers
import { ContextProviders } from "./context/ContextProviders";

// Components
import Cursor from "./components/Cursor";

// Routing
import AppRoutes from "./routes/AppRoutes";

/**
 * Main application component.
 * @returns {JSX.Element} The main structure of the application.
 */
const App: React.FC = () => (
  <ContextProviders>
    {/* Custom cursor */}
    <Cursor />

    {/* Routing */}
    <AppRoutes />
  </ContextProviders>
);

export default App;
