import React, { useCallback } from "react";

const ExperienceSection = ({ experience, handleInputChange }) => {
  const {
    jobType,
    spokenLanguages,
    additionalExperiences,
    experienceLevel,
    detailsOfExperiences,
  } = experience;

  const handleCheckboxChange = useCallback((name, value) => {
    const updatedValues = experience[name].includes(value)
      ? experience[name].filter((val) => val !== value)
      : [...experience[name], value];
    handleInputChange(name)(updatedValues);
  }, [experience, handleInputChange]);

  const handleExperienceLevelChange = useCallback((e) => {
    handleInputChange("experienceLevel")(e.target.value);
  }, [handleInputChange]);

  const handleDetailsChange = useCallback((index, value) => {
    const updatedDetails = [...detailsOfExperiences];
    updatedDetails[index] = value;
    handleInputChange("detailsOfExperiences")(updatedDetails);
  }, [detailsOfExperiences, handleInputChange]);

  const handleAddExperience = useCallback(() => {
    const updatedDetails = [...detailsOfExperiences, ""];
    handleInputChange("detailsOfExperiences")(updatedDetails);
  }, [detailsOfExperiences, handleInputChange]);

  const handleRemoveExperience = useCallback((index) => {
    const updatedDetails = [...detailsOfExperiences];
    updatedDetails.splice(index, 1);
    handleInputChange("detailsOfExperiences")(updatedDetails);
  }, [detailsOfExperiences, handleInputChange]);

  const Checkbox = ({ name, value, checked }) => (
    <label>
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={() => handleCheckboxChange(name, value)}
      />
      {value}
    </label>
  );

  return (
    <div>
      <div>
        <label>Job Type:</label>
        <div>
          {["Ads", "Movies", "Still shoots", "Fashion shows"].map((value) => (
            <Checkbox
              key={value}
              name="jobType"
              value={value}
              checked={jobType.includes(value)}
            />
          ))}
        </div>
      </div>
      <div>
        <label>Spoken Languages:</label>
        <div>
          {["English", "Hindi", "Tamil", "Telugu"].map((value) => (
            <Checkbox
              key={value}
              name="spokenLanguages"
              value={value}
              checked={spokenLanguages.includes(value)}
            />
          ))}
        </div>
      </div>
      <div>
        <label>Additional Experiences:</label>
        <div>
          {["Sports", "Musical Instruments"].map((value) => (
            <Checkbox
              key={value}
              name="additionalExperiences"
              value={value}
              checked={additionalExperiences.includes(value)}
            />
          ))}
        </div>
      </div>
      <div>
        <label>Experience Level:</label>
        <select value={experienceLevel} onChange={handleExperienceLevelChange} required>
          <option value="">Select Experience Level</option>
          {["No Exp", "Some Exp", "Very Exp"].map((value) => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Details of Experiences:</label>
        {detailsOfExperiences.map((experience, index) => (
          <div key={index}>
            <input
              type="text"
              value={experience}
              onChange={(e) => handleDetailsChange(index, e.target.value)}
              required
            />
            <button type="button" onClick={() => handleRemoveExperience(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddExperience}>
          Add Experience
        </button>
      </div>
    </div>
  );
};

export default ExperienceSection;
