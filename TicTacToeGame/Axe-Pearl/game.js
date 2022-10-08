let player1 = "X";
let player2 = "O";
let players =["","","","","","","","",""];
let player_turn = 0;
let rcounter=false;
let winner="";
//let game_counter=0;
let box_number;
let flag=0;
let selected_box;
let winner_combo =[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];
function rplay(){
  reset();
  rcounter=true;
}
function rcountf(){
  check_draw();
  if(flag==0){
  box_number=Math.floor(Math.random()*8);
  for(var i=0;i<9;i++){
    // little difficulty level
    if(players[i]==player2&&players[i+1]==player2){box_number=i+2;}
    else if(players[i-1]==player2&&players[i+1]==player2){box_number=i;}
    else if(players[i+2]==player2&&players[i+1]==player2){box_number=i;}
    else{
      box_number=Math.floor(Math.random()*8);
    }
  }
  if(players[box_number]==""){
    draw(box_number,player2);
  }
  else{
    rcountf();
  }

  }
  check_draw();
  //player_turn++;
}

  /*if(players[box_number]==""){
    draw(box_number,player2);

  }
  else{
    rcountf();
  }
}*/
function playerturn(id){
  //alert(player_turn);
  if(flag==0){
  box_number=id;
  if(player_turn%2==0){
    if(players[id]==""){
      draw(box_number,player1);
      if(rcounter==true){
        player_turn++;
          rcountf();
      }
    }
    else{
      alert("It is already filled,choose other place");
      player_turn--;
    }

  }
  else{
    if(players[id]==""){
      draw(box_number,player2);
    }
    else{
      alert("It is already filled,choose other place");
      player_turn--;
    }
  }
  player_turn++;
}
else{
  alert("Game Over,"+winner+" has won the match,Press Restart/Play with robot to play again");
}
check_draw();
}

function draw(box_number,player){
    selected_box=document.getElementById(box_number);
    selected_box.innerHTML=player;
    players[box_number]=player;
//alert(players[box_number]);
  check_winner();
  check_draw();
}

function check_winner(){
  if(players[0]==player1&&players[1]==player1&&players[2]==player1||
  players[3]==player1&&players[4]==player1&&players[5]==player1||
players[6]==player1&&players[7]==player1&&players[8]==player1||
players[0]==player1&&players[3]==player1&&players[6]==player1||
players[1]==player1&&players[4]==player1&&players[7]==player1||
players[2]==player1&&players[5]==player1&&players[8]==player1||
players[0]==player1&&players[4]==player1&&players[8]==player1||
players[2]==player1&&players[4]==player1&&players[6]==player1){
  //alert("worked");
  document.getElementById("winner").style.visibility="visible";
  //alert(player_turn);
  winner=player1;
  flag=1;
}
else if(players[0]==player2&&players[1]==player2&&players[2]==player2||
players[3]==player2&&players[4]==player2&&players[5]==player2||
players[6]==player2&&players[7]==player2&&players[8]==player2||
players[0]==player2&&players[3]==player2&&players[6]==player2||
players[1]==player2&&players[4]==player2&&players[7]==player2||
players[2]==player2&&players[5]==player2&&players[8]==player2||
players[0]==player2&&players[4]==player2&&players[8]==player2||
players[2]==player2&&players[4]==player2&&players[6]==player2){
  document.getElementById("winner").innerHTML="O has won the game";
  document.getElementById("winner").style.visibility="visible";
  winner=player2;
  flag=1;
//break;
}
}
function check_draw(){
  if(player_turn>=9&&winner==""){
    document.getElementById("winner").innerHTML=" MATCH DRAW";
    document.getElementById("winner").style.visibility="visible";

  }
}

function reset(){
  players =["","","","","","","","",""];
  for(var i=0;i<9;i++){
    selected_box=document.getElementById(i);
    selected_box.innerHTML="";
  }
  flag=0;rcounter=false;
  player_turn = 0;
  document.getElementById("winner").innerHTML="X has won the game";

 document.getElementById("winner").style.visibility="hidden";
}
