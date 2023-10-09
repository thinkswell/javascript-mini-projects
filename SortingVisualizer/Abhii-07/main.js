const container = document.querySelector(".data-container");
var comp = 0;
document.getElementById("comp").innerHTML = comp;
var sw = 0;
document.getElementById("swap").innerHTML = sw;
function generate() {
  const num = 20;
  for (let i = 0; i < num; i++) {
    const val = (Math.floor(Math.random() * 100) % 100) + 1;
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${val * 3}px`;
    bar.style.transform = `translateX(${i * 30}px)`;
    const barLabel = document.createElement("label");
    barLabel.classList.add("bar_id");
    barLabel.innerHTML = val;
    bar.appendChild(barLabel);
    container.appendChild(bar);
  }
}
function reset() {
  window.location.reload();
}
function swap(val1, val2) {
  return new Promise((resolve) => {
    var temp = val1.style.transform;
    val1.style.transform = val2.style.transform;
    val2.style.transform = temp;
    sw++;
    document.getElementById("swap").innerHTML = sw;
    window.requestAnimationFrame(() => {
      setTimeout(() => {
        container.insertBefore(val2, val1);
        resolve();
      }, 150);
    });
  });
}

async function bubblesort() {
  const delay = 150;
  var bars = document.querySelectorAll(".bar");
  const size = bars.length;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size - i - 1; j++) {
      bars[j].style.backgroundColor = "red";
      bars[j + 1].style.backgroundColor = "red";
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, delay);
      });
      var val1 = parseInt(bars[j].childNodes[0].innerHTML);
      var val2 = parseInt(bars[j + 1].childNodes[0].innerHTML);
      comp++;
      document.getElementById("comp").innerHTML = comp;
      if (val1 > val2) {
        await swap(bars[j], bars[j + 1]);
        bars = document.querySelectorAll(".bar");
      }

      bars[j].style.backgroundColor = "  rgb(24, 190, 255)";
      bars[j + 1].style.backgroundColor = "  rgb(24, 190, 255)";
    }
    bars[size - i - 1].style.backgroundColor = "green";
  }
}

async function selectionsort() {
  const delay = 300;
  let bars = document.querySelectorAll(".bar");
  const size = bars.length;
  var min_ind = 0;
  for (let i = 0; i < size; i++) {
    min_ind = i;
    //bars[i].style.backgroundColor = "darkblue";
    for (let j = i + 1; j < size; j++) {
      bars[j].style.backgroundColor = "red";
      bars[min_ind].style.backgroundColor = "red";
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 300);
      });

      var val1 = parseInt(bars[j].childNodes[0].innerHTML);
      var val2 = parseInt(bars[min_ind].childNodes[0].innerHTML);
      comp++;
      document.getElementById("comp").innerHTML = comp;
      if (val1 < val2) {
        // if(min_ind!=i)
        // {
        //   bars[i].style.backgroundColor =  "  rgb(24, 190, 255)";

        // }
        bars[min_ind].style.backgroundColor = " rgb(24, 190, 255)";
        min_ind = j;
      } else bars[j].style.backgroundColor = " rgb(24, 190, 255)";
    }
    if (min_ind != i) {
      sw++;
      document.getElementById("swap").innerHTML = sw;
    }
    var temp1 = bars[min_ind].style.height;
    var temp2 = bars[min_ind].childNodes[0].innerText;
    bars[min_ind].style.height = bars[i].style.height;
    bars[i].style.height = temp1;
    bars[min_ind].childNodes[0].innerText = bars[i].childNodes[0].innerText;
    bars[i].childNodes[0].innerText = temp2;
    //swap(bars[min_ind], bars[i])
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 150);
    });

    bars[min_ind].style.backgroundColor = "  rgb(24, 190, 255)";
    bars[i].style.backgroundColor = "green";
  }
}

async function insertionsort() {
  let bars = document.querySelectorAll(".bar");
  const size = bars.length;
  bars[0].style.backgroundColor = " rgb(49, 226, 13)";
  for (let i = 1; i < size; i++) {
    var j = i - 1;
    var key = parseInt(bars[i].childNodes[0].innerHTML);
    var barheight = bars[i].style.height;
    bars[i].style.backgroundColor = "red";
    await new Promise((resolve) => {
      setTimeout(() => resolve(), 150);
    });
    while (j >= 0 && parseInt(bars[j].childNodes[0].innerHTML) > key) {
      sw++;
      document.getElementById("swap").innerHTML = sw;
      comp++;
      document.getElementById("comp").innerHTML = comp;
      bars[j].style.backgroundColor = "red";
      bars[j + 1].style.height = bars[j].style.height;
      bars[j + 1].childNodes[0].innerHTML = bars[j].childNodes[0].innerHTML;
      j--;
      await new Promise((resolve) => {
        setTimeout(() => resolve(), 250);
      });
      for (var k = i; k >= 0; k--) {
        bars[k].style.backgroundColor = " rgb(49, 226, 13)";
      }
    }
    comp++;
    document.getElementById("comp").innerHTML = comp;
    bars[j + 1].style.height = barheight;
    bars[j + 1].childNodes[0].innerHTML = key;

    await new Promise((resolve) => {
      setTimeout(() => resolve(), 250);
    });

    bars[i].style.backgroundColor = " rgb(49, 226, 13)";
  }
}
function dis() {
  document.getElementById("btn1").disabled = "true";
  document.getElementById("btn1").style.backgroundColor = "rgb(214, 209, 209);";
  document.getElementById("btn2").disabled = "true";
  document.getElementById("btn2").style.backgroundColor = "rgb(214, 209, 209);";
  document.getElementById("btn5").disabled = "true";
  document.getElementById("btn5").style.backgroundColor = "rgb(214, 209, 209);";
  document.getElementById("btn3").disabled = "true";
  document.getElementById("btn3").style.backgroundColor = "rgb(214, 209, 209);";
}
