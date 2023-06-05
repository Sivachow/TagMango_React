import React from "react";

const PortfolioSection = ({ portfolio, handleInputChange }) => {
  const handlePictureInputChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length <= 10) {
      handleInputChange("pictures")(files);
    } else {
      alert("Please select up to 5 pictures.");
    }
  };

  const handleVideoInputChange = (e) => {
    const files = Array.from(e.target.files);
    const allowedSize = 15 * 1024 * 1024; // 15 MB

    // Check if each video is within size limit
    const validVideos = files.filter((file) => file.size <= allowedSize);

    if (validVideos.length === files.length) {
      handleInputChange("videos")(validVideos);
    } else {
      // Handle error: invalid video size
      alert("Please select videos within 15 MB size limit.");
    }
  };

  return (
    <div>
      <h2>Portfolio</h2>
      <div>
        <label htmlFor="pictures">Pictures:</label>
        <input
          type="file"
          id="pictures"
          name="pictures"
          accept="image/*"
          multiple
          required
          onChange={handlePictureInputChange}
        />
      </div>
      <div>
        <label htmlFor="videos">Videos (max 15 MB):</label>
        <input
          type="file"
          id="videos"
          name="videos"
          accept="video/*"
          multiple
          onChange={handleVideoInputChange}
        />
      </div>
    </div>
  );
};

export default PortfolioSection;
