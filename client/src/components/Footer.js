import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../components/css/footer.css';

function Footer() {
  // State to hold the existence of the token
  const [hasToken, setHasToken] = useState(!!localStorage.getItem('token'));

  // Effect to continuously check for the token
  useEffect(() => {
    const checkToken = () => {
      setHasToken(!!localStorage.getItem('token'));
    };

    // Set up an interval to check for the token every few seconds
    const intervalId = setInterval(checkToken, 5000); // Adjust the interval as needed

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only once on mount

  // Render the footer only if token exists
  if (!hasToken) {
    return null; // If token is empty, do not render the footer
  }

  // If token exists, render the footer
  return (
    <div className='footer'>
      <div className='footer2'>
        <a href="https://keen-trifle-cd8bcc.netlify.app/" target="_blank">About</a>
        <a href="mailto:volkanmav@gmail.com">Contact</a>
        <a href="https://github.com/volkanmavis" target="_blank">Github</a>
        <a href="https://www.linkedin.com/in/volkan-maviş-aa757a2a7" target="_blank">Linkedin</a>
      </div>
    </div>
  );
}

export default Footer;
