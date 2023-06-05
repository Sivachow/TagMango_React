import React, { useState } from "react";
import Form from "./components/Form";
import OrganizerDetails from "./OrganizerDetails";

const App = () => {
  const [organizerDetails, setOrganizerDetails] = useState(false);
  if (organizerDetails) return <OrganizerDetails />;
  return (
    <div>
      <Form />
      <button onClick={() => setOrganizerDetails(true)}>
        Open OrganizerDetails.js
      </button>
    </div>
  );
};

export default App;
