import React, { useEffect, useState } from "react";
import styles from "./AddNotes.module.css"; // Import your CSS module
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { notification } from "antd";

const AddNotes = ({ selectGroup,getGroupData }) => {
  // Initialize the notification function
  const [message, showMessage] = notification.useNotification();

  // State to store the new notes
  const [newNotes, setNewNotes] = useState({
    notesText: "", // Initialize notesText as an empty string
    date: "",
    time: "",
    groupName: "",
  });

  // Handle input change and update state
  const handleChange = (e) => {
    setNewNotes({
      ...newNotes,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    // Get the current date and time in the Indian time zone
    const currentDate = new Date();

    // Get the current hour (0-23)
    const currentHour = currentDate.getHours();

    // Determine if it's AM or PM
    const period = currentHour >= 12 ? "PM" : "AM";

    // Calculate the hour in 12-hour format
    const hour12 = currentHour % 12 || 12; // Convert 0 to 12 for 12 AM

    // Get the current minute and second, year, month, and day components
    const minutes = currentDate.getMinutes();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Note: Months are 0-indexed, so add 1
    const day = currentDate.getDate();

    // Function to add leading zeros
    const addLeadingZero = (value) => {
      return value < 10 ? `0${value}` : value;
    };

    // Format the time with AM/PM
    const months = ["Jan","Feb","Mar","Apr","May","Jun", "Jul","Aug","Sep","Oct","Nov","Dec"];
    const formattedTime = `${addLeadingZero(
      hour12
    )}:${addLeadingZero(minutes)} ${period}`;
    const formattedDate = `${day} ${months[month - 1]} ${year}`;

    // Update the newNotes state with formatted date, time, and selected group
    setNewNotes({
      ...newNotes,
      date: formattedDate,
      time: formattedTime,
      groupName: selectGroup,
    });
  }, [selectGroup]);

  // Handle send button click
  const handleSendClick = () => {
    // Check if notesText is empty or null
    if (!newNotes.notesText) {
      // Show an error message if the notes text is empty
      message.error({
        placement: "top",
        message: "Notes Text is Empty",
        description: "Please write a note before sending.",
      });
      return;
    }

    // Make a POST request to save the new note
    axios
      .post("https://notes-server-hg5p.onrender.com/groupNotes", newNotes)
      .then(() => {
        // Show a success message on note creation
        message.success({
          placement: "top",
          message: "Notes Creation Success",
          description: "New note successfully created.",
        });
     
        // Clear the notesText field after successful submission
        setNewNotes({
          ...newNotes,
          notesText: "",
        });
        getGroupData()
      })
      .catch((err) => {
        message.error({
          placement: "top",
          message: "Notes Creation Failed",
          description: err.message || err.response.data.message,
        });
      });
     
  };

  return (
    <div className={styles.addNotes}>
      {showMessage}
      <textarea
        type="text"
        placeholder="Here’s the sample text for sample work..."
        value={newNotes.notesText}
        name="notesText"
        onChange={handleChange}
      ></textarea>
      <div>
        <button className="" onClick={handleSendClick}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default AddNotes;
