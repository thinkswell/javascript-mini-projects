const Header = (() => {
  const resetDataButton = document.querySelector('.reset-data-button');

  resetDataButton.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
  });
})();

export { Header };
