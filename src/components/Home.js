import React from 'react'
import Image from 'react-bootstrap/Image';
import img from ".././Images/empimg.jpg";
import "../App.css";

export const Home = () => {
    return (
        <div class="App-header">
            <Image src={img} fluid />
            <h3>home is working..</h3>
        </div>
    )
}
