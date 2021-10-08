import { capitals, lowers, spec, btn, result, buttonHandler } from "./utils.js";

class Password {
  constructor(
    capitals = false,
    numbers = false,
    specialchars = false,
    length = 10
  ) {
    this.capitals = capitals;
    this.numbers = numbers;
    this.specialchars = specialchars;
    this.length = length;
  }

  _genRandomNum(catg) {
    const random = Math.floor(Math.random() * catg.length);
    return random;
  }

  _getdivisons() {
    let divisions = 1;
    this.capitals ? (divisions += 1) : null;
    this.specialchars ? (divisions += 1) : null;
    this.numbers ? (divisions += 1) : null;
    const looptimes = Math.floor(this.length / divisions);
    return looptimes;
  }

  generatePass() {
    //   clear prev password
    result.innerHTML = "";
    // get loop times
    const looptimes = this._getdivisons();
    let pass = "";

    // run loop
    for (let i = 0; i < looptimes; i++) {
      const random = this._genRandomNum(lowers);
      pass += lowers[random];
      if (this.capitals) {
        pass += capitals[this._genRandomNum(capitals)];
      }
      if (this.specialchars) {
        pass += spec[this._genRandomNum(spec)];
      }
      if (this.numbers) {
        pass += Math.floor(Math.random() * (9 + 1));
      }
    }

    // if pass length is less add a char
    const loopct = this.length - pass.length;
    for (let i = 0; i < loopct; i++) {
      let random = this._genRandomNum(lowers);
      pass += lowers[random];
    }

    const charArr = [...pass];

    // shuffle letters using durstenfeld shuffle
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    shuffleArray(charArr);
    result.innerHTML += charArr.join(",").replace(/\,/g, "");
  }
}

btn.addEventListener("click", () => {
  const values = buttonHandler();
  //   instantiate password object
  const newpass = new Password(
    values.capitals,
    values.numbers,
    values.specchars,
    values.length
  );
  // run generate password on our password object
  newpass.generatePass();
});
