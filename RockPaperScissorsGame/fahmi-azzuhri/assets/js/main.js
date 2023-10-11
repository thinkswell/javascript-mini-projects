class Start {
  constructor() {
    this.playerName = "You";
    this.botName = "Enemy";
    this.winner = "";
    this.botOption;
    this.playerOption;
  }
  get getBotOption() {
    return this.botOption;
  }
  set setBotOption(tangan) {
    this.botOption = tangan;
  }
  get getPlayerOption() {
    return this.playerOption;
  }
  set setPlayerOption(tangan) {
    this.playerOption = tangan;
  }
  botBrain() {
    const tangan = ["✌️", "👊", "🖐️"];
    const bot = tangan[Math.floor(Math.random() * tangan.length)];
    return bot;
  }
  winCalculation() {
    if (this.botOption === "🖐️" && this.playerOption === "✌️") {
      return (this.winner = this.playerName);
    } else if (this.botOption === "✌️" && this.playerOption === "👊") {
      return (this.winner = this.playerName);
    } else if (this.botOption === "👊" && this.playerOption === "🖐️") {
      return (this.winner = this.playerName);
    } else if (this.botOption === "🖐️" && this.playerOption === "👊") {
      return (this.winner = this.botName);
    } else if (this.botOption === "✌️" && this.playerOption === "🖐️") {
      return (this.winner = this.botName);
    } else if (this.botOption === "👊" && this.playerOption === "✌️") {
      return (this.winner = this.botName);
    } else {
      return (this.winner = "Draw");
    }
  }
  matchResult() {
    if (this.winner !== "Draw") {
      return `${this.winner} Win`;
    } else {
      return `${this.winner}`;
    }
  }
}
function pickOption(params) {
  const start = new Start();
  start.setPlayerOption = params;
  start.setBotOption = start.botBrain();
  console.log();
  start.winCalculation();

  const inGame = document.getElementById("inGame");
  const result = document.getElementById("result");

  inGame.textContent = "...";
  result.textContent = "...";

  setTimeout(() => {
    inGame.textContent = `${start.getPlayerOption} VS ${start.getBotOption}`;
    result.textContent = start.matchResult();
  }, 1500);
}
