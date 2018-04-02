import React, { Component } from 'react';
import './Header.css';

const Header = props => (
    <nav class="navbar navbar-default navbar-fixed-top">
        <h1>Memory Game</h1>
        <div id="navbarNav">
            <ul class="navbar-nav">
            <li class="nav-item">
                Click an image to begin!
            </li>
            <li class="nav-item">
                Score: {props.userScore}
            </li>
            <li class="nav-item">
                High Score: {props.highScore}
            </li>
            </ul>
        </div>
    </nav>
  );
  
  export default Header;