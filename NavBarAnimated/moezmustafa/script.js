const menuItems = document.querySelectorAll('.tab-button');
const indicator = document.querySelector('.indicator');

let activeItemIndex = 0;

function updateIndicator(index) {
  const activeItem = menuItems[index];
  const container = document.querySelector('.tab-container');
  const containerRect = container.getBoundingClientRect();
  const activeItemRect = activeItem.getBoundingClientRect();

  const indicatorLeft = Math.floor(
    activeItemRect.left - containerRect.left - 
    (indicator.offsetWidth - activeItemRect.width) / 2
  );

  indicator.style.transform = `translateX(${indicatorLeft}px)`;
}

menuItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    if (activeItemIndex !== index) {
      menuItems[activeItemIndex].classList.remove('active');
      item.classList.add('active');
      activeItemIndex = index;
      updateIndicator(index);
    }
  });
});

// Initialize with the first active item
updateIndicator(activeItemIndex);
