function Star(el, count, callback) {
  let active = -1;
  const element = document.querySelector(el);
  const fragment = document.createDocumentFragment();
  for (let i = 1; i <= count; i++) {
    const iElem = document.createElement("i");
    iElem.classList.add("fa");
    iElem.classList.add("fa-star-o");
    iElem.dataset.ratingVal = i;
    fragment.appendChild(iElem);
  }
  element.appendChild(fragment);
  element.addEventListener("mouseover", onMouseOver);
  element.addEventListener("click", onClick);
  element.addEventListener("mouseleave", onMouseLeave);

  function onMouseOver(e) {
    const ratingVal = e.target.dataset.ratingVal;
    if (!ratingVal) {
      return;
    }
    fill(ratingVal);
  }

  function fill(ratingVal) {
    for (let i = 0; i < count; i++) {
      if (i < ratingVal) {
        element.children[i].classList.add("fa-star");
      } else {
        element.children[i].classList.remove("fa-star");
      }
    }
  }

  function onMouseLeave(e) {
    fill(active);
  }

  function onClick(e) {
    active = e.target.dataset.ratingVal;
    fill(active);
    callback(active);
  }
}

function getStar(value) {
  document.getElementById("display-star-value").innerHTML = value;
}
Star("#star", 5, getStar);
