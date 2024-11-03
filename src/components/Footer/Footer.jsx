import { useState, useEffect } from "react";
import "./Footer.css";

const Footer = () => {
  const [openNewWindow, setOpenNewWindow] = useState(false);
  const [resizeNewWindow, setResizeNewWindow] = useState(false);

  const scrollBottom = () => window.scrollTo(0, 0);

  useEffect(() => {
    let myWindow;
    if (openNewWindow) {
      myWindow = window.open(
        "http://localhost:3000/",
        "New Kanban Page",
        "width=200, height=100"
      );
    }
    if (resizeNewWindow) {
      myWindow.resizeTo(600, 800);
    }
    if (openNewWindow && resizeNewWindow) {
      setTimeout(() => {
        setOpenNewWindow(false);
        setResizeNewWindow(false);
      }, 10000);
    }
  }, [openNewWindow, resizeNewWindow]);

  return (
    <div className="footer">
      <button onClick={scrollBottom} className="all-btn addiional-button">
        Scroll Top
      </button>
      <button
        className="all-btn addiional-button"
        onClick={() => setOpenNewWindow(true)}
      >
        New window
      </button>
      <button
        className="all-btn addiional-button"
        onClick={() => setResizeNewWindow(true)}
      >
        Resize new window
      </button>
    </div>
  );
};

export default Footer;
