import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../../../actions/profileActions";
import "../../../styles/Profile.scss";
import OrderHistory from "./OrderHistory";

const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.userProfile);
  const authState = useSelector((state) => state.auth);
  const [details, setDetails] = useState({
    email: authState.email || "",
    name: "",
    phone: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(
      fetchUserProfile((response) => {
        if (!response.error) {
          setDetails(response.data);
        }
      })
    );
  }, [dispatch]);

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile(details, (response) => {
        if (response.error) {
          alert("Failed to update profile");
        } else {
          alert("Profile updated successfully");
          setIsEditing(false); // Hide the form and show profile details
        }
      })
    );
  };

  return (
    <div>
      <div className="profile-container">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <h1 className="profile-title">User Profile</h1>
            <div className="form-group">
              <label>Name: </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={details.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email: </label>
              <input type="email" name="email" value={details.email} readOnly />
            </div>
            <div className="form-group">
              <label>Phone: </label>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={details.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Address: </label>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={details.address}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Save</button>
          </form>
        ) : (
          <div className="profile-details">
            <h2 className="profile-title">Profile Details</h2>
            <div className="profile-content">
              <div className="details-row">
                <div className="details-item">
                  <label className="details-label">Name:</label>
                  <span className="details-value">{details.name}</span>
                </div>
                <div className="details-item">
                  <label className="details-label">Email:</label>
                  <span className="details-value">{details.email}</span>
                </div>
                <div className="details-item">
                  <label className="details-label">Phone:</label>
                  <span className="details-value">{details.phone}</span>
                </div>
                <div className="details-item">
                  <label className="details-label">Address:</label>
                  <span className="details-value">{details.address}</span>
                </div>
              </div>
            </div>
            <div className="button-container">
              <button
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                Edit Details
              </button>{" "}
            </div>
          </div>
        )}
      </div>
      <OrderHistory />
    </div>
  );
};

export default Profile;
