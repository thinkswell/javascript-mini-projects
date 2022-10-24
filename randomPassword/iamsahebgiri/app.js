const resultElement = document.getElementById('result');

const generate_random_password = () => {
  return Math.random().toString(36).substring(2);
};

document.getElementById('generate').addEventListener('click', () => {
  resultElement.textContent = generate_random_password();
});

document.getElementById('clipboard').addEventListener('click', () => {
  //clipboard
  var text = resultElement.textContent;
  navigator.clipboard.writeText(text).then(
    () => {
      // snackbar
      const x = document.getElementById('snackbar');
      x.className = 'show';
      setTimeout(function () {
        x.className = x.className.replace('show', '');
      }, 3000);
    },
    (err) => {
      console.log(err);
    },
  );
});

resultElement.textContent = generate_random_password();
