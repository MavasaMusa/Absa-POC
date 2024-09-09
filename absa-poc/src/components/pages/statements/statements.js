
import React, { useState, useEffect } from "react";
import Navbar from "../../navbar/navbar";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function BankStatement() {
  const [EmailAddress, setEmailAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [selectedOption, setSelectedOption] = useState("1-month");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [statementData, setStatementData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Retrieve email from URL query parameters if available
    const params = new URLSearchParams(window.location.search);
    const email = params.get("EmailAddress");
    if (email) {
      setEmailAddress(email);
    }
  }, []);

  const sendStatementEmail = async () => {
    if (!EmailAddress) {
      Swal.fire({
        icon: "warning",
        title: "Email Required",
        text: "Please enter a valid email address.",
      });
      return;
    }

    try {
      const response = await axios.post(
        "https://pyi77ygckj.execute-api.us-east-1.amazonaws.com/AbsaStatements/AbsaStatement",
        { EmailAddress }
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Email Sent",
          text: `Statement sent successfully to ${EmailAddress}!`,
        });
      } else {
        throw new Error(response.data.body);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Failed to send email: ${error.message}`,
      });
      console.error("Error sending email:", error);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleDateRangeChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
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
          <li>Debit Order Reversal</li>
          <div className="divider"></div>
          <li>Personal Loans</li>
        </ul>
      </div>

      <div className="content">
        <div style={{ padding: "20px" }}>
          <h2>Get Your Statements</h2>

          <h3>Select Statement Period</h3>
          <div style={{ marginBottom: "20px" }}>
            <label>
              <input
                type="radio"
                value="1-month"
                checked={selectedOption === "1-month"}
                onChange={handleOptionChange}
              />
              Last 1 month
            </label>
            <br />
            <label>
              <input
                type="radio"
                value="3-months"
                checked={selectedOption === "3-months"}
                onChange={handleOptionChange}
              />
              Last 3 months
            </label>
            <br />
            <label>
              <input
                type="radio"
                value="6-months"
                checked={selectedOption === "6-months"}
                onChange={handleOptionChange}
              />
              Last 6 months
            </label>
            <br />
            <label>
              <input
                type="radio"
                value="12-months"
                checked={selectedOption === "12-months"}
                onChange={handleOptionChange}
              />
              Last 12 months
            </label>
            <br />
            <label>
              <input
                type="radio"
                value="custom"
                checked={selectedOption === "custom"}
                onChange={handleOptionChange}
              />
              Choose Date Range
            </label>
          </div>

          {selectedOption === "custom" && (
            <div style={{ marginBottom: "20px" }}>
              <DatePicker
                selected={startDate}
                onChange={handleDateRangeChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
              />
            </div>
          )}
          <h4>Enter your email address</h4>
          <input
            type="email"
            placeholder="Enter your email address"
            value={EmailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          <br></br>
          <button onClick={sendStatementEmail} style={{ marginTop: "20px" }}>
            Send Statement
          </button>
        </div>
      </div>
    </>
  );
}

export default BankStatement;
