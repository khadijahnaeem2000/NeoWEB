// Popup.js
import React from "react";
import "./style.css"; // Import the CSS file for other styling

const Popup = ({ message, onClose }) => {
  const handleRedirect = (url) => {
    window.location.href = url; // Redirects to the specified URL
  };
  return (
    <div className="popup-container">
      <button className="popup-close-btn" onClick={onClose}>
        &times;
      </button>
      <p className="popup-body">{message.body}</p>
      {/* Add your buttons here */}
      <div className="popup-buttons">
        <button onClick={() => handleRedirect("https://play.google.com/store/apps/details?id=com.neostudio&pli=1")}>App Android</button>
        <button onClick={() => handleRedirect("https://apps.apple.com/es/app/curso-guardia-civil-neoestudio/id1531939360")}>App IOS</button>
        <button onClick={onClose}>Continuar en Web</button>
      </div>
    </div>
  );
};

export default Popup;
