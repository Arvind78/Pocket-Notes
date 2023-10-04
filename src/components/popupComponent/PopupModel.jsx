import React, { useState } from "react";
import styles from "./PopupModel.module.css"; // Import your CSS module
import { notification } from "antd";
import axios from "axios";

function PopupModel({getGroupData}) {
  // Initialize the notification function for error messages
  const [message, showMessage] = notification.useNotification();

  // State variables
  const [isOpen, setIsOpen] = useState(false);
  const [groupColor, setGroupColor] = useState("");
  const [groupName, setGroupName] = useState("");
  const bgColors = ["#B38BFA", "#FF79F2", "#43E6FC", "#F19576", "#0047FF", "#6691FF"];

  // Open the popup
  const openPopup = () => {
    setIsOpen(true);
  };

  // Close the popup
  const closePopup = () => {
    setIsOpen(false);
  };

  // Handle clicking on the overlay to close the popup
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  // Handle creating a new group
  const newGroupHandler = () => {
    // Validation checks for group name and color
    if (!validateGroupName()) {
      return;
    }

    // Send a POST request to create a new group
    axios
      .post("https://notes-server-hg5p.onrender.com/groups", {
        groupName,
        groupColor,
      })
      .then(() => {
        // Show a success notification
        showSuccessNotification("Group Creation Success", "New group created successfully");
        // Close the popup after successful group creation
        closePopup();
        // Reset input values
        resetForm();
        getGroupData();
      })
      .catch((err) => {
        // Show an error notification for server errors
        showErrorNotification("Group Creation Failed", err.message || err.response.data.message);
      });
  };

  // Validation function for group name
  const validateGroupName = () => {
    if (!groupName || groupName.trim() === "") {
      // Show an error notification if group name is empty or only whitespace
      showErrorNotification("Group name can't be empty", "Please enter a group name");
      return false;
    }

    if (groupName.length < 3) {
      // Show an error notification if group name is too short
      showErrorNotification("Group name must be at least 3 characters", "Enter a group name with at least 3 characters");
      return false;
    }

    if (!isNaN(groupName)) {
      // Show an error notification if group name contains only numbers
      showErrorNotification("Group name requires characters", "Enter a group name with characters, not just numbers");
      return false;
    }

    if (!groupColor) {
      // Show an error notification if group color is not selected
      showErrorNotification("Group color can't be empty", "Please select a group color");
      return false;
    }

    return true;
  };

  // Show a success notification
  const showSuccessNotification = (messageText, descriptionText) => {
    message.success({
      placement: "top",
      message: messageText,
      description: descriptionText,
    });
  };

  // Show an error notification
  const showErrorNotification = (messageText, descriptionText) => {
    message.error({
      placement: "top",
      message: messageText,
      description: descriptionText,
    });
  };

  // Reset form inputs
  const resetForm = () => {
    setGroupName("");
    setGroupColor("");
  };

  return (
    <div>
      {showMessage}
      <button className={styles.popupBtn} onClick={openPopup}>
        +
      </button>

      {isOpen && (
        <div className={styles.overlay} onClick={handleOverlayClick}>
          <div className={styles.popup}>
            <h3 className={styles.popupHeading}>Create New Group</h3>

            {/* Input for group name */}
            <div className={styles.groupInput}>
              <h3 className={styles.groupHeading}>Group Name</h3>
              <input
                type="text"
                placeholder="Enter group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>

            {/* Color selection */}
            <div className={styles.color}>
              <h3 className={styles.colorHeading}>Choose Color</h3>
              <div className={styles.colorBoxContainer}>
                {bgColors.map((bgcolor) => (
                  <div
                    key={bgcolor}
                    className={
                      groupColor === bgcolor
                        ? styles.colorDivSelect
                        : styles.colorDiv
                    }
                    value={groupColor}
                    style={{ background: bgcolor }}
                    onClick={() => setGroupColor(bgcolor)}
                  ></div>
                ))}
              </div>
            </div>

            {/* Create button */}
            <div className={styles.createBtn}>
              <button onClick={newGroupHandler}>Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopupModel;
