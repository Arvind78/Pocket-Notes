import React, { useEffect, useState,memo } from "react";
import showNotesStyle from "./ShowNotes.module.css";
import axios from "axios";

const ShowNotes = ({ selectGroup}) => {
  const [data, setData] = useState([]);
  const currentTime = new Date().toLocaleTimeString();
  

  useEffect(() => {
    axios.get(`https://notes-server-hg5p.onrender.com/groupNotes?groupName=${selectGroup}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
     
  }, [selectGroup]);

  return (
    <div className={showNotesStyle.divSection}>
    {data.map((item, index) => (
      <div key={index} className={showNotesStyle.item}>
        <p>{item.notesText}</p>
        <div  className={showNotesStyle.showDateTime}>
          <span> {item.date}</span>
         <li>{item.time}</li>
        </div>
         </div>
    ))}
  </div>
  );
};

export default memo(ShowNotes);
