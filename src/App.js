import React, { useState } from "react";
import Form from "./components/Form";
import OrganizerDetails from "./OrganizerDetails";
import "./App.css";

const App = () => {
  const [organizerDetails, setOrganizerDetails] = useState(false);

  if (organizerDetails) return <OrganizerDetails />;

  return (
    <div>
      <Form />
      <button
        className="button" // Add the class name for styling
        onClick={() => setOrganizerDetails(true)}
      >
        Open OrganizerDetails.js
      </button>
    </div>
  );
};

export default App;
