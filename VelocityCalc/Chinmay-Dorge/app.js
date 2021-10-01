$(() => {
  let btn = $("#btn");
  let vel = $("#velocity");

  let acc = $("#acc");

  let time = $("#time");
  let v_unit = false,
    a_unit = false,
    t_unit = false;

  let v1 = $("#v1"),
    v2 = $("#v2");

  btn.click(() => {
    $("#mySelectBox1")
      .change(function () {
        $("#mySelectBox1 option:selected").each(function () {
          let fs = $(this).text();
          if (fs == "km/hr") {
            v_unit = true;
          } else {
            v_unit = false;
          }
        });
      })
      .trigger("change");
    $("#mySelectBox2")
      .change(function () {
        $("#mySelectBox2 option:selected").each(function () {
          let fs = $(this).text();
          if (fs == "km/s^2") {
            a_unit = true;
          } else {
            a_unit = false;
          }
        });
      })
      .trigger("change");
    $("#mySelectBox3")
      .change(function () {
        $("#mySelectBox3 option:selected").each(function () {
          let fs = $(this).text();
          if (fs == "hr") {
            t_unit = true;
          } else {
            t_unit = false;
          }
        });
      })
      .trigger("change");

    let t = 0;
    let v = 0;
    let a = 0;

    if (v_unit) {
      v = (5 / 18) * parseFloat(vel.val());
    } else {
      v = parseFloat(vel.val());
    }
    if (a_unit) {
      a = parseFloat(acc.val()) * 1000;
    } else {
      a = parseFloat(acc.val());
    }
    if (t_unit) {
      t = parseFloat(time.val()) * 3600;
    } else {
      t = parseFloat(time.val());
    }

    CalcVelocity(v, a, t);

    function CalcVelocity(v, a, t) {
      let res1 = a * t + v;
      let res2 = res1 * (18 / 5);
      v1.text(`${res2}`);
      v2.text(`${res1}`);
    }
  });
});
