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

  shuffleArrayFinished = (array, callback) => {
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

     callback(arrayFinished);
  };

  handleLosing = array => {
    let newGameArray = array;
    // set score to zero
    let setScoreBack = 0;
    // set score state to zero
    this.setState({ userScore: setScoreBack });
    // send array to be shuffled and converted
    this.shuffleArrayFinished(newGameArray, (array) => {
      this.setState({cards: newGameArray});
      console.log("shuffle finished game array (should all be false below");
      console.log(newGameArray);
      console.log("handle losing function reached");
    });
  };

  handleSuccess = array => {
    let arrayToBeShuffled = array;
    let newScore = this.state.userScore;
    console.log("handle success function reached");
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
      // however if id matches but it has been clicked before
      if (newArray[i].id === id && newArray[i].clicked === true){
        console.log("if clicked = true statement array:")
        console.log(newArray);
        this.handleLosing(newArray);
        break;
      // if the id matches the image clicked and it has not been clicked
      } else if (newArray[i].id === id && newArray[i].clicked === false){
        // change new array clicked property to true
        newArray[i].clicked = true;
        // call function to shuffle array
        this.handleSuccess(newArray);
        // console logging the clown
        console.log("you found the clown: 🤡");
        break;
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
        <div className="col-xl-1 col-lg-1 col-md-1">
        </div>
        <div className="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-xs-12">
        {/* mapping (displaying each) card and passing the json object's properties to each */}
        {this.state.cards.map(card => (
        <MemoryCards 
        handleClick = {this.handleClick}
        name = {card.name}
        url = {card.url}
        id = {card.id}
        key={card.id}
        />
        ))}
        </div>
      </div>
    );
  }
}

export default App;
