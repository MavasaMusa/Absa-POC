import Navbar from "../../navbar/navbar";
import "./statements.css";
import Swal from "sweetalert2";
import React, { useState } from "react";
import axios from "axios";

const Balances = ({ username, onOptionClick }) => {
  const [EmailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [balance, setBalance] = useState(0);

  const BASE_URL = 'https://y37s2ngjle.execute-api.us-east-1.amazonaws.com/balance';

  // Function to send balance via email
  const sendBalanceEmail = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/Balance`, {}, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Assuming the API returns balance data
      setBalance(response.data.balance);
      Swal.fire({
        icon: "success",
        title: "Email Sent",
        text: `Balance sent successfully to ${EmailAddress}!`,
      });
    } catch (error) {
      console.error("Error fetching balance:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to send email!",
      });
    }
  };

  // Function to send balance via SMS
  const sendBalanceSMS = () => {
    const params = {
      Message: `Your balance is $${balance}`,
      PhoneNumber: phoneNumber,
    };

    // Add your logic to send SMS via API
  };

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
          <li onClick={() => onOptionClick("debitOrderReversal")}>
            Debit Order Reversal
          </li>
          <div className="divider"></div>
          <li onClick={() => onOptionClick("personalLoans")}>Personal Loans</li>
        </ul>
      </div>

      <div className="content">
        <div style={{ padding: "20px" }}>
          <h2>Welcome {username}</h2>
          <h2>Get Balances</h2>

          {/* Email Section */}
          <details style={{ marginBottom: "20px" }}>
            <summary style={{ cursor: "pointer", fontSize: "18px", marginBottom: "10px" }}>
              Send Balance via Email
            </summary>
            <input
              type="email"
              placeholder="Enter user email"
              value={EmailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              style={{ marginTop: "10px", marginRight: "10px" }}
            />
            <br></br>
            <div style={{ marginTop: "10px" }}>
              <button onClick={sendBalanceEmail} style={{ marginRight: "10px" }}>
                Send
              </button>
            </div>
          </details>

          {/* SMS Section */}
          <details>
            <summary style={{ cursor: "pointer", fontSize: "18px", marginBottom: "10px" }}>
              Send Balance via SMS
            </summary>
            <input
              type="text"
              placeholder="Enter user cellphone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              style={{ marginTop: "10px", marginRight: "10px" }}
            />
            <br></br>
            <div style={{ marginTop: "10px" }}>
              <button onClick={sendBalanceSMS}>
                Send
              </button>
            </div>
          </details>
        </div>
      </div>
    </>
  );
};

export default Balances;
