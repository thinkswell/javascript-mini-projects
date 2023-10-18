const Tooltip = (() => {
  const menuButtonTooltip = document.querySelector('.menu-button > span');

  const getTooltips = () => document.querySelectorAll('.tooltip');

  const getTooltipsButtonParents = () => {
    const tooltips = getTooltips();
    let buttonParents = [];
    for (const tooltip of tooltips) {
      const buttonParent = tooltip.parentElement;
      buttonParents = [...buttonParents, buttonParent];
    }
    return buttonParents;
  };

  const getTooltipsAndParents = () => {
    const tooltips = getTooltips();
    const tooltipsParents = getTooltipsButtonParents();
    const tooltipsAndParents = {};
    for (let i = 0; i < tooltips.length; i++) {
      const tooltip = tooltips[i];
      const parentButton = tooltipsParents[i];
      tooltipsAndParents[i] = { tooltip, parentButton };
    }
    return tooltipsAndParents;
  };

  const hideTooltipOnClick = () => {
    const tooltipsAndParents = getTooltipsAndParents();
    const objectLength = Object.keys(tooltipsAndParents).length;
    for (let i = 0; i < objectLength; i++) {
      const tooltip = tooltipsAndParents[i].tooltip;
      const parentButton = tooltipsAndParents[i].parentButton;
      parentButton.addEventListener('mousedown', () => {
        tooltip.classList.remove('visible');
        tooltip.classList.contains('clicked') &&
          tooltip.classList.add('clicked');
      });
      parentButton.addEventListener('mouseover', () => {
        if (
          tooltip.classList.contains('clicked') &&
          tooltip.classList.containes('visible')
        ) {
          tooltip.classList.remove('visible');
          return;
        }
        tooltip.classList.add('visible');
      });
      parentButton.addEventListener('mouseout', () => {
        tooltip.classList.contains('clicked') &&
          tooltip.classList.remove('clicked');
        tooltip.classList.remove('visible');
      });
    }
  };

  const changeMenuTooltipTextOpen = () =>
    (menuButtonTooltip.textContent = 'Open menu');

  const changeMenuTooltipTextClose = () =>
    (menuButtonTooltip.textContent = 'Close menu');

  hideTooltipOnClick();

  return {
    changeMenuTooltipTextOpen,
    changeMenuTooltipTextClose,
  };
})();

export { Tooltip };
