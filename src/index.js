import "./styles.css";

var div = document.getElementById("board");
var playerTurn = 0;
var playArray = [];
var id = startTimer();
function startTimer() {
  var width = 100;
  if (width > 0) {
    var elem = document.getElementById("progressbar");
    var id = setInterval(frame, 10);
    function frame() {
      if (width < 0.1) {
        clearInterval(id);
        player();
        startTimer();
      } else {
        width = width - 0.1;
        elem.style.width = width + "%";
        elem.innerHTML = Math.floor(width / 10);
      }
    }
  }
  return id;
}

function onClickTable(event) {
  var who = player();
  clearInterval(id);
  id = startTimer();
  if (who === 1) {
    document.getElementById(event.target.id).innerHTML = "X";
    document
      .getElementById(event.target.id)
      .setAttribute("style", "background-color: #7efc00");
    var cell = event.target.id;
    cell = cell.replace("C", "");
    var rowcolumn = parseInt(cell, 10);
    playArray[rowcolumn] = "X";
    checkWinner("X");
  } else {
    document.getElementById(event.target.id).innerHTML = "Y";
    document
      .getElementById(event.target.id)
      .setAttribute("style", "background-color: #fa8072");
    cell = event.target.id;
    cell = cell.replace("C", "");
    rowcolumn = parseInt(cell, 10);
    playArray[rowcolumn] = "Y";
    checkWinner("Y");
  }
  console.log(event.target.id);
}

function player() {
  if (playerTurn % 2 === 0) {
    playerTurn = playerTurn + 1;
    return 1;
  } else {
    playerTurn = playerTurn + 1;
    return 2;
  }
}

function checkWinner(player) {
  var winningCombos = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [20, 16, 12, 8, 4]
  ];
  for (var win of winningCombos) {
    console.log(win);
    var count = 0;
    for (var index of win) {
      console.log(index);
      if (playArray[index] !== player) {
        break;
      } else {
        count++;
        console.log("count: " + count);
      }
    }
    if (count === 5) {
      if (player === "X") {
        alert("Player 1 won!");
      } else {
        alert("Player 2 won!");
      }
    }
  }
}

div.innerHTML =
  '<table id="board" class="container">\
<tr class="row" id="row1">\
 <td id="C0" class="col s1"></td>\
  <td id="C1" class="col s1"></td>\
  <td id="C2" class="col s1"></td>\
  <td id="C3" class="col s1"></td>\
  <td id="C4" class="col s1"></td>\
</tr>\
<tr class="row" id="row2">\
<td id="C5" class="col s1"></td>\
  <td id="C6" class="col s1"></td>\
  <td id="C7" class="col s1"></td>\
  <td id="C8" class="col s1"></td>\
  <td id="C9" class="col s1"></td>\
</tr>\
<tr class="row" id="row3">\
<td id="C10" class="col s1"></td>\
  <td id="C11" class="col s1"></td>\
  <td id="C12" class="col s1"></td>\
  <td id="C13" class="col s1"></td>\
  <td id="C14" class="col s1"></td>\
</tr>\
<tr class="row" id="row4">\
<td id="C15" class="col s1"></td>\
  <td id="C16" class="col s1"></td>\
  <td id="C17" class="col s1"></td>\
  <td id="C18" class="col s1"></td>\
  <td id="C19" class="col s1"></td>\
</tr>\
<tr class="row" id="row5">\
<td id="C20" class="col s1"></td>\
  <td id="C21" class="col s1"></td>\
  <td id="C22" class="col s1"></td>\
  <td id="C23" class="col s1"></td>\
  <td id="C24" class="col s1"></td>\
</tr>\
</table>';

var rows = document.getElementsByClassName("row");
for (var i = 0; i < rows.length; i++) {
  rows[i].addEventListener(
    "click",
    function (e) {
      onClickTable(e);
    },
    false
  );
}
