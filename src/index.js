import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import OrganizerDetails from "./OrganizerDetails";
import Image from "./Image";

createRoot(document.getElementById("root")).render(
 <React.StrictMode>
 <BrowserRouter>
 <Routes>
 <Route path="/" element={<App />} />
 <Route path="/organizer-details" element={<OrganizerDetails />} />
 </Routes>
 </BrowserRouter>
 </React.StrictMode>
);
