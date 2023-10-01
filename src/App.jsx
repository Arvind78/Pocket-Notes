import React, { useCallback, useEffect, useState } from "react";
import appStyle from "./App.module.css"; // Import your CSS module
import PopupModel from "./components/popupComponent/PopupModel";
import ShowNotes from "./components/ShowNotes/ShowNotes";
import AddNotes from "./components/AddNotes.jsx/AddNotes";
import axios from "axios";
import mainPageImg from "./assets/mainpage.png";
import lockImg from "./assets/Vector.png";
import arrowImg from "./assets/arrow.png";
import closeImg from "./assets/close.png";
import openImg from "./assets/open.png";

function App() {
  // State for selected group and group data
  const [selectGroup, setselectGroup] = useState("default");
  const [windowSize, setWindowSize] = useState(0);
  const [sidemenuWidth, setSidemenuWidth] = useState(23);
  const [showHide, setShowHide] = useState("block");
  const [contentDivWidth, setContentWidth] = useState(77);
  const [groupData, setGroupData] = useState([]);
  const [logoColor, setLogoColor] = useState("");
 

  // Function to fetch group data from an API endpoint on component mount
  const getGroupData = () => {
    axios
      .get("https://notes-server-hg5p.onrender.com/groups") // Replace with your API endpoint
      .then((res) => setGroupData(res.data))
      .catch((err) => {
        console.error("Error fetching group data:", err);
      });
  }

  // useEffect to fetch group data and handle window size changes
  useEffect(() => {
    getGroupData(); // Fetch group data from the API

    // Set up a window resize event listener
    setInterval(() => {
      setWindowSize(window.innerWidth);
    }, 0);

    // Call responsiveHandler to set initial values
    responsiveHandler();

    // Check window size and adjust content width and side menu visibility
    if (windowSize < 700) {
      setContentWidth(100);
      setShowHide("none");
    } else {
      setShowHide("block");
    }
  }, [windowSize]);

  // Function to handle responsive design
  const responsiveHandler = useCallback(() => {
    if (windowSize > 950) {
      setSidemenuWidth(20);
      setContentWidth(77);
    } else if (windowSize > 800 || windowSize < 950) {
      setSidemenuWidth(27);
      setContentWidth(77);
      setShowHide("block");
    } else if (windowSize < 700) {
      setContentWidth(100);
      setShowHide("none");
    } else {
      setShowHide("block");
      setSidemenuWidth(23);
      setContentWidth(77);
    }
  }, [windowSize]);

  // Handle click on a menu item
  const menuHandler = useCallback((groupName, groupColor) => {
    setselectGroup(groupName);
    setLogoColor(groupColor);
  }, []);

  // Function to extract the first characters of a group name
  const groupLogoHandler = useCallback((groupName) => {
    const parts = groupName.split(" ");
    const firstChar = parts[0].charAt(0);
    let secondChar = "";
    if (parts.length > 1) {
      secondChar = parts[1].charAt(0);
    }
    return firstChar + secondChar;
  }, []);

  // Function to handle the toggle button for smaller screens
  const toogleHandler = () => {
    if (showHide === "block") {
      setContentWidth(100);
      setShowHide("none");
    } else {
      setShowHide("block");
      if (windowSize < 370) {
        setContentWidth(100);
        setSidemenuWidth(70);
      } else {
        setContentWidth(100);
        setSidemenuWidth(50);
      }
    }
  }

  
  return (
    <div className={appStyle.mainContainer}>
      <div className={appStyle.sideMenu} style={{ flex: `0 0 ${sidemenuWidth}%`, display: showHide }}>
        <div className={appStyle.header}>
          <p>Pocket Notes</p>
        </div>

        <div className={appStyle.menu}>
          {groupData?.map((item) => (
            <div
              key={item.groupName}
              className={
                selectGroup === item.groupName
                  ? appStyle.newGroupActive
                  : appStyle.newGroup
              }
              onClick={() => menuHandler(item.groupName, item.groupColor)}
            >
              <div style={{ backgroundColor: item.groupColor }}>
                {groupLogoHandler(item.groupName)}
              </div>
              <span>{item.groupName}</span>
            </div>
          ))}
        </div>

        <div className={appStyle.createGroup}>
          <PopupModel getGroupData={getGroupData} />
        </div>
      </div>

      {selectGroup === "default" ? (
        <div className={appStyle.defaultPage}>
          <div className={appStyle.defaultPageinfoMain}>
            {windowSize < 700 && (
              <div className={appStyle.mainScreenToogle}>
                <span onClick={toogleHandler}>
                  {showHide === "none" ? (
                    <img src={openImg} alt="" />
                  ) : (
                    <img src={closeImg} alt="" />
                  )}
                </span>
              </div>
            )}

            <div className={appStyle.defaultPageinfoCointainer}>
              <img src={mainPageImg} alt="Main Page" className={appStyle.mainImg} />

              <div className={appStyle.mainPageText}>
                <h3>Pocket Notes</h3>
                <p>
                  Send and receive messages without keeping your phone online.
                  Use Pocket Notes on up to 4 linked devices and 1 mobile phone
                </p>
              </div>
            </div>
            <div>
              <div className={appStyle.encriptionText}>
                <img src={lockImg} alt="Lock Icon" />
                <span>end-to-end encrypted</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={appStyle.routes} style={{ flex: `0 0 ${contentDivWidth}%` }}>
          <div className={appStyle.header}>
            <div className={appStyle.groupInfo}>
              {windowSize < 700 && (
                <img src={arrowImg} alt="Lock Icon" onClick={toogleHandler} />
              )}

              <div style={{ backgroundColor: logoColor }}>{groupLogoHandler(selectGroup)}</div>
              <span>{selectGroup}</span>
            </div>
          </div>

          <div className={appStyle.allNotes}>
            <ShowNotes selectGroup={selectGroup} />
          </div>

          <div className={appStyle.addNotes}>
            <AddNotes selectGroup={selectGroup}  getGroupData={getGroupData}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
