import React, { useState } from 'react';
import Navbar from '../../navbar/navbar';
import AWS from 'aws-sdk';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function BankStatement() {
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

  const statements = [
    { date: '2024-06-01', description: 'Purchase at Store A', amount: '-$50.00' },
    { date: '2024-06-15', description: 'Salary Credit', amount: '+$2000.00' },
    { date: '2024-07-05', description: 'Purchase at Store B', amount: '-$100.00' },
    { date: '2024-08-10', description: 'Electricity Bill', amount: '-$120.00' },
    { date: '2024-08-20', description: 'Refund', amount: '+$20.00' },
  ];

  // Function to generate PDF statement
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("3-Month Statement", 14, 22);
    doc.autoTable({
      startY: 30,
      head: [['Date', 'Description', 'Amount']],
      body: statements.map(s => [s.date, s.description, s.amount]),
    });
    doc.save('3-month-statement.pdf');
  };

  return (
    <>
      <Navbar />
      <div className="sidebar">
        <h3>Menu</h3>
        <ul>
          <li><a href='/statements'>Balance</a></li>
          <div className="divider"></div>
          <li><a href='/home'>Statements</a></li>
          <div className="divider"></div>
          <li>Update Contact Details</li>
          <div className="divider"></div>
          <li>Issuing or Replace Card</li>
          <div className="divider"></div>
          <li>Debit Order Reversal</li>
          <div className="divider"></div>
          <li>Personal Loans</li>
        </ul>
      </div>

      <div className='content'>
        <div style={{ padding: '20px' }}>
          <h2>Get Your Statements</h2>
          <h3>Savings Account</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginLeft: '40px' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {statements.map((statement, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{statement.date}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{statement.description}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{statement.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={generatePDF} style={{ marginTop: '20px' }}>
            Download PDF Statement
          </button>
        </div>
      </div>
    </>
  );
}

export default BankStatement;
