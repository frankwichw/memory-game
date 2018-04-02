// import React from "react";
import React, { Component } from 'react';
import './App.css';
import Header from "./components/Header";
import NameDiv from "./components/NameDiv";

class App extends Component {

  state = {
    userScore: 0,
    highScore: 0
  }

  render() {
    return (
      <div class="wrapper">
        <Header 
        userScore = {this.state.userScore}
        highScore = {this.state.highScore}
        />
        <NameDiv />
      </div>
    );
  }
}

export default App;
