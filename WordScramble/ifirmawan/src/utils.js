export const scramble = (word) => {
  // Split the word into an array of characters.
  const characters = word.split("");
  // Shuffle the characters in the array.
  for (let i = 0; i < characters.length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    const tempCharacter = characters[i];
    characters[i] = characters[randomIndex];
    characters[randomIndex] = tempCharacter;
  }
  // Join the characters in the array back into a string.
  const scrambledWord = characters.join("");
  // Return the scrambled word.
  return scrambledWord;
};

export const shuffle = (array) => {
  const shuffledArray = [];

  while (array.length > 0) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const element = array.splice(randomIndex, 1)[0];
    shuffledArray.push(element);
  }

  return shuffledArray;
};
