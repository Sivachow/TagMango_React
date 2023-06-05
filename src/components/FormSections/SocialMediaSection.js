import React from "react";

const SocialMediaSection = ({ socialMedia, handleInputChange }) => {
  const { instaHandle, fbHandle } = socialMedia;

  return (
    <div>
      <h2>Social Media Section</h2>
      <div>
        <label htmlFor="instaHandle">Instagram Handle:</label>
        <input
          type="text"
          id="instaHandle"
          value={instaHandle}
          onChange={handleInputChange("instaHandle")}
          required
        />
      </div>
      <div>
        <label htmlFor="fbHandle">Facebook Handle:</label>
        <input
          type="text"
          id="fbHandle"
          value={fbHandle}
          onChange={handleInputChange("fbHandle")}
          required
        />
      </div>
    </div>
  );
};

export default SocialMediaSection;
