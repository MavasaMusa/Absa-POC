import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import "./home.css";
import Navbar from "../../navbar/navbar";

function Home() {
  const videoRef = useRef(null);
  const [status, setStatus] = useState("Initializing...");
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState(
    "Authentication result will be shown here."
  );
  const [otp, setOtp] = useState("");

  // Start the video stream from the webcam
  useEffect(() => {
    let stream = null;
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((mediaStream) => {
        stream = mediaStream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setStatus(
          "Video stream started. Press the button to capture an image."
        );
      })
      .catch((error) => {
        console.error("Error accessing webcam:", error);
        setStatus("Error accessing webcam. Please check permissions.");
      });

    // Clean up the video stream on component unmount
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Capture a frame from the video stream
  const captureFrame = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageBase64 = canvas.toDataURL("image/jpeg", 0.7); // Compress image to 70% quality
    return imageBase64;
  };

  // Function to check liveness and send image to backend
  const checkLivenessAndAuthenticate = () => {
    setStatus("Initializing...");
    const imageBase64 = captureFrame();

    fetch(
      "https://mx6vxtaybi.execute-api.us-east-1.amazonaws.com/Absa/my-absa",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageBase64 }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const auth = JSON.parse(data.body);
        if (auth.authenticated) {
          setStatus("Authentication successful! Showing popup...");
          const message = auth.message || "";
          const usernameMatch = message.match(/Welcome, (\w+)\./);
          const username = usernameMatch ? usernameMatch[1] : "User";
          localStorage.setItem("username", username);

          const email = auth.email || "unknown@example.com"; // Get the email from the response
          localStorage.setItem("email", email); // Store it in localStorage


          const balance = auth.balance;
          localStorage.setItem('balance', balance);

          setPopupMessage(`Welcome, ${username}. Face matched successfully. `);
          setOverlayVisible(true);
        } else {
          setStatus("Authentication failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error sending request:", error);
        setStatus("Error during authentication. Please try again.");
      });
  };

  // Function to verify OTP using SweetAlert
  const verifyOTP = (otp) => {
    fetch(
      "https://nuc82wm9o4.execute-api.us-east-1.amazonaws.com/verify/My_Verify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ OTP: otp }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          Swal.fire({
            title: "Success",
            text: "OTP verified successfully!",
            icon: "success",
            confirmButtonText: "OK",
            customClass: {
              confirmButton: "swal-button",
            },
          }).then(() => {
            window.location.href = "/balances"; // Redirect to the home page
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Invalid OTP. Please try again.",
            icon: "error",
            confirmButtonText: "Try Again",
            customClass: {
              confirmButton: "swal-button",
            },
          });
        }
      })
      .catch((error) => {
        console.error("Error during OTP verification:", error);
        Swal.fire({
          title: "Error",
          text: "An error occurred. Please try again.",
          icon: "error",
          confirmButtonText: "Close",
          customClass: {
            confirmButton: "swal-button",
          },
        });
      });
  };

  return (
    <>
      <Navbar />
      <div className="scan-header">SCAN FACE TO LOGIN</div>
      <div className="contain">
        <video ref={videoRef} className="camera" autoPlay></video>
        <br />
        <button className="capture" onClick={checkLivenessAndAuthenticate}>
          Capture Image
        </button>
        <div>{status}</div>
        <div className="absa-logo">
          <img
            src="https://images.squarespace-cdn.com/content/v1/5f71d110704fd32c33582494/1624384527426-04H6W2RTBPV14KXFNN76/Absa_Logo_Primary_Identity_CMYK_Passion.png"
            alt="ABSA Logo"
            className="absa-image"
          />
        </div>

        {/* Popup for displaying authentication result and OTP input */}
        {overlayVisible && (
          <div
            id="overlay"
            style={styles.overlay}
            onClick={() => setOverlayVisible(false)}
          >
            <div
              id="popup"
              style={styles.popup}
              onClick={(e) => e.stopPropagation()}
            >
              <div>{popupMessage}</div>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                style={styles.otpInput}
              />
              <button
                onClick={() => verifyOTP(otp)}
                className="capture"
                style={styles.submitOtpButton}
              >
                Submit OTP
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const styles = {
  overlay: {
    display: "flex",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "5px",
    textAlign: "center",
    zIndex: 1001,
    position: "relative",
  },
  otpInput: {
    marginTop: "10px",
    padding: "10px",
    width: "calc(100% - 20px)",
    border: "1px solid #ccc",
    borderRadius: "50px",
    fontSize: "16px",
    // Match the font size
    color: "#333", // Match the text color
    placeholderColor: "#888", // Lighter placeholder color (you may need to use pseudo-element)
    outline: "none",
    boxSizing: "border-box",
  },
  submitOtpButton: {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "red",
    color: "#fff",
    width: "300px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Home;
