class Sorting {
  constructor() {
    this.array = [];
    this.animating = false;
    this.sorted = false;

    for (let i = 0; i < $(".bar a").length; i++) {
      this.array.push(parseFloat($(".bar a")[i].text));
    }
  }

  setWidths() {
    let largestNumber = Math.max(...this.array);
    let percentArray = [];

    this.array.forEach((element) => {
      percentArray.push((element * 70) / largestNumber);
    });

    percentArray.forEach((element, index) => {
      $($(".bar")[index]).width(element + "%");
    });
  }

  clearColor() {
    for (let i = 0; i < this.array.length; i++) {
      var rgb = $($(".bar")[i]).css("backgroundColor").match(/\d+/g);
      var hex =
        "#" +
        Number(rgb[0]).toString(16) +
        Number(rgb[1]).toString(16) +
        Number(rgb[2]).toString(16);
      if (hex != "#0800") $($(".bar")[i]).css("background-color", "white");
    }
  }

  clearAllColor() {
    for (let i = 0; i < this.array.length; i++) {
      $($(".bar")[i]).css("background-color", "#008000");
    }
  }

  highlight(index1, index2) {
    this.clearColor();
    const clickedDiv = $($(".bar")[index1]);
    const otherDiv = $($(".bar")[index2]);
    clickedDiv.css("background", "yellow");
    otherDiv.css("background", "red");
  }

  switchPlaces(index1, index2, p) {
    this.clearColor();

    if (index1 > index2) {
      var temp = index2;
      index2 = index1;
      index1 = temp;
    }

    const clickedDiv = $($(".bar")[index1]);
    const otherDiv = $($(".bar")[index2]);

    const distanceBetweenDivs = index2 - index1;
    const distance = $(clickedDiv).outerHeight() * distanceBetweenDivs + 10;

    this.animating = true;
    clickedDiv.css("background", "#7da9f0");
    otherDiv.css("background", "#7da9f0");

    $.when(
      clickedDiv.animate(
        {
          top: distance,
        },
        100
      ),
      otherDiv.animate(
        {
          top: -distance,
        },
        100
      )
    ).done(function () {
      otherDiv.css("top", "0px");
      clickedDiv.css("top", "0px");
      clickedDiv.insertAfter($($(".bar")[index2]));
      otherDiv.insertBefore($($(".bar")[index1]));
      this.animating = false;
      clickedDiv.css("background", "white");
      otherDiv.css("background", "white");
      if (p != -1) {
        const finalDiv = $($(".bar")[p]);
        finalDiv.css("background", "#008000");
      }
    });
  }

  applyChanges(indices) {
    indices.push([-1, -1, false]);
    var count = 0;

    const loop = setInterval(() => {
      if (indices[count][0] == -1) this.clearAllColor();
      else if (indices[count][2] == true)
        this.switchPlaces(indices[count][0], indices[count][1], -1);
      else if (indices[count][2] == "final")
        this.switchPlaces(
          indices[count][0],
          indices[count][1],
          indices[count][1]
        );
      else if (indices[count][2] == "notSwap")
        $($(".bar")[indices[count][1]]).css("background-color", "#008000");
      else this.highlight(indices[count][0], indices[count][1]);

      count++;
      if (!indices[count]) {
        this.clearAllColor();
        clearInterval(loop);
      }
    }, 1500 / $("#speed").val());
  }

  linearSort() {
    let indices = [];
    var newArray = [...this.array];
    let len = newArray.length;
    if (!this.sorted) {
      for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
          indices.push([i, j, false]);
          if (newArray[i] > newArray[j]) {
            let temp = newArray[i];
            newArray[i] = newArray[j];
            newArray[j] = temp;

            indices.push([i, j, true]);
          }
          if (j == len - 1) indices.push([j, i, "notSwap"]);
        }
      }
      this.applyChanges(indices);
      this.sorted = true;
    } else {
      alert("Already sorted");
    }
  }

  quickSort() {
    let indices = [];
    var A = [...this.array];
    let len = A.length;
    if (!this.sorted) {
      var g, lb, ub, e, f, pp, i, j, k;
      lb = 0;
      ub = len - 1;
      var stack1 = [];
      stack1.push([lb, ub]);
      while (stack1.length > 0) {
        k = stack1.pop();
        lb = k[0];
        ub = k[1];
        e = lb;
        f = ub;
        while (1) {
          while (e < ub && A[e] <= A[lb]) {
            indices.push([lb, e, false]);
            e++;
          }
          while (A[f] > A[lb]) {
            indices.push([lb, f, false]);
            f--;
          }
          if (e < f) {
            indices.push([e, f, true]);
            g = A[e];
            A[e] = A[f];
            A[f] = g;
          } else {
            indices.push([lb, f, "final"]);
            g = A[lb];
            A[lb] = A[f];
            A[f] = g;
            pp = f;
            break;
          }
        }
        if (pp + 1 < ub) stack1.push([pp + 1, ub]);
        if (pp - 1 >= lb) stack1.push([lb, pp - 1]);
      }
      this.applyChanges(indices);
      this.sorted = true;
    } else {
      alert("Already sorted");
    }
  }

  bubbleSort() {
    let indices = [];
    var newArray = [...this.array];
    let len = newArray.length;
    if (!this.sorted) {
      for (let i = len - 2; i > 0; i--) {
        for (let j = 0; j <= i; j++) {
          indices.push([j, j + 1, false]);
          if (newArray[j] > newArray[j + 1]) {
            let temp = newArray[j];
            newArray[j] = newArray[j + 1];
            newArray[j + 1] = temp;
            indices.push([j, j + 1, true]);
          }
          if (j == i) indices.push([j, i + 1, "notSwap"]);
        }
      }
      this.applyChanges(indices);
      this.sorted = true;
    } else {
      alert("Already sorted");
    }
  }

  selectionSort() {
    let indices = [];
    var newArray = [...this.array];
    let len = newArray.length;
    if (!this.sorted) {
      for (let i = 0; i < len; i++) {
        let min = i;
        for (let j = i + 1; j < len; j++) {
          if (min != j) {
            indices.push([min, j, false]);
          }
          if (newArray[min] > newArray[j]) {
            min = j;
          }
        }

        if (min !== i) {
          indices.push([min, i, "final"]);
          let tmp = newArray[i];
          newArray[i] = newArray[min];
          newArray[min] = tmp;
        }
      }
      this.applyChanges(indices);
      this.sorted = true;
    } else {
      alert("Already sorted");
    }
  }
}

const sorting = new Sorting();
sorting.setWidths();
var t = 10;

const generateNumbers = () => {
  let array = [];
  if ($("#noe").val() != "") t = $("#noe").val();
  var container = $("#element");
  container.empty();
  for (let i = 0; i < t; i++) {
    var num = Math.floor(Math.random() * 100) + 1;
    var elem =
      " <div id=var" + (i + 1) + "  class=bar><a>" + num + "</a></div>";
    container.append(elem);
    array.push(num);
  }
  sorting.array = array;
  sorting.sorted = false;
  sorting.setWidths();
};

$("#bubble-sort").on("click", () => {
  $("#title").html("Bubble Sort");
});
$("#selection-sort").on("click", () => {
  $("#title").html("Selection Sort");
});
$("#linear-sort").on("click", () => {
  $("#title").html("Linear Sort");
});
$("#quick-sort").on("click", () => {
  $("#title").html("Quick Sort");
});

const start = () => {
  switch ($("#title").text()) {
    case "Linear Sort":
      sorting.linearSort();
      break;
    case "Bubble Sort":
      sorting.bubbleSort();
      break;
    case "Selection Sort":
      sorting.selectionSort();
      break;
    case "Quick Sort":
      sorting.quickSort();
      break;
    default:
      alert("Please choose an algorithm to visualize");
  }
};
