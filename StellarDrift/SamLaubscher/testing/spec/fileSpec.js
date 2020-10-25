// Radians conversion from angle used for rotation
describe("Radians conversion", function () {
  beforeEach(function () {
    angle = 90;
  });

  describe("Generate radian from angle value 90", function () {
    it("should return 1.5707963267948966", function () {
      expect(convertToRadians(angle)).toEqual(1.5707963267948966);
    });
  });
  describe("Generate radian from angle value 160", function () {
    it("should return 2.792526803190927", function () {
      expect(convertToRadians(160)).toEqual(2.792526803190927);
    });
  });
  describe("Generate radian from angle value 274", function () {
    it("should return 4.782202150464463", function () {
      expect(convertToRadians(274)).toEqual(4.782202150464463);
    });
  });
});

// Angle cosine array tests on getAngleNumber()
describe("Angle cosine array", function () {
  beforeEach(function () {
    angle = 0;
  });
  describe("Generate cosine angle values for 0", function () {
    it("should return [1.0, 0.0]", function () {
      expect(getAngleNumber(angle)).toEqual([1.0, 0.0]);
    });
  });
  describe("Generate cosine angle values for 120", function () {
    it("should return [-0.4999999999999998, 0.8660254037844387]", function () {
      expect(getAngleNumber(120)).toEqual([
        -0.4999999999999998,
        0.8660254037844387,
      ]);
    });
  });
  describe("Generate cosine angle values for 258", function () {
    it("should return [-0.2079116908177598, -0.9781476007338056]", function () {
      expect(getAngleNumber(258)).toEqual([
        -0.2079116908177598,
        -0.9781476007338056,
      ]);
    });
  });
});

// Angle locations array index key tests on getShipLocation()
describe("Angle locations array index key", function () {
  beforeEach(function () {
    angle = 0;
  });

  describe("Calls angle 0 as index key on locations array", function () {
    it("should return [600, 450]", function () {
      expect(getShipLocation(angle)).toEqual([600, 450]);
    });
  });

  describe("Calls angle 90 as index key on locations array", function () {
    it("should return [450, 300]", function () {
      expect(getShipLocation(90)).toEqual([450, 300]);
    });
  });
  describe("Calls angle 200 as index key on locations array", function () {
    it("should return [651.3030214988502, 159.04610688211372]", function () {
      expect(getShipLocation(200)).toEqual([
        651.3030214988502,
        159.04610688211372,
      ]);
    });
  });
});
