'use strict';

exports.__esModule = true;
exports.default = addPassiveEventListener;
// feature detection for passive support
// see: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
function hasPassiveSupport() {
  var passiveSupported = false;

  try {
    var options = Object.defineProperty({}, 'passive', {
      get: function get() {
        passiveSupported = true;
      }
    });

    window.addEventListener('test', options, options);
    window.removeEventListener('test', options, options);
  } catch (err) {
    passiveSupported = false;
  }

  return passiveSupported;
}

function addPassiveEventListener(element, eventName, func, capture) {
  element.addEventListener(eventName, func, hasPassiveSupport() ? {
    capture: capture,
    passive: true
  } : capture);
}