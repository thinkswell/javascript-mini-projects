'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.convertNeSwToNwSe = convertNeSwToNwSe;
exports.convertNwSeToNeSw = convertNwSeToNeSw;
exports.fitBounds = fitBounds;
exports.meters2ScreenPixels = meters2ScreenPixels;
exports.tile2LatLng = tile2LatLng;
exports.latLng2Tile = latLng2Tile;
exports.getTilesIds = getTilesIds;

var _log = require('./math/log2');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GOOGLE_TILE_SIZE = 256;

function latLng2World(_ref) {
  var lat = _ref.lat,
      lng = _ref.lng;

  var sin = Math.sin(lat * Math.PI / 180);
  var x = lng / 360 + 0.5;
  var y = 0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI;

  y = y < 0 // eslint-disable-line
  ? 0 : y > 1 ? 1 : y;
  return { x: x, y: y };
}

function world2LatLng(_ref2) {
  var x = _ref2.x,
      y = _ref2.y;

  var n = Math.PI - 2 * Math.PI * y;

  // TODO test that this is faster
  // 360 * Math.atan(Math.exp((180 - y * 360) * Math.PI / 180)) / Math.PI - 90;
  return {
    lat: 180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))),
    lng: x * 360 - 180
  };
}

// Thank you wiki https://en.wikipedia.org/wiki/Geographic_coordinate_system
function latLng2MetersPerDegree(_ref3) {
  var lat = _ref3.lat;

  var phi = lat * Math.PI / 180;
  var metersPerLatDegree = 111132.92 - 559.82 * Math.cos(2 * phi) + 1.175 * Math.cos(4 * phi) - 0.0023 * Math.cos(6 * phi);
  var metersPerLngDegree = 111412.84 * Math.cos(phi) - 93.5 * Math.cos(3 * phi) + 0.118 * Math.cos(5 * phi);
  return { metersPerLatDegree: metersPerLatDegree, metersPerLngDegree: metersPerLngDegree };
}

function meters2LatLngBounds(meters, _ref4) {
  var lat = _ref4.lat,
      lng = _ref4.lng;

  var _latLng2MetersPerDegr = latLng2MetersPerDegree({
    lat: lat
  }),
      metersPerLatDegree = _latLng2MetersPerDegr.metersPerLatDegree,
      metersPerLngDegree = _latLng2MetersPerDegr.metersPerLngDegree;

  var latDelta = 0.5 * meters / metersPerLatDegree;
  var lngDelta = 0.5 * meters / metersPerLngDegree;

  return {
    nw: {
      lat: lat - latDelta,
      lng: lng - lngDelta
    },
    se: {
      lat: lat + latDelta,
      lng: lng + lngDelta
    }
  };
}

function meters2WorldSize(meters, _ref5) {
  var lat = _ref5.lat,
      lng = _ref5.lng;

  var _meters2LatLngBounds = meters2LatLngBounds(meters, { lat: lat, lng: lng }),
      nw = _meters2LatLngBounds.nw,
      se = _meters2LatLngBounds.se;

  var nwWorld = latLng2World(nw);
  var seWorld = latLng2World(se);
  var w = Math.abs(seWorld.x - nwWorld.x);
  var h = Math.abs(seWorld.y - nwWorld.y);

  return { w: w, h: h };
}

function fitNwSe(nw, se, width, height) {
  var EPS = 0.000000001;
  var nwWorld = latLng2World(nw);
  var seWorld = latLng2World(se);
  var dx = nwWorld.x < seWorld.x ? seWorld.x - nwWorld.x : 1 - nwWorld.x + seWorld.x;
  var dy = seWorld.y - nwWorld.y;

  if (dx <= 0 && dy <= 0) {
    return null;
  }

  var zoomX = (0, _log2.default)(width / GOOGLE_TILE_SIZE / Math.abs(dx));
  var zoomY = (0, _log2.default)(height / GOOGLE_TILE_SIZE / Math.abs(dy));
  var zoom = Math.floor(EPS + Math.min(zoomX, zoomY));

  // TODO find center just unproject middle world point
  var middle = {
    x: nwWorld.x < seWorld.x // eslint-disable-line
    ? 0.5 * (nwWorld.x + seWorld.x) : nwWorld.x + seWorld.x - 1 > 0 ? 0.5 * (nwWorld.x + seWorld.x - 1) : 0.5 * (1 + nwWorld.x + seWorld.x),
    y: 0.5 * (nwWorld.y + seWorld.y)
  };

  var scale = Math.pow(2, zoom);
  var halfW = width / scale / GOOGLE_TILE_SIZE / 2;
  var halfH = height / scale / GOOGLE_TILE_SIZE / 2;

  var newNW = world2LatLng({
    x: middle.x - halfW,
    y: middle.y - halfH
  });

  var newSE = world2LatLng({
    x: middle.x + halfW,
    y: middle.y + halfH
  });

  return {
    center: world2LatLng(middle),
    zoom: zoom,
    newBounds: {
      nw: newNW,
      se: newSE
    }
  };
}

function convertNeSwToNwSe(_ref6) {
  var ne = _ref6.ne,
      sw = _ref6.sw;

  return {
    nw: {
      lat: ne.lat,
      lng: sw.lng
    },
    se: {
      lat: sw.lat,
      lng: ne.lng
    }
  };
}

function convertNwSeToNeSw(_ref7) {
  var nw = _ref7.nw,
      se = _ref7.se;

  return {
    ne: {
      lat: nw.lat,
      lng: se.lng
    },
    sw: {
      lat: se.lat,
      lng: nw.lng
    }
  };
}

function fitBounds(_ref8, _ref9) {
  var nw = _ref8.nw,
      se = _ref8.se,
      ne = _ref8.ne,
      sw = _ref8.sw;
  var width = _ref9.width,
      height = _ref9.height;

  var fittedData = void 0;

  if (nw && se) {
    fittedData = fitNwSe(nw, se, width, height);
  } else {
    var calculatedNwSe = convertNeSwToNwSe({ ne: ne, sw: sw });
    fittedData = fitNwSe(calculatedNwSe.nw, calculatedNwSe.se, width, height);
  }

  return _extends({}, fittedData, {
    newBounds: _extends({}, fittedData.newBounds, convertNwSeToNeSw(fittedData.newBounds))
  });
}

// -------------------------------------------------------------------
// Helpers to calc some markers size

function meters2ScreenPixels(meters, _ref10, zoom) {
  var lat = _ref10.lat,
      lng = _ref10.lng;

  var _meters2WorldSize = meters2WorldSize(meters, { lat: lat, lng: lng }),
      w = _meters2WorldSize.w,
      h = _meters2WorldSize.h;

  var scale = Math.pow(2, zoom);
  var wScreen = w * scale * GOOGLE_TILE_SIZE;
  var hScreen = h * scale * GOOGLE_TILE_SIZE;
  return {
    w: wScreen,
    h: hScreen
  };
}

// --------------------------------------------------
// Helper functions for working with svg tiles, (examples coming soon)

function tile2LatLng(_ref11, zoom) {
  var x = _ref11.x,
      y = _ref11.y;

  var n = Math.PI - 2 * Math.PI * y / Math.pow(2, zoom);

  return {
    lat: 180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))),
    lng: x / Math.pow(2, zoom) * 360 - 180
  };
}

function latLng2Tile(_ref12, zoom) {
  var lat = _ref12.lat,
      lng = _ref12.lng;

  var worldCoords = latLng2World({ lat: lat, lng: lng });
  var scale = Math.pow(2, zoom);

  return {
    x: Math.floor(worldCoords.x * scale),
    y: Math.floor(worldCoords.y * scale)
  };
}

function getTilesIds(_ref13, zoom) {
  var from = _ref13.from,
      to = _ref13.to;

  var scale = Math.pow(2, zoom);

  var ids = [];
  for (var x = from.x; x !== (to.x + 1) % scale; x = (x + 1) % scale) {
    for (var y = from.y; y !== (to.y + 1) % scale; y = (y + 1) % scale) {
      ids.push([zoom, x, y]);
    }
  }

  return ids;
}