import Navbar from "../../navbar/navbar";
import "./statements.css";
import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Balances = () => {
  const [balance, setBalance] = useState(""); // For displaying balance
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); 
 
  const BASE_URL = 'https://y37s2ngjle.execute-api.us-east-1.amazonaws.com/balance';

  // Function to fetch balance from the API
  const fetchBalance = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/Balance`, {}, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Assuming the API returns balance data
      setBalance(response.data.balance); // Update with the actual field name from the API response
    } catch (error) {
      console.error("Error fetching balance:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch balance!",
      });
    }
  };

  // Fetch balance and username when component mounts
  useEffect(() => {
    fetchBalance();

    // Get the username from localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername); // Update state with the username
    }

    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail); // Update state with the username
    }

    const storedBalance = localStorage.getItem("balance");
    if (storedBalance) {
      setEmail(storedBalance); // Update state with the username
    }

  }, []);

  

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
          <li>
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
        <div style={{ padding: "20px" }}>
          <h2>Welcome, {username}</h2>
          <h1>Savings Account Balance</h1>
          <p>Your current savings account balance is: <strong>{email}</strong></p>
        </div>
      </div>
    </>
  );
};

export default Balances;
