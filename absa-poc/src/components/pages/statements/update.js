// For styling
import Navbar from '../../navbar/navbar';
import './statements.css'
import AWS from 'aws-sdk';
import Swal from 'sweetalert2'; 
import CreateUser from '../userAccount/user';
import React, {useState} from 'react';
const UpdateContact = (onOptionClick) => {

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
        <h2>Update Your Contact Details</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: '10px' }}
        /><br></br><br></br>

        <input
          type="text"
          placeholder="Enter your cellphone number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: '10px' }}
        /><br></br><br></br>

           

<div style={{ marginTop: '20px' }}>
          <button onClick={sendBalanceEmail} style={{ marginRight: '10px' }}>
            Update
          </button>
          </div><br></br>


      </div>
    </div>
        </>
    );
};

export default UpdateContact;
