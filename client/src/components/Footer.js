import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../components/css/footer.css';

function Footer() {

  const [hasToken, setHasToken] = useState(!!localStorage.getItem('token'));


  useEffect(() => {
    const checkToken = () => {
      setHasToken(!!localStorage.getItem('token'));
    };


    const intervalId = setInterval(checkToken, 5000);

   
    return () => clearInterval(intervalId);
  }, []); 

  
  if (!hasToken) {
    return null; 
  }


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
