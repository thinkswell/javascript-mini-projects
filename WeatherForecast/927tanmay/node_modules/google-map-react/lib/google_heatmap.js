"use strict";

exports.__esModule = true;
var generateHeatmap = exports.generateHeatmap = function generateHeatmap(instance, _ref) {
  var positions = _ref.positions;
  return new instance.visualization.HeatmapLayer({
    data: positions.reduce(function (acc, _ref2) {
      var lat = _ref2.lat,
          lng = _ref2.lng,
          _ref2$weight = _ref2.weight,
          weight = _ref2$weight === undefined ? 1 : _ref2$weight;

      acc.push({
        location: new instance.LatLng(lat, lng),
        weight: weight
      });
      return acc;
    }, [])
  });
};

var optionsHeatmap = exports.optionsHeatmap = function optionsHeatmap(instance, _ref3) {
  var _ref3$options = _ref3.options,
      options = _ref3$options === undefined ? {} : _ref3$options;
  return Object.keys(options).map(function (option) {
    return instance.set(option, options[option]);
  });
};