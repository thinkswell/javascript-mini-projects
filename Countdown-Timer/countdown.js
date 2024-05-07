 let minutesTarget = 5;  // Change the target minutes as needed
  let hoursTarget = 2;    // Change the target hours as needed
  let secondsTarget = 30;  // Change the target seconds as needed

  function updateCards() {
    updateCard('minutes', minutesTarget);
    updateCard('hours', hoursTarget);
    updateCard('seconds', secondsTarget);
  }

  function updateCard(card, value) {
    const front = document.getElementById(`${card}Front`);
    const back = document.getElementById(`${card}Back`);
    back.textContent = value < 10 ? `0${value}` : value;

    const cardElement = document.getElementById(`${card}Card`);
    cardElement.classList.add('flipped');
    setTimeout(() => {
      front.textContent = back.textContent;
      cardElement.classList.remove('flipped');
    }, 500);
  }

  function updateCountdown() {
    if (secondsTarget > 0) {
      secondsTarget--;
      updateCard('seconds', secondsTarget);
    } else {
      if (minutesTarget > 0) {
        minutesTarget--;
        secondsTarget = 59;
        updateCard('minutes', minutesTarget);
        updateCard('seconds', secondsTarget);
      } else {
        if (hoursTarget > 0) {
          hoursTarget--;
          minutesTarget = 59;
          secondsTarget = 59;
          updateCard('hours', hoursTarget);
          updateCard('minutes', minutesTarget);
          updateCard('seconds', secondsTarget);
        }
      }
    }
  }

  let countdownInterval;

  document.getElementById('startButton').addEventListener('click', () => {
    clearInterval(countdownInterval);
    countdownInterval = setInterval(updateCountdown, 1000);
  });

  document.getElementById('pauseButton').addEventListener('click', () => {
    clearInterval(countdownInterval);
  });

  document.getElementById('resetButton').addEventListener('click', () => {
    clearInterval(countdownInterval);
    minutesTarget = 5;  // Reset to the initial target minutes
    hoursTarget = 2;    // Reset to the initial target hours
    secondsTarget = 30;  // Reset to the initial target seconds
    updateCards();
  });

  // Initial update
  updateCards();