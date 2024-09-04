import React, { useState } from 'react';
import Navbar from '../../navbar/navbar';
import AWS from 'aws-sdk';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function CreateUser() {
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

      <div style={{ padding: '20px' }}>
        <h2>View Balance</h2>

        <input
          type="email"
          placeholder="Enter user email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: '10px' }}
        /><br></br>

        <input
          type="tel"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={{ marginRight: '10px' }}
        />

        <input
          type="number"
          placeholder="Enter balance"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          style={{ marginRight: '10px' }}
        />

        <div style={{ marginTop: '20px' }}>
          <button onClick={sendBalanceEmail} style={{ marginRight: '10px' }}>
            Send Balance via Email
          </button>
          <button onClick={sendBalanceSMS}>
            Send Balance via SMS
          </button>
        </div>
      </div>


      {/*download statement*/}

      <div style={{ padding: '20px' }}>
     
      </div>
    </>
  );
}

export default CreateUser;
