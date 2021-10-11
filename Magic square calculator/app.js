function magicsquare() {
  var constantmatrix = [
    [0, 0, 0, 0],
    [1, -1, -3, 3],
    [-2, 2, 2, -2],
    [1, -1, 1, -1],
  ];

  

  var r11 = document.getElementById("dd").valueAsNumber;
  var r12 = document.getElementById("mm").valueAsNumber;
  var r21 = document.getElementById("yyyy").valueAsNumber;
  var r13 = Math.floor(r21 * 0.01);
  var r14 = r21 - r13 * 100;

   

  var variablematrix = [
    [r11, r12, r13, r14],
    [r14, r13, r12, r11],
    [r12, r11, r14, r13],
    [r13, r14, r11, r12],
  ];

  var result = [];

  for (i = 0; i < variablematrix.length; i++) {
    result[i] = Array(variablematrix.length);
    for (j = 0; j < result[i].length; j++) {
      result[i][j] = variablematrix[i][j] + constantmatrix[i][j];

      if (result[i][j] >= 0 && result[i][j] <= 9) {
        result[i][j] = "0" + result[i][j];
      }
    }
  }

  document.getElementById("r1c1").innerHTML = result[0][0];
  document.getElementById("r1c2").innerHTML = result[0][1];
  document.getElementById("r1c3").innerHTML = result[0][2];
  document.getElementById("r1c4").innerHTML = result[0][3];
  document.getElementById("r2c1").innerHTML = result[1][0];
  document.getElementById("r2c2").innerHTML = result[1][1];
  document.getElementById("r2c3").innerHTML = result[1][2];
  document.getElementById("r2c4").innerHTML = result[1][3];
  document.getElementById("r3c1").innerHTML = result[2][0];
  document.getElementById("r3c2").innerHTML = result[2][1];
  document.getElementById("r3c3").innerHTML = result[2][2];
  document.getElementById("r3c4").innerHTML = result[2][3];
  document.getElementById("r4c1").innerHTML = result[3][0];
  document.getElementById("r4c2").innerHTML = result[3][1];
  document.getElementById("r4c3").innerHTML = result[3][2];
  document.getElementById("r4c4").innerHTML = result[3][3];

  document.getElementById("node").innerHTML =
    "your magic number is:" + (r11 + r12 + r13 + r14) + "<br>" +
     "Add any rows or columns or diagnols the result will be your magic number" +
      "<br>" + "To learn more about ramanujan magic square " +
       '<a href="https://createyourbirthdaymagicsquare.web.app/">Click here</a>';
}
