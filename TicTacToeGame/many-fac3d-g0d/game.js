'use strict';

const _ = document,
cols = Array.from(_.querySelectorAll('.board > span')),
reset = _.querySelector('#reset');
let cur = true;
let arr = new Array(9).fill(null);
const wins = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]];

function event(can) {
  reset.addEventListener('click', fnreset);
  for (let col of cols)
  if (can)
  col.addEventListener('click', play);else

  col.removeEventListener('click', play);
}
event(true);
function play(e) {
  const __ = e.target;
  if (!__.innerHTML) {
    cur = !cur;
    __.innerHTML = cur ? '<h1 name="O">O</h1>' : '<h1 name="X">X</h1>';
    move(parseInt(__.id.split(/\D+/g)[1]), __.childNodes[0].getAttribute('name'));
  }
}

function move(ind, sign) {
  arr[ind] = sign;
  console.log(arr);

  for (let i = 0; i < wins.length; i++) {
    let [a, b, c] = wins[i];
    if (cmp(arr[a], arr[b], arr[c])) {
      console.log(sign, ' wins');
      event(false);
      cols[a].classList.add('win');
      cols[b].classList.add('win');
      cols[c].classList.add('win');
      window.alert(`Player ${sign} has won`);
      break;
    }
  }
}
function cmp(a, b, c) {
  if (a && b && c)
  return a === b && a === c && b === c;
}

function fnreset() {
  for (let col of cols) {
    col.classList.remove('win');
    col.innerHTML = '';
  }
  arr = new Array(9).fill(null);
  event(true);
}
