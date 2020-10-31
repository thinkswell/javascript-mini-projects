const cnvsWidth = 1200;
const cnvsHeight = 600;
const cnvsLength = cnvsWidth;
const centreOfX = cnvsWidth / 2;
const centreOfY = cnvsHeight / 2;
const shipFromCenter = centreOfY / 2;

// Converts angle degree to radians
function convertToRadians(degree) {
  return degree * (Math.PI / 180);
}

function getActualAngle(angle) {
  if (angle >= 0 && angle < 270) {
    return angle + 90;
  } else if (angle >= 270) {
    return angle - 270;
  } else if (angle >= -90 && angle < 0) {
    return 360 + angle - 270;
  } else {
    return 360 + angle;
  }
}

// Get the cosine values associated with angle
function getAngleNumber(angle) {
  const angleInRadians = (angle * Math.PI) / 180;
  return [Math.cos(angleInRadians), Math.sin(angleInRadians)];
}

// Creates array with all possible X and Y coordinates associated with angle
function getAllPossibleShipLocations() {
  let shipLocations = {};
  function getXShipValue(angle) {
    let actualAngle = getActualAngle(angle);
    if (actualAngle >= 0 && actualAngle <= 360) {
      return getAngleNumber(angle)[0];
    } else {
      return -getAngleNumber(angle)[0];
    }
  }
  function getYShipValue(angle) {
    let actualAngle = getActualAngle(angle);
    if (actualAngle >= 0 && actualAngle <= 360) {
      return getAngleNumber(angle)[1];
    } else {
      return -getAngleNumber(angle)[1];
    }
  }
  function generateX(angle) {
    let shipValue = getXShipValue(angle) * shipFromCenter;
    return centreOfX + shipValue;
  }
  function generateY(angle) {
    let shipValue = getYShipValue(angle) * shipFromCenter;
    return centreOfY + shipValue;
  }
  for (i = 0; i < 360; i++) {
    let angleKey = i.toString();
    shipLocations[angleKey] = [generateX(i), generateY(i)];
  }
  return shipLocations;
}

// Returns getAllPossibleShipLocations with angle as array index key
function getShipLocation(angle) {
  function getActualAngle(angle) {
    if (angle >= 0 && angle < 270) {
      return angle + 90;
    } else if (angle >= 270) {
      return angle - 270;
    } else if (angle >= -90 && angle < 0) {
      return 360 + angle - 270;
    } else {
      return 360 + angle + 90;
    }
  }
  let actualAngle = getActualAngle(angle).toString();
  return getAllPossibleShipLocations()[actualAngle];
}
