import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      userChoice: null,
      computerChoice: null,
      result: "",
    };
  }

  choices = ["rock", "paper", "scissors"];

  getRandomChoice = () => {
    const randomIndex = Math.floor(Math.random() * this.choices.length);
    return this.choices[randomIndex];
  };

  determineWinner = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) return "It's a tie!";
    if (
      (userChoice === "rock" && computerChoice === "scissors") ||
      (userChoice === "scissors" && computerChoice === "paper") ||
      (userChoice === "paper" && computerChoice === "rock")
    ) {
      return "You win!";
    } else {
      return "Computer wins!";
    }
  };

  handleUserChoice = (choice) => {
    const computerChoice = this.getRandomChoice();
    const result = this.determineWinner(choice, computerChoice);
    this.setState({
      userChoice: choice,
      computerChoice,
      result,
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Rock, Paper, Scissors</h1>
        <div className="choices">
          {this.choices.map((choice) => (
            <button
              key={choice}
              onClick={() => this.handleUserChoice(choice)}
            >
              {choice}
            </button>
          ))}
        </div>
        <div className="result">
          {this.state.userChoice && (
            <>
              <p>Your choice: {this.state.userChoice}</p>
              <p>Computer's choice: {this.state.computerChoice}</p>
              <p>{this.state.result}</p>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default App;
