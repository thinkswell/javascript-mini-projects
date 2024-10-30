/*variables stored for games data*/
var plot;
var bigsquareConcluded;
var numOfBSConcluded;
var previousBSID;
var movesPlayed;
var Human = "X";
var Bot = "O";
var Player = "X";

const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

/*Selecting all tiles elements in a array */
startGame();
/*this variables are elements in array form for tiles and bigsquares. tiles being 0 to 80 indexed and bigsquares being 0 to 8 indexed*/
var tiles;
var BIGsquares;


function startGame() {
	/*giving values to some variables such as Player and putting tiles and bigsquares elements to further refrence them. */
	Player = "X";
	BIGsquares = document.querySelectorAll('.MS');
	tiles = document.querySelectorAll('.Tile');
	/*variable to store no. of moves so that check function only checks after certain move */
	movesPlayed = 0;
	/*clears the previous game conlusion display or hides it*/
	document.querySelectorAll(".Conclusion")[0].style.display = "none";
	/*giving plot 81 values to store*/
	plot = [];
	for(var i=0; i<81; ++i) plot.push(null);
	/*the bigsqaures which are concluded like x wins or o wins or tie is stored in this 9 size array*/
	bigsquareConcluded = [];
	for(var i=0; i<9; ++i) {
		bigsquareConcluded.push(null);
		BIGsquares[i].style.backgroundColor = "grey";
	}

	/*preparing the tiles for the game */
	for (var j = 0; j < tiles.length; j++) {
		/*Clearing all x and o inside p element inside tiles 1 by 1 through looping */
		tiles[j].children[0].innerText = '';
		/*adding click event to all tiles in start of game */
		tiles[j].addEventListener('click', clickEvent, false);
		tiles[j].addEventListener('mouseover', mouseEvent1, false);
		tiles[j].addEventListener('mouseout',mouseEvent2,false);
		tiles[j].style.cursor = "pointer";
		tiles[j].style.backgroundColor = "#ffd304";
	}
}





/*everytime a tile is clicked this function gets executed*/
function clickEvent(tile) {
	/*updates the moves played each time tile is clicked */
	movesPlayed = movesPlayed + 1;
	/*gets the first class name of the tile clicked for example S1 */
	var tileID = tile.target.classList.item(0);
	/* separates tileID string s so that only index is left*/
	var extracted_tileID = tileID.replace("S","");
	/*saving the move played in the plot variable for further functional operations*/
	plot[extracted_tileID] = Human;
	console.log(extracted_tileID+"Human")
	
	/*selects the tile clicked and pastes x or o depending on the turn in the corresponding tile clicked*/
	var x = document.querySelectorAll('.'+tileID)[0];
	x.children[0].innerText = Human;
	x.style.backgroundColor = (Human == "X")? "#913ac5": "#48845e";
	
	/*Check Functions for tiles wins or tie...first checks for win if not then checks for tie and stores the return values in temp1*/
	var temp1 = (checkWinTiles(Human,extracted_tileID,plot)[0]!=null)? checkWinTiles(Human,extracted_tileID,plot): checkTieTiles(Human,extracted_tileID,plot);

		/*if temp1 has value that is not null means its a win or tie*/
		if (temp1[1] != null) {
				/*stores the conclusion in this variable for further functional operation */
				bigsquareConcluded[temp1[1]] = temp1[0];
				/*highlights the BS with the corresponding color for x or o or t means tie*/
				BIGsquares[temp1[1]].style.backgroundColor = (temp1[0] == "X")? "#0000d7" : (temp1[0] == "O")? "#4ad522" : "#ff0080";
		}

		/*TO CHECK FOR PLOT WIN temp1 is used again to store the data temporaily*/
		temp1 = (checkWinBS(Human)[0]!=null)? checkWinBS(Human): checkTieBS(Human); 

		if (temp1[1] != null) {
		/* breaks the script and exits out after game over*/
			gameOver(temp1);
			deactivateAll();
			return 1;
		}

	deactivateAll();
	/*puts x or o inside p element inside tile based on player turn */
	var botID = botMove(extracted_tileID);
	console.log(botID);

	var x = document.querySelectorAll('.S'+botID)[0];
	x.children[0].innerText = Bot;
	x.style.backgroundColor = (Bot == "X")? "#913ac5": "#48845e";

	var temp2 = (checkWinTiles(Bot,botID,plot)[0]!=null)? checkWinTiles(Bot,botID,plot): checkTieTiles(Bot,botID,plot);

		/*if temp1 has value that is not null means its a win or tie*/
		if (temp2[1] != null) {
				/*stores the conclusion in this variable for further functional operation */
				bigsquareConcluded[temp2[1]] = temp2[0];
				/*highlights the BS with the corresponding color for x or o or t means tie*/
				BIGsquares[temp2[1]].style.backgroundColor = (temp2[0] == "X")? "#0000d7" : (temp2[0] == "O")? "#4ad522" : "#ff0080";
		}

		/*TO CHECK FOR PLOT WIN temp1 is used again to store the data temporaily*/
		temp2 = (checkWinBS(Bot)[0]!=null)? checkWinBS(Bot): checkTieBS(Bot); 

		if (temp2[1] != null) {
		/* breaks the script and exits out after game over*/
			gameOver(temp2);
			deactivateAll();
			return 1;
		}

	activate(botID);
	/*variable to show whose it is...once bot is added it will get deleted*/
}









/*deactivates all the tiles once called or invoked*/
function deactivateAll() {
	for (var j = 0; j < tiles.length; j++) {
		tiles[j].removeEventListener('click', clickEvent);
		tiles[j].removeEventListener('mouseover', mouseEvent1);
		tiles[j].removeEventListener('mouseout', mouseEvent2);
		tiles[j].style.cursor = "default";
		if(plot[j] == null){
			tiles[j].style.backgroundColor = "White";
		}
	}
}

/*activates the tiles based on the move played if the BS is concluded it calls activateALL function*/
function activate(tileID) {
	var BigsquareID = tileID%9;
	var BSindexID = BigsquareID*9;
	var Activate_BS = document.querySelectorAll('#M'+BigsquareID)[0];
	if (bigsquareConcluded[BigsquareID] == null) {
		for (j = 0; j < 9; j++) {
			if (plot[BSindexID+j] == null) {
				Activate_BS.children[j].addEventListener ('click', clickEvent, false);
				Activate_BS.children[j].style.cursor = "pointer";
				Activate_BS.children[j].style.backgroundColor = "#ffd304";
				Activate_BS.children[j].addEventListener('mouseover', mouseEvent1,false);
				Activate_BS.children[j].addEventListener('mouseout', mouseEvent2,false);
			}
		}
	}
	else if (bigsquareConcluded[BigsquareID] != null) {
		activateALL(BSindexID);
	}
}

/* checks the tiles won using the wincombos and plot variables looping through each BS*/
function checkWinTiles (player,tileID,newPlot) {
	if (movesPlayed >= 5){
		var instancesOfPlayer = 0;
		for (j = 0;j < 9;j++){
			if(newPlot[parseInt(tileID/9)*9+j] == player){
				instancesOfPlayer++;
			}
		}
		if (instancesOfPlayer>=3) {
			for (i = 0; i < 8;i++) {
				if (newPlot[parseInt(tileID/9)*9+winCombos[i][0]] == player 
					&& newPlot[parseInt(tileID/9)*9+winCombos[i][1]] == player 
					&& newPlot[parseInt(tileID/9)*9+winCombos[i][2]] == player) {
						console.log (player+" wins in "+parseInt(tileID/9));
						numOfBSConcluded++;
						return [player, parseInt(tileID/9)];
				}
			}
		}
	}
	return [null,null];
}

/*check for ties if any tile is left empty then it returns null otherwise returns 2 size array to temp1 */
function checkTieTiles (player,tileID,newPlot) {
	if (bigsquareConcluded[parseInt(tileID/9)] == null){
		for (i = 0; i < 9; i++) {
			if (newPlot[parseInt(tileID/9)*9+i] == null){
				return[null,null];
			}
		}
		return ["T",parseInt(tileID/9)];
	}
}

/* is called when the BS to activate is already concluded so activates the remaining tiles that unfilled*/
function activateALL(tileID) {
	for (j = 0; j < 9;j++){
		if (bigsquareConcluded[j] == null){
			for (i = 0; i < 9;i++){
				if (plot[j*9+i] == null){
					tiles[j*9+i].addEventListener('click', clickEvent, false);
					tiles[j*9+i].style.backgroundColor = "#ffd304";
					tiles[j*9+i].style.cursor = "pointer";
					tiles[j*9+i].addEventListener('mouseover', mouseEvent1,false);
					tiles[j*9+i].addEventListener('mouseout', mouseEvent2,false);
				}
			}
		}
	}
}

/*checks wins using wincombo and bigsquareconcluded variable through looping technique*/
function checkWinBS (player) {
	for (i = 0; i < 8; i++) {
		if (bigsquareConcluded[winCombos[i][0]] == player 
			&& bigsquareConcluded[winCombos[i][1]] == player
			&& bigsquareConcluded[winCombos[i][2]] == player) {
				console.log("game over "+player+" wins");
			return [player,player];
		}
	}
	return [null,null];
}

/* checks whether bigsquareconcluded is filled if yes returns tie*/
function checkTieBS(player) {
	for (i = 0; i < 8; i++) {
		if (bigsquareConcluded[i] == null) {
			return[null,null];
		}
	}
	return["T",player];
}

/* after conclusion in BS check functions this function is called for end game prompts and displays*/
function gameOver(conclusion) {
	if(conclusion[0] == "T"){
		document.querySelectorAll(".Conclusion")[0].style.display = "block";
		document.querySelectorAll(".Conclusion")[0].children[0].innerText = "Its A Tie";
	}
	else{
		document.querySelectorAll(".Conclusion")[0].style.display = "block";
		document.querySelectorAll(".Conclusion")[0].children[0].innerText = conclusion[0] + " Wins";
		document.querySelectorAll(".Conclusion")[0].children[0].style.color = (conclusion[0]=="X")? "Cyan" :"#4ad522";
	}
}

/*functions for hover state of tiles*/
function mouseEvent1(tile) {
	document.querySelectorAll('.'+tile.target.classList.item(0))[0].style.backgroundColor = "#e1ba00";
}

function mouseEvent2(tile) {
	document.querySelectorAll('.'+tile.target.classList.item(0))[0].style.backgroundColor = "#ffd304";
}


/*bot functions go here */
function botMove(tileID) {
	if (movesPlayed >= 100){
		return minimax(plot,Bot,movesPlayed);
	}
	else {
		movesPlayed = movesPlayed + 1;
		return randomPlay(tileID);
	}

}

function minimax(plot,player,depth){

}

function randomPlay(tileID) {
	if (bigsquareConcluded[tileID%9] == null){
		var Valid_tiles = [];

		for (j = 0; j < 9;j++) {
			if (plot[9*(tileID%9)+j] == null) {
			Valid_tiles.push(9*(tileID%9)+j);	
			}
		}

		randomMove = Valid_tiles[Math.floor(Math.random()*(Valid_tiles.length-1))];
		plot[randomMove] = "O";
		tiles[randomMove].children[0].innerText = "O";
		return randomMove;
	}
	else {
		var Valid_tiles = [];
		for (j = 0; j < 81;j++) {
			if (plot[j] == null && bigsquareConcluded[parseInt(j/9)] == null) {
			Valid_tiles.push(j);	
			}
		}

		randomMove = Valid_tiles[Math.floor(Math.random()*(Valid_tiles.length-1))];
		plot[randomMove] = "O";
		tiles[randomMove].children[0].innerText = "O";
		return randomMove;
	}
}