import React from 'react'
import '../Styles/Navbar.css';
import { Link } from "react-router";
const Navbar = () => {
  return (
    <div>
      <nav class="nav">
    <div class="container">
        <div class="logo">
            <a href="#">YourLogo</a>
        </div>
        <div class="main_list" id="mainListDiv">
            <ul>
                <li><Link to = "/">Home</Link></li>
                <li><Link to = "/parking">P-Space</Link></li>
                <li><Link to = "/reservation">Booking</Link></li>
                <li><Link to = "/wallet">Wallet</Link></li>
                <li><Link to = "/login">Profile</Link></li>
                <li><Link to = "contact">Contact Us</Link></li>
            </ul>
        </div>
        <div class="media_button">
            <button class="main_media_button" id="mediaButton">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </div>
</nav>
    
<section class="home"></section>
    </div>
  )
}

export default Navbar