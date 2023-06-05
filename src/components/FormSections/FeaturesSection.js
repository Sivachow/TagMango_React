import React from "react";

const FeaturesSection = ({ features, handleInputChange }) => {
  const handleSliderChange = (inputName) => (e) => {
    handleInputChange(inputName)(e);
  };

  const handleHeightUnitChange = (e) => {
    handleInputChange("heightUnit")({ target: { name: "heightUnit", value: e.target.value } });
  };

  const renderHeightSlider = () => {
    const heightUnitOptions = {
      cm: { label: "cm", min: 90, max: 200, step: 0.5 },
      feet: { label: "feet", min: 2, max: 8, step: 0.1 }
    };

    const { label, min, max, step } = heightUnitOptions[features.heightUnit];

    return (
      <>
        <input
          type="range"
          name="height"
          min={min}
          max={max}
          step={step}
          value={features.height}
          onChange={handleSliderChange("height")}
          required
        />
        <span>{features.height} {label}</span>
      </>
    );
  };

  const renderSelectOptions = (name, options) => (
    <>
      <option value="" disabled hidden>{`Select ${name}`}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </>
  );

  return (
    <div>
      <h2>Features</h2>
      <label>
        Ethnicity:
        <select name="ethnicity" value={features.ethnicity} onChange={handleInputChange("ethnicity")} required>
          {renderSelectOptions("Ethnicity", ["Asian", "South Asian"])}
        </select>
      </label>
      <br />
      <label>
        Height: {renderHeightSlider()}
      </label>
      <br />
      <label>
        Height Unit:
        <select name="heightUnit" value={features.heightUnit} onChange={handleHeightUnitChange} required>
          {renderSelectOptions("Height Unit", ["cm", "feet"])}
        </select>
      </label>
      <br />
      <label>
        Chest Size: {features.chestSize} cm
        <input type="range" name="chestSize" min="0" max="200" value={features.chestSize} onChange={handleSliderChange("chestSize")} required />
      </label>
      <br />
      <label>
        Waist Size: {features.waistSize} cm
        <input type="range" name="waistSize" min="0" max="200" value={features.waistSize} onChange={handleSliderChange("waistSize")} required />
      </label>
      <br />
      <label>
        Eye Color:
        <select name="eyeColor" value={features.eyeColor} onChange={handleInputChange("eyeColor")} required>
          {renderSelectOptions("Eye Color", ["Brown", "Black", "Gray"])}
        </select>
      </label>
      <br />
      <label>
        Hair Color:
        <select name="hairColor" value={features.hairColor} onChange={handleInputChange("hairColor")} required>
          {renderSelectOptions("Hair Color", ["Brown", "Black", "Gray", "White", "Other"])}
        </select>
      </label>
      <br />
      <label>
        Atypical Features:
        <select name="atypicalFeatures" value={features.atypicalFeatures} onChange={handleInputChange("atypicalFeatures")} required>
          {renderSelectOptions("Atypical Features", ["Tattoo", "Scars", "Freckles"])}
        </select>
      </label>
      <br />
    </div>
  );
};

export default FeaturesSection;
