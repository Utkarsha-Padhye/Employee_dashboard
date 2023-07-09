import React from 'react'
import Image from 'react-bootstrap/Image';
import img from ".././Images/empimg.jpg";
import "../App.css";
import Welcome from './Welcome';

export const Home = () => {
    return (
        <div className="app1">
      {/* Background image */}
      <div className="background-image"></div>
      
      {/* Welcome message */}
      <Welcome />
    </div>  
    )
}
