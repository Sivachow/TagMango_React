import React from "react";

const ProfileSection = ({ profile: { firstName, lastName, email, mobileNumber, gender, dateOfBirth, city, photo }, handleInputChange }) => {
  const fields = [
    { label: "First Name:", id: "firstName", type: "text", value: firstName },
    { label: "Last Name:", id: "lastName", type: "text", value: lastName },
    { label: "Email:", id: "email", type: "email", value: email },
    { label: "Mobile Number:", id: "mobileNumber", type: "tel", value: mobileNumber },
    { label: "Gender:", id: "gender", type: "select", value: gender, options: ["male", "female", "nonBinary"] },
    { label: "Date of Birth:", id: "dateOfBirth", type: "date", value: dateOfBirth },
    { label: "City:", id: "city", type: "text", value: city },
    { label: "Photo:", id: "photo", type: "file" },
  ];

  return (
    <div>
      <h2>Profile Section</h2>
      {fields.map(({ label, id, type, value, options }) => (
        <div key={id}>
          <label htmlFor={id}>{label}</label>
          {type === "select" ? (
            <select id={id} value={value} onChange={handleInputChange(id)} required>
              {options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              id={id}
              value={value}
              onChange={handleInputChange(id)}
              required
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProfileSection;
