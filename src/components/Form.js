import React, { useState } from "react";
import axios from "axios";
import ProfileSection from "./FormSections/ProfileSection";
import SocialMediaSection from "./FormSections/SocialMediaSection";
import FeaturesSection from "./FormSections/FeaturesSection";
import ExperienceSection from "./FormSections/ExperienceSection";
import PortfolioSection from "./FormSections/PortfolioSection";
import FormSubmitted from "./FormSubmitted";
import "./Form.css";

const Form = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    gender: "",
    dateOfBirth: "",
    city: "",
    photo: null,
  });

  const [socialMedia, setSocialMedia] = useState({
    instaHandle: "",
    fbHandle: "",
  });

  const [features, setFeatures] = useState({
    ethnicity: "",
    height: 0,
    heightUnit: "cm",
    chestSize: 0,
    waistSize: 0,
    eyeColor: "",
    hairColor: "",
    atypicalFeatures: "",
  });

  const [experience, setExperience] = useState({
    jobType: [],
    spokenLanguages: [],
    additionalExperiences: [],
    experienceLevel: "",
    detailsOfExperiences: [],
  });

  const [portfolio, setPortfolio] = useState({
    pictures: [],
    videos: [],
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleProfileInputChange = (inputName) => (e) => {
    if (inputName === "photo") {
      setProfile({ ...profile, [inputName]: e.target.files[0] });
    } else {
      setProfile({ ...profile, [inputName]: e.target.value });
    }
  };

  const handleSocialMediaInputChange = (inputName) => (e) => {
    setSocialMedia({ ...socialMedia, [inputName]: e.target.value });
  };

  const handleFeaturesInputChange = (inputName) => (e) => {
    setFeatures({ ...features, [inputName]: e.target.value });
  };

  const handleExperienceInputChange = (inputName) => (value) => {
    setExperience({ ...experience, [inputName]: value });
  };

  const handlePortfolioInputChange = (inputName) => (e) => {
    if (inputName === "pictures" || inputName === "videos") {
      const files = e;
      setPortfolio({ ...portfolio, [inputName]: files });
    } else {
      setPortfolio({ ...portfolio, [inputName]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(profile).forEach((key) => {
      formData.append(key, profile[key]);
    });
    Object.keys(socialMedia).forEach((key) => {
      formData.append(key, socialMedia[key]);
    });
    Object.keys(features).forEach((key) => {
      formData.append(key, features[key]);
    });
    Object.keys(experience).forEach((key) => {
      if (Array.isArray(experience[key])) {
        experience[key].forEach((item) => {
          formData.append(`${key}[]`, item);
        });
      } else {
        formData.append(key, experience[key]);
      }
    });
    Object.keys(portfolio).forEach((key) => {
      if (Array.isArray(portfolio[key])) {
        portfolio[key].forEach((item) => {
          console.log(`${key}`);
          formData.append(`${key}`, item);
        });
      } else {
        formData.append(key, portfolio[key]);
      }
    });

    axios
      .post("http://localhost:4000/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }, (res)=>setFormSubmitted(true));
      ;
  };

  if (formSubmitted) {
    return <FormSubmitted />;
  }

  return (
    <div className="form-container">
      <h1>Submit Form</h1>
      <form className="form" onSubmit={handleSubmit}>
        <ProfileSection
          profile={profile}
          handleInputChange={handleProfileInputChange}
        />
        <SocialMediaSection
          socialMedia={socialMedia}
          handleInputChange={handleSocialMediaInputChange}
        />
        <FeaturesSection
          features={features}
          handleInputChange={handleFeaturesInputChange}
        />
        <ExperienceSection
          experience={experience}
          handleInputChange={handleExperienceInputChange}
        />
        <PortfolioSection
          portfolio={portfolio}
          handleInputChange={handlePortfolioInputChange}
        />
        <button className="submit-button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
