import React from "react";
import "./style.css"; // Import the CSS file for other styling
 // Import your image file

const Popup = ({ message, onClose }) => {
 // Check the resolved path

  return (
    <div className="popup-container">
      <button className="popup-close-btn" onClick={onClose}>
        &times;
      </button>

      <h2 className="popup-title">{message.title}</h2>
      <p className="popup-body">{message.body}</p>
    </div>
  );
};

export default Popup;
