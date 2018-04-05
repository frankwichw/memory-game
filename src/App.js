// importing variables/components
import React, { Component } from 'react';
import './App.css';
import Header from "./components/Header";
import NameDiv from "./components/NameDiv";
import MemoryCards from "./components/MemoryCards";
import card from "./cards.json";

class App extends Component {
  // states that will change during the game
  state = {
    userScore: 0,
    highScore: 0,
    cards: card
  }
  // function to play game on image click
  clickedTrue = id => {
    // variables that will hold new array and new score
    let newArray = this.state.cards.slice(0);
    let newScore = this.state.userScore;
    // for loop iterating through the new array (same as old array currently)
    for(var i = 0; i < newArray.length; i++){
      // if the id matches the image clicked and it has not been clicked
      if (newArray[i].id === id && newArray[i].clicked === false){
        // change new array clicked property to true
        newArray[i].clicked = true;
        // add to the score
        newScore += 1;
        // set the score state to new score
        this.setState({ userScore: newScore });
      // however if id matches but it has been clicked before
      } else if (newArray[i].id === id && newArray[i].clicked === true){
        // set score to zero
        newScore = 0;
        // set score state to zero
        this.setState({ userScore: newScore });
      }
    }
  };
  // rendering to dom
  render() {
    return (
      // enclosing div
      <div className="wrapper">
        {/* passing user score and high score states to header to display */}
        <Header 
        userScore = {this.state.userScore}
        highScore = {this.state.highScore}
        />
        {/* passing static name div below it */}
        <NameDiv />
        {/* mapping (displaying each) card and passing the json object's properties to each */}
        {this.state.cards.map(card => (
        <MemoryCards 
        clickedTrue = {this.clickedTrue}
        name = {card.name}
        url = {card.url}
        id = {card.id}
        key={card.id}
        clicked = {card.clicked}/>
        ))}
      </div>
    );
  }
}

export default App;
