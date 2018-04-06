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
    cards: card,
    clown: "🤡"
  }

  shuffleArrayUnfinished = array => {
    let arrayUnfinished = array;
    let counter = arrayUnfinished.length;
    while (counter > 0) {
        // get random index
        let index = Math.floor(Math.random() * counter);
        // decrease counter
        counter--;

        let lastItem = arrayUnfinished[counter];
        arrayUnfinished[counter] = arrayUnfinished[index];
        arrayUnfinished[index] = lastItem;
    }

    this.setState({cards: arrayUnfinished});
  };

  shuffleArrayFinished = array => {
    let arrayFinished = array;
    let counter = arrayFinished.length;
    while (counter > 0) {
        // get random index
        let index = Math.floor(Math.random() * counter);
        // decrease counter
        counter--;

        let lastItem = arrayFinished[counter];
        arrayFinished[counter] = arrayFinished[index];
        arrayFinished[index] = lastItem;
    }

    for(let i = 0; i < arrayFinished.length; i++){
      arrayFinished[i].clicked = false;
    }

    this.setState({cards: arrayFinished});
  };

  handleLosing = array => {
    let newGameArray = array;
    // set score to zero
    let setScoreBack = 0;
    // set score state to zero
    this.setState({ userScore: setScoreBack });
    // send array to be shuffled and converted
    this.shuffleArrayFinished(newGameArray);

  };

  handleSuccess = array => {
    let arrayToBeShuffled = array;
    let newScore = this.state.userScore;
    if (this.state.userScore >= this.state.highScore){
      // add to the score
      newScore += 1;
      // set the score and high score state to new score
      this.setState({ userScore: newScore, highScore: newScore });
      this.shuffleArrayUnfinished(arrayToBeShuffled);
    } else {
      newScore += 1;
      this.setState({ userScore: newScore });
      this.shuffleArrayUnfinished(arrayToBeShuffled);
    }
  };

  // function to play game on image click
  handleClick = id => {
    // variables that will hold new array
    let newArray = this.state.cards.slice(0);
    // for loop iterating through the new array (same as old array currently)
    for(let i = 0; i < newArray.length; i++){
      // if the id matches the image clicked and it has not been clicked
      if (newArray[i].id === id && newArray[i].clicked === false){
        // change new array clicked property to true
        newArray[i].clicked = true;
        // call function to shuffle array
        this.handleSuccess(newArray);
        // console logging the clown
        console.log("you found the clown: 🤡");
      // however if id matches but it has been clicked before
      } else if (newArray[i].id === id && newArray[i].clicked === true){
        this.handleLosing(newArray);
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
        handleClick = {this.handleClick}
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
