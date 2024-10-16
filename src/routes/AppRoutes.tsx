import React from "react";

// Animation Libraries
import { AnimatePresence } from "framer-motion";

// Routing
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home";

/**
 * Defines and manages the application's routes.
 * @returns {JSX.Element} A component handling the app's route switching with animations.
 */
const AppRoutes: React.FC = () => {
  // Get the current route location from React Router
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
