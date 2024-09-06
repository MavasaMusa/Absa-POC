<<<<<<< HEAD
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
=======
// For styling
import Navbar from '../../navbar/navbar';
import './statements.css'
import AWS from 'aws-sdk';
import Swal from 'sweetalert2'; 
import UpdateContact from './update';
import CreateUser from '../userAccount/user';
import React, {useState} from 'react';
const Statem = (onOptionClick) => {

    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [balance, setBalance] = useState(0);
  
    // AWS Configuration
    AWS.config.update({
      accessKeyId: 'your-access-key-id', // Replace with your AWS access key
      secretAccessKey: 'your-secret-access-key', // Replace with your AWS secret key
      region: 'your-region' // Replace with your AWS region
    });
  
    const ses = new AWS.SES({ apiVersion: '2010-12-01' });
    const sns = new AWS.SNS();
  
    // Function to send balance via email
    const sendBalanceEmail = () => {
      const params = {
        Destination: {
          ToAddresses: [email],
        },
        Message: {
          Body: {
            Text: { Data: `Your balance is $${balance}` },
          },
          Subject: { Data: "Your Account Balance" },
        },
        Source: 'your-verified-email@example.com',
      };
  
      ses.sendEmail(params, (err, data) => {
        if (err) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to send email!',
          });
          console.error(err, err.stack);
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Email Sent',
            text: `Balance sent successfully to ${email}!`,
          });
          console.log(data);
        }
      });
    };
  
    // Function to send balance via SMS
    const sendBalanceSMS = () => {
      const params = {
        Message: `Your balance is $${balance}`,
        PhoneNumber: phoneNumber,
      };
  
      sns.publish(params, (err, data) => {
        if (err) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to send SMS!',
          });
          console.error(err, err.stack);
        } else {
          Swal.fire({
            icon: 'success',
            title: 'SMS Sent',
            text: `Balance sent successfully to ${phoneNumber}!`,
          });
          console.log(data);
        }
      });
    };

    return (
        <>
        <Navbar/>  
        <div className="sidebar">
      <h3>Menu</h3>
      <ul>
        <li><a href='/statements'>Balance</a></li>
        <div className="divider"></div> {/* Divider between sections */}
        <li><a href='/home'>Statements</a></li>
        <div className="divider"></div> {/* Divider between sections */}
        <li><a href='/update'>Update Contact Details</a></li>
        <div className="divider"></div> {/* Divider between sections */}
        <li>Issuing or Replace Card</li>
        <div className="divider"></div> {/* Another Divider */}
        <li onClick={() => onOptionClick('debitOrderReversal')}>Debit Order Reversal</li>
        <div className="divider"></div> {/* Divider between sections */}
        <li onClick={() => onOptionClick('personalLoans')}>Personal Loans</li>
      </ul>
    </div>

    <div className='content'>
        
        <div style={{ padding: '20px' }}>
        <h2>Get Balances</h2>

        <input
          type="email"
          placeholder="Enter user email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: '10px' }}
        /><br></br>

<div style={{ marginTop: '20px' }}>
          <button onClick={sendBalanceEmail} style={{ marginRight: '10px' }}>
            Send Balance via Email
          </button>
          </div><br></br>


          <input
          type="email"
          placeholder="Enter user cellphone number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: '10px' }}
        /><br></br>
       

        <div style={{ marginTop: '20px' }}>
          
          <button onClick={sendBalanceSMS}>
            Send Balance via SMS
          </button>
        </div>
      </div>
    </div>
        </>
    );
};

export default Statem;
>>>>>>> f00a11ad1a1bc45f60608fa73da661af31b7cb89
