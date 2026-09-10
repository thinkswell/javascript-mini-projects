# Infinite Image Slider

A modular infinite slider implementation in plain HTML/CSS/JS.

## Architecture Overview

The project follows a clear separation of concerns, treating each module as a "black box":

- **DataSource**: Manages slide list and circular index logic. No DOM knowledge.
- **SlideRenderer**: Converts slide data into DOM elements. Pure rendering.
- **SliderController**: Handles events and coordinates updates between data and view.

This design makes the code easy to test, extend, and maintain.

## How to Run

Open `index.html` in a browser. For reliable local testing, color blocks are used instead of external images.

## Contribution

- This PR closes #954.
- Author: MELS1922
