import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import "./OrganizerDetails.css";

const OrganizerDetails = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileCache, setProfileCache] = useState({});

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data } = await axios.get("https://tagmango-server.onrender.com/api/profiles");
        setProfiles(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfiles();
  }, []);
  
  const fetchProfileDetails = async (profileID) => {
    try {
      if (profileCache[profileID]) {
        setSelectedProfile(profileCache[profileID]);
      } else {
        const { data } = await axios.get(
          `https://tagmango-server.onrender.com/api/persons/${profileID}`
        );
        const updatedCache = { ...profileCache, [profileID]: data };
        setProfileCache(updatedCache);
        setSelectedProfile(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewDetails = async (profile) => {
    setIsLoading(true);
    if (selectedProfile && selectedProfile._id === profile._id) {
      setSelectedProfile(null);
    } else {
      await fetchProfileDetails(profile._id);
    }
    setIsLoading(false);
  };

if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (profiles.length === 0) {
    return <div>No persons found.</div>;
  }

  return (
    <>
      <h2>Organizer Details</h2>
      {profiles.map((profile) => (
        <div key={profile._id} className="person-card">
          <div className="person-details">
            <div className="profile-picture">
              <img
                src={`data:${profile.photo.contentType};base64,${Buffer.from(
                  profile.photo.data.data
                ).toString("base64")}`}
                alt="Profile"
              />
            </div>
            <div className="person-info">
              <p>First Name: {profile.firstName}</p>
              <p>Last Name: {profile.lastName}</p>
            </div>
          </div>
          <button onClick={() => handleViewDetails(profile)}>
            {selectedProfile && selectedProfile._id === profile._id
              ? "Hide Details"
              : "View Details"}
          </button>
          {selectedProfile && selectedProfile._id === profile._id && (
            <div className="details-section">
              <h3>Selected Person Details</h3>
              <h4>Profile</h4>
              <p>Email: {selectedProfile.profile.email}</p>
              <p>Date of Birth: {selectedProfile.profile.dateOfBirth}</p>
              <p>Gender: {selectedProfile.profile.gender}</p>

              <h4>Social Media Section</h4>
              <p>Instagram Handle: {selectedProfile.socialMedia.instaHandle}</p>
              <p>Facebook Handle: {selectedProfile.socialMedia.fbHandle}</p>

              <h4>Features</h4>
              <p>Ethnicity: {selectedProfile.features.ethnicity}</p>
              <p>Height: {selectedProfile.features.height}</p>
              <p>Height Unit: {selectedProfile.features.heightUnit}</p>
              <p>Chest Size: {selectedProfile.features.chestSize}</p>
              <p>Waist Size: {selectedProfile.features.waistSize}</p>
              <p>Eye Color: {selectedProfile.features.eyeColor}</p>
              <p>Hair Color: {selectedProfile.features.hairColor}</p>
              <p>
                Atypical Features: {selectedProfile.features.atypicalFeatures}
              </p>

              <h4>Experience</h4>
              <p>Job Type: {selectedProfile.experience.jobType?.join(", ")}</p>
              <p>
                Spoken Languages:{" "}
                {selectedProfile.experience.spokenLanguages?.join(", ")}
              </p>
              <p>
                Additional Experiences:{" "}
                {selectedProfile.experience.additionalExperiences?.join(", ")}
              </p>
              <p>
                Experience Level: {selectedProfile.experience.experienceLevel}
              </p>
              <p>Details of Experiences:</p>
              <ul>
                {selectedProfile.experience.detailsOfExperiences.map(
                  (experience, index) => (
                    <li key={index}>{experience}</li>
                  )
                )}
              </ul>

              <h4>Portfolio</h4>
              <div>
                <h5>Pictures:</h5>
                {selectedProfile.portfolio.pictures.length ? (
                  <div className="picture-container">
                    {selectedProfile.portfolio.pictures.map(
                      (picture, index) => (
                        <img
                          key={index}
                          src={`data:${
                            picture.contentType
                          };base64,${Buffer.from(picture.data.data).toString(
                            "base64"
                          )}`}
                          alt={`${index + 1}`}
                        />
                      )
                    )}
                  </div>
                ) : (
                  <p>No pictures available.</p>
                )}
              </div>
              <div>
                <h5>Videos:</h5>
                {selectedProfile.portfolio.videos.length ? (
                  <div className="video-container">
                    {selectedProfile.portfolio.videos.map((video, index) => (
                      <video key={index} controls>
                        <source
                          src={`data:${video.contentType};base64,${Buffer.from(
                            video.data.data
                          ).toString("base64")}`}
                          type="video/mp4"
                        />
                      </video>
                    ))}
                  </div>
                ) : (
                  <p>No videos available.</p>
                )}
              </div>
            </div>
          )}
          <hr />
        </div>
      ))}
    </>
  );
};

export default OrganizerDetails;
