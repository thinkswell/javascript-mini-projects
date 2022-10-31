import { Route, Switch } from "react-router-dom";
import React, { useState } from "react";
import Play from "./components/Play";
import Game from "./components/Game";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [score, setScore] = useState(0);
  const [userChoice, setUserChoice] = useState("");
  console.log(userChoice);
  return (
   
    <div className="App">
      <Header score={score}/>
      <Switch>
        
        <Route exact path="/">
          <Play setUserChoice={setUserChoice} />
        </Route>

        <Route path="/game" >
          <Game score={score} userChoice={userChoice} setScore={setScore} />
        </Route>

      </Switch>
      <Footer />
    </div>

  );
}
export default App;
