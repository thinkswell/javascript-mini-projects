$(document).ready(function () {
  // State
  const state = {
    selectedElement: "box",
    selectedColor: "#3498db",
    // Store colors and opacity for each element type
    elements: {
      box: { color: "#3498db", opacity: 100 },
      heading: { color: "#FFFFFF", opacity: 100 },
      text: { color: "#FFFFFF", opacity: 100 },
      "button-primary": { color: "#3498db", opacity: 100 },
      "button-secondary": { color: "#2ecc71", opacity: 100 },
      "button-accent": { color: "#e74c3c", opacity: 100 },
      border: { color: "", opacity: 100 },
    },
    savedColors: [],
  };

  // Cache DOM elements
  const $colorPicker = $("#color-picker");
  const $colorCode = $("#color-code");
  const $opacitySlider = $("#opacity-slider");
  const $opacityValue = $("#opacity-value");
  const $elementItems = $(".element-item");
  const $colorSwatches = $(".color-swatch");
  const $saveColorBtn = $("#save-color");
  const $savedColorsContainer = $("#saved-colors");

  // Preview elements
  const $boxPreview = $("#box-preview");
  const $headingPreview = $("#heading-preview");
  const $textPreview = $("#text-preview");
  const $buttonPrimaryPreview = $("#button-primary-preview");
  const $buttonSecondaryPreview = $("#button-secondary-preview");
  const $buttonAccentPreview = $("#button-accent-preview");

  // Helper functions
  function hexToRgba(hex, opacity) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
  }

  function getColorWithOpacity(color, opacity) {
    return opacity === 100 ? color : hexToRgba(color, opacity);
  }

  function updatePreview() {
    // Apply all saved element colors with their respective opacities
    Object.keys(state.elements).forEach((key) => {
      const element = state.elements[key];
      if (!element.color) return;

      const colorWithOpacity = getColorWithOpacity(
        element.color,
        element.opacity
      );

      switch (key) {
        case "box":
          $boxPreview.css("backgroundColor", colorWithOpacity);
          break;
        case "heading":
          $headingPreview.css("color", colorWithOpacity);
          break;
        case "text":
          $textPreview.css("color", colorWithOpacity);
          break;
        case "button-primary":
          $buttonPrimaryPreview.css("backgroundColor", colorWithOpacity);
          break;
        case "button-secondary":
          $buttonSecondaryPreview.css("backgroundColor", colorWithOpacity);
          break;
        case "button-accent":
          $buttonAccentPreview.css("backgroundColor", colorWithOpacity);
          break;
        case "border":
          if (element.color) {
            $boxPreview.css("border", `3px solid ${colorWithOpacity}`);
          } else {
            $boxPreview.css("border", "");
          }
          break;
      }
    });
  }

  function renderSavedColors() {
    $savedColorsContainer.empty();

    state.savedColors.forEach(function (color, index) {
      const $savedColor = $("<div>").addClass("saved-color");

      const $colorSwatch = $("<div>")
        .addClass("saved-color-swatch")
        .css("backgroundColor", color)
        .attr("title", "Click to use this color")
        .on("click", function () {
          selectColor(color);
        });

      const $colorCode = $("<div>").addClass("saved-color-code").text(color);

      const $deleteBtn = $("<button>")
        .addClass("delete-color")
        .text("×")
        .attr("title", "Delete this color")
        .on("click", function () {
          state.savedColors.splice(index, 1);
          renderSavedColors();
        });

      $savedColor.append($colorSwatch, $colorCode, $deleteBtn);
      $savedColorsContainer.append($savedColor);
    });
  }

  function selectElement(element) {
    state.selectedElement = element;

    // Update UI
    $elementItems.removeClass("selected");
    $(`.element-item[data-element="${element}"]`).addClass("selected");

    // Update color picker and input to show the current element's color
    const currentElement = state.elements[element];
    const currentColor = currentElement.color || "#3498db";

    $colorPicker.val(currentColor);
    $colorCode.val(currentColor);
    state.selectedColor = currentColor;

    // Update opacity slider
    $opacitySlider.val(currentElement.opacity);
    $opacityValue.text(`${currentElement.opacity}%`);

    // Update selected swatch in the palette
    $colorSwatches.removeClass("selected");
    $(`.color-swatch[data-color="${currentColor}"]`).addClass("selected");

    updatePreview();
  }

  function selectColor(color) {
    state.selectedColor = color;

    // Save the color for the currently selected element
    if (state.elements[state.selectedElement]) {
      state.elements[state.selectedElement].color = color;
    }

    // Update UI
    $colorPicker.val(color);
    $colorCode.val(color);

    $colorSwatches.removeClass("selected");
    $(`.color-swatch[data-color="${color}"]`).addClass("selected");

    updatePreview();
  }

  function updateOpacity(opacity) {
    // Save the opacity for the currently selected element
    if (state.elements[state.selectedElement]) {
      state.elements[state.selectedElement].opacity = opacity;
    }

    $opacityValue.text(`${opacity}%`);
    updatePreview();
  }

  function saveCurrentColor() {
    const colorToSave = state.selectedColor;

    // Check if color already exists in saved colors
    if (!state.savedColors.includes(colorToSave)) {
      state.savedColors.push(colorToSave);
      renderSavedColors();
    }
  }

  // Event listeners
  $elementItems.on("click", function () {
    selectElement($(this).data("element"));
  });

  $colorSwatches.on("click", function () {
    selectColor($(this).data("color"));
  });

  $colorPicker.on("input", function () {
    selectColor($(this).val());
  });

  $colorCode.on("input", function () {
    const colorValue = $(this).val();
    if (/^#[0-9A-F]{6}$/i.test(colorValue)) {
      selectColor(colorValue);
    }
  });

  $opacitySlider.on("input", function () {
    updateOpacity(parseInt($(this).val()));
  });

  $saveColorBtn.on("click", saveCurrentColor);

  // Initialize
  updatePreview();
  renderSavedColors();

  // Load URL parameters
  function loadFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);

    // Helper function to load element properties from URL
    const loadElementFromUrl = (element, colorParam, opacityParam) => {
      if (urlParams.has(colorParam)) {
        state.elements[element].color = "#" + urlParams.get(colorParam);
      }
      if (urlParams.has(opacityParam)) {
        state.elements[element].opacity = parseInt(urlParams.get(opacityParam));
      }
    };

    // Load saved colors for elements if specified in URL
    loadElementFromUrl("box", "boxColor", "boxOpacity");
    loadElementFromUrl("heading", "headingColor", "headingOpacity");
    loadElementFromUrl("text", "textColor", "textOpacity");
    loadElementFromUrl("button-primary", "primaryColor", "primaryOpacity");
    loadElementFromUrl(
      "button-secondary",
      "secondaryColor",
      "secondaryOpacity"
    );
    loadElementFromUrl("button-accent", "accentColor", "accentOpacity");
    loadElementFromUrl("border", "borderColor", "borderOpacity");

    // Set current selection
    if (urlParams.has("element")) {
      selectElement(urlParams.get("element"));
    }

    updatePreview();
  }

  loadFromUrl();
});
