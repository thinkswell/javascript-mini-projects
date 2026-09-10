/**
 * DataSource: manages slide data and circular navigation logic.
 * Acts as a pure "black box" for state — no DOM or UI knowledge.
 */
const DataSource = (() => {
  const slides = [
    { id: 1, color: "#ff4444", text: "SLIDE 1" },
    { id: 2, color: "#44ff44", text: "SLIDE 2" },
    { id: 3, color: "#4444ff", text: "SLIDE 3" },
  ];

  let currentIndex = 0;

  return {
    /** Returns the current slide object */
    getCurrent: () => slides[currentIndex],

    /** Moves to the next slide with wrap-around */
    getNext: () => {
      currentIndex = (currentIndex + 1) % slides.length;
      return slides[currentIndex];
    },

    /** Moves to the previous slide with wrap-around */
    getPrev: () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      return slides[currentIndex];
    },
  };
})();

/**
 * SlideRenderer: transforms slide data into a DOM element.
 * Pure rendering logic — no state or event handling.
 */
const SlideRenderer = {
  render: (slide) => {
    const div = document.createElement("div");
    div.style.width = "100%";
    div.style.height = "100%";
    div.style.backgroundColor = slide.color;
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.color = "#fff";
    div.style.fontSize = "40px";
    div.style.fontFamily = "Arial, sans-serif";
    div.textContent = slide.text;
    return div;
  },
};

/**
 * SliderController: orchestrates user interactions and updates the view.
 * Bridges DataSource and SlideRenderer; handles event listeners.
 */
const SliderController = (() => {
  const container = document.getElementById("sliderContainer");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  const renderCurrent = () => {
    container.innerHTML = ""; // simple re-render for clarity
    const slide = DataSource.getCurrent();
    const el = SlideRenderer.render(slide);
    container.appendChild(el);
  };

  nextBtn.addEventListener("click", () => {
    DataSource.getNext();
    renderCurrent();
  });

  prevBtn.addEventListener("click", () => {
    DataSource.getPrev();
    renderCurrent();
  });

  return { init: renderCurrent };
})();

// Initialize slider on load
SliderController.init();
