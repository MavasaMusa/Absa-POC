import React, { useState } from "react";
import Navbar from "../../navbar/navbar";
import Swal from "sweetalert2";
import axios from "axios";

const UpdateContact = () => {
  const [EmailAddress, setEmailAddress] = useState("");
  const [NewEmailAddress, setNewEmailAddress] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");

  const handleUpdate = async () => {
    if (!EmailAddress || !NewEmailAddress || !PhoneNumber) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill in all fields.",
      });
      return;
    }

    try {
      // Directly send the update request without 'Access-Control-Allow-Origin' header
      const updateResponse = await fetch(
        "https://1x37ujrs43.execute-api.us-east-1.amazonaws.com/Update/Update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            EmailAddress,
            NewEmailAddress,
            PhoneNumber,
          }),
        }
      );

      if (updateResponse.ok) {
        Swal.fire({
          icon: "success",
          title: "Update Successful",
          text: "Your contact details have been updated successfully!",
        });

        setEmailAddress("");
        setNewEmailAddress("");
        setPhoneNumber("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: `Failed to update your contact details: ${updateResponse.statusText}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `An error occurred: ${error.message}`,
      });
    }
  };

  const isActive = (path) => window.location.pathname === path;

  return (
    <>
      <Navbar />
      <div className="sidebar">
        <h3>Menu</h3>
        <ul>
          <li>
            <a href="/balances">Balance</a>
          </li>
          <div className="divider"></div>
          <li>
            <a href="/statements">Statements</a>
          </li>
          <div className="divider"></div>
          <li className={isActive("/update") ? "active" : ""}>
            <a href="/update">Update Contact Details</a>
          </li>
          <div className="divider"></div>
          <li>Issuing or Replace Card</li>
          <div className="divider"></div>
          <li>Debit Order Reversal</li>
          <div className="divider"></div>
          <li>Personal Loans</li>
        </ul>
      </div>

      <div className="content">
        <div className="box-container">
          <div className="update-contact-form">
            <h2>Update Your Contact Details</h2>

            <h4>Existing Email Address</h4>
            <input
              type="email"
              placeholder="Enter your existing email address"
              value={EmailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
            <br></br>
            <br></br>

            <h4>New Email Address</h4>
            <input
              type="email"
              placeholder="Enter your new email address"
              value={NewEmailAddress}
              onChange={(e) => setNewEmailAddress(e.target.value)}
            />
            <br></br>
            <br></br>

            <h4>New/Old Phone Number</h4>
            <input
              type="text"
              placeholder="Enter your cellphone number"
              value={PhoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <br></br>
            <br></br>

            <button className="submit-button" onClick={handleUpdate}>
              Submit Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default UpdateContact;
