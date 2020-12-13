//Variables of utility
	var mapX = 0;
	var mapY = 0;
	var mapZ = 0;
	var mapR = 0;
	var showMap = false;
	var vertices = {};
	var hexagon = {};
	var dotColor = 'black';
	var mapType = '';
	var normalNums = {numbers: [0,2,3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11,12], dots: [0,1,2,2,3,3,4,4,5,5,5,5,4,4,3,3,2,2,1]};
	var extensionNums = {numbers: [0,0,2,2,3,3,3,4,4,4,5,5,5,6,6,6,8,8,8,9,9,9,10,10,10,11,11,11,12,12], dots: [0,0,1,1,2,2,2,3,3,3,4,4,4,5,5,5,5,5,5,4,4,4,3,3,3,2,2,2,1,1]}
	var hexagonValues;
	var scrambledValues = [];
	var scrambledDots = [];
	var hexagonTypes = ['wool', 'ore', 'wood', 'grain', 'brick'];
	var hexagonColor = {'wool': '#3fd982', 'ore': '#999999', 'wood': '#33994d', 'grain': '#ffe680', 'brick': '#800000', 'desert': '#ffffff'};
	var roads = {};
	var settlementWidth = 20;
	var portTypes = ['any','wool','ore','wood','grain','brick'];
	var portSpacing = [true,true,false,true,true,false,false,true,true,false];

	var brick = 'https://mattjg2020.github.io/brick.png';
	var desert = 'https://mattjg2020.github.io/desert.png';
	var grain = 'https://mattjg2020.github.io/grain.png';
	var ore = 'https://mattjg2020.github.io/ore.png';
	var wood = 'https://mattjg2020.github.io/wood.png';
	var wool = 'https://mattjg2020.github.io/wool.png';
	var water = 'https://mattjg2020.github.io/water.png';
	var any_ship = 'https://mattjg2020.github.io/any_ship.png';
	var wood_ship = 'https://mattjg2020.github.io/wood_ship.png';
	var wool_ship = 'https://mattjg2020.github.io/wool_ship.png';
	var grain_ship = 'https://mattjg2020.github.io/grain_ship.png';
	var brick_ship = 'https://mattjg2020.github.io/brick_ship.png';
	var ore_ship = 'https://mattjg2020.github.io/ore_ship.png';
	var waterAL = 'https://mattjg2020.github.io/waterAL.png';
	var waterAR = 'https://mattjg2020.github.io/waterAR.png';
	var waterBL = 'https://mattjg2020.github.io/waterBL.png';
	var waterBR = 'https://mattjg2020.github.io/waterBR.png';
	var waterSL = 'https://mattjg2020.github.io/waterSL.png';
	var waterSR = 'https://mattjg2020.github.io/waterSR.png';
	var wood_icon = 'https://mattjg2020.github.io/wood_icon.png';
	var wool_icon = 'https://mattjg2020.github.io/wool_icon.png';
	var ore_icon = 'https://mattjg2020.github.io/ore_icon.png';
	var grain_icon = 'https://mattjg2020.github.io/grain_icon.png';
	var brick_icon = 'https://mattjg2020.github.io/brick_icon.png';
	var names = [];
	var players = [];
	var turn = 0;
	var beginingPlacement = true;
	var numOfTurns = 0;
	

//variables of appearance
	var mapMarginTop = 50;
	var mapMarginLeft = 50;
	var waterWidth = 30;
	var dotSpacing = 5;
	var dotWeight = 3;
	var luckyColor = '#cc0000';
	var bgColor = '#fafafa';
	var tableMarginLeft = 20;
	var iconSize = 0.5;
	var roadWidth = 7;
	var availableColor = '#dbdbdb';
	var colors = ['#ff2e2e', '#2969ff', '#5d945c', '#7a4e00', '#000000', '#7c00ba', '#ff9900', '#32f0e0', '#ffff00', '#84ff00', '#ff00e1', '#9c0000'];
	var secondaryColors = ['#ff8a8a', '#a8c7ff', '#b2c9b1', '#b07c20', '#919191', '#cb9de3', '#ffc56e', '#cffffb', '#fafaa7', '#d9ffb0', '#fca7f2', '#b53e3e'];



function pregameBoxes(){
	var normalMap = document.getElementById('nameNormal');
	var extensionMap = document.getElementById('nameExtension');
	var customMap = document.getElementById('customSettings');
	if (document.getElementById('custom').checked){
		customMap.style.display = "block";
		normalMap.style.display = 'none';
		extensionMap.style.display = 'none';
	}else if(document.getElementById('normal').checked){
		customMap.style.display = "none";
		normalMap.style.display = 'block';
		extensionMap.style.display = 'none';
	}else {
		customMap.style.display = "none";
		normalMap.style.display = 'none';
		extensionMap.style.display = 'block';
	}
}

function gameSetup() {
	createmap();

//creates players array
	//creates array with player names, scrambled
	var nameInputs;
	if(document.getElementById('normal').checked){
		nameInputs = document.getElementsByClassName('name_normal');
	}else if(document.getElementById('extension').checked){
		nameInputs = document.getElementsByClassName('name_extension');
	}else if(document.getElementById('custom').checked){
		nameInputs = document.getElementsByClassName('name_custom');
	}else{}

	for(i = 0; i < nameInputs.length; i++){
		if(nameInputs[i].value != ""){
			var randomNum = Math.ceil(Math.random()*names.length);
			names.splice(randomNum, 0, nameInputs[i].value)
		}
	}
	var randomNum = Math.ceil(Math.random()*names.length);
	names.splice(randomNum, 0, names[0]);
	names.splice(0,1);

	//turns array of player names into array of objects of each player's info
	for(i in names){
		players[i] = {'name': names[i], 'brick': 0, 'wood': 0, 'grain': 0, 'wool': 0, 'ore': 0, 'color': colors[i], 'secondaryColor': secondaryColors[i]}
	}

	//makes the table for players
	var table = document.getElementById('player_table');
	table.style.maxWidth = Math.floor(window.innerWidth - width - tableMarginLeft - 10) + "px";
	table.style.display = 'inline';
	table.style.marginLeft = (width + tableMarginLeft) +  'px';

	for(i in players){
		var playerRow = document.createElement('table');
		playerRow.id = 'p' + i;
		playerRow.innerHTML = `
			<tr>
				<td id = 'playerName' colspan = 10>` + players[i].name + `</td>
			</tr>
			<tr>
				<td class = 'info' class = 'brick'> 
					<img src = 'https://mattjg2020.github.io/brick_icon.png'
					alt = 'brick:' width =` + 88*iconSize + `height =` + 48*iconSize + `/>
				</td>
				<td class = 'info'>` + players[i].brick + `</td>
				<td class = 'info' class = 'wood'>
					<img src = 'https://mattjg2020.github.io/wood_icon.png'
					alt = 'wood:' width =` + 89*iconSize + `height =` + 60*iconSize + `/>
					</td>
				<td class = 'info'>` + players[i].wood + `</td>
				<td class = 'info' class = 'grain'>
					<img src = 'https://mattjg2020.github.io/grain_icon.png'
					alt = 'grain:' width =` + 56*iconSize + `height =` + 82*iconSize + `/>
					</td>
				<td class = 'info'>` + players[i].grain + `</td>
				<td class = 'info' class = 'wool'>
					<img src = 'https://mattjg2020.github.io/wool_icon.png' 
					alt = 'wool:' width =` + 87*iconSize + `height =` + 62*iconSize + `/>
					</td>
				<td class = 'info'>` + players[i].wool + `</td>
				<td class = 'info' class = 'ore'>
					<img src = 'https://mattjg2020.github.io/ore_icon.png'
					alt = 'ore:' width =` + 86*iconSize + `height =` + 64*iconSize + `/>
					</td>
				<td class = 'info'>` + players[i].ore + `</td>
			</tr>
		`;
		table.appendChild(playerRow);
	}
	var buttonRow = document.createElement('table');
	buttonRow.id = 'buttonRow';
	var tableInside = '<tr id = "turnButtonsTR">';
	for(i in players){
		tableInside += `<td class = "turnButtons" id = "` + String('turnButton' + i) + `">` + players[i].name + `</td>`
	}
	tableInside += '</tr>';

	tableInside += `
		<tr>
			<td colspan = ` + players.length  + ` onclick = 'nextTurn()' id = 'nextTurnButton'>Next Turn</td>
		</tr>
	`
	buttonRow.innerHTML = tableInside;
	table.appendChild(buttonRow);


	for(i in players){
		document.getElementById('turnButton' + i).bgColor = players[i].secondaryColor;
		document.getElementById('turnButton' + i).style.borderColor = players[i].color;
	}

	availability();
}

function nextTurn(){
	if (beginingPlacement){
		if(numOfTurns < players.length - 1){
			turn ++;
			numOfTurns++;
		}else if(numOfTurns > players.length - 1){
			if(turn ==0){
				turn++;
				beginingPlacement = false;
			}else{
				turn--;
				numOfTurns++;
			}
		}else{
			numOfTurns++;
		}
	}else{
		if(turn == players.length - 1){
			turn = 0;
		}else{
			turn ++;
		}
	}
	console.log(turn);
	availability();
}

function availability(){
	if(beginingPlacement){
		for(i in roads){
			if(roads[i].ownership == -2 || roads[i].ownership == -1){
				roads[i].ownership = -1;
				//-1 = available; -2 = none;
			}else{}
		}
	}else{
		for(i in roads){
			roads[i].ownership = 1;
		}
	}
}

function createmap(){
	document.getElementById('pregame').style.display = 'none';
	showMap = true;
	//sets parameters for each dimension on map according to settings of pregame menu
	if(document.getElementById('normal').checked){
		mapType = 'normal';
		mapX = 3;
		mapY = 3;
		mapZ = 3;
		mapR = 1/(((mapY + mapZ + (2/3))*1.5)/windowHeight);
		hexagonValues = normalNums;
	}else if(document.getElementById('extension').checked){
		mapType = 'extension';
		mapX = 4;
		mapY = 4;
		mapZ = 3;
		mapR = 1/(((mapY + mapZ + (2/3))*1.5)/windowHeight);
		hexagonValues = extensionNums;
	}else if(document.getElementById('custom').checked){
		mapType = 'custom';
		mapX = parseInt(document.getElementById('customX').value);
		mapY = parseInt(document.getElementById('customY').value);
		mapZ = parseInt(document.getElementById('customZ').value);
		mapR = 1/(((mapY + mapZ + (2/3))*1.5)/windowHeight);
	}else{}
	mapMarginTop = mapR;
	mapMarginLeft = Math.sqrt(3)*mapR/2;
	
	for(j = 0; j < mapY + mapZ; j++){	
		if(j < mapZ && j < mapY){
			create_vertex_row((mapX + j)*2, j, mapZ - j - 1)
		}else if (j >= mapZ && j >= mapY){
			create_vertex_row((mapX + mapY + mapZ - j - 1)*2, j, mapZ - (mapZ + mapY - j) + mapY - mapZ)
		}else {
			if(mapZ > mapY){
				create_vertex_row((mapX + mapY)*2 - 1, j, mapZ - j - 1)
			}else{
				create_vertex_row((mapX + mapZ)*2 - 1, j, -j + mapZ)
			}
		}
	}

	createHexagonValues();
	while(!validateHexagons()){
		scrambledDots = [];
		scrambledValues = [];
		createHexagonValues();
	}

	var k = 0;
	for(i in hexagon){
		hexagon[i].rollNumber = scrambledValues[k];
		hexagon[i].rollDots = scrambledDots[k];
		k++;
	}

	var j = 0;
	for(i in hexagon){
		if(j%hexagonTypes.length == 0){
			for(l = 0; l < hexagonTypes.length; l++){
				var randomNumber = Math.floor(Math.random()*hexagonTypes.length);
				var anotherRandomNumber = Math.floor(Math.random()*hexagonTypes.length)
				var shuffledItem = hexagonTypes[randomNumber];
				hexagonTypes.splice(randomNumber, 1);
				hexagonTypes.splice(anotherRandomNumber, 0, shuffledItem);
			}
		}
		if(hexagon[i].rollDots == 0){
			hexagon[i].type = 'desert';
		}else{
			hexagon[i].type = hexagonTypes[j%hexagonTypes.length]
		}
		j++;
	}
	createRoads();
	createPorts();
	setup();
}

function createRoads(){
	for(i in vertices){
		//even rows, each point make road to right & down, left & up for odd OR do horizontal and then up and down
		var x = parseInt(i.substring(1));
		var y = parseInt(i.substring(i.indexOf('_') + 1));
		if(eval('vertices.v' + (x + 1) + '_' + y)){
			let x1, x2, y1, y2, ownership = -2;
			eval('roads.r' + x + '_' + y + '= {ownership,x1,y1,x2,y2}');
			eval('roads.r' + x + '_' + y + '.x1 = vertices.v' + (x) + '_' + y + '.x');
			eval('roads.r' + x + '_' + y + '.y1 = vertices.v' + (x) + '_' + y + '.y');
			eval('roads.r' + x + '_' + y + '.x2 = vertices.v' + (x + 1) + '_' + y + '.x');
			eval('roads.r' + x + '_' + y + '.y2 = vertices.v' + (x + 1) + '_' + y + '.y');
		}else{}
		if(eval('vertices.v' + x + '_' + (y + 1))){
			if(eval('vertices.v' + x + '_' + (y + 1) + '.y') - eval('vertices.v' + x + '_' + y + '.y') < 1.5*mapR){ 
				//the 1.5 is arbitrary. the differnce will be about mapR, but it's simpler to just say <1.5mapR
				let x1, x2, y1, y2, ownership = -2;
				eval('roads.rd' + x + '_' + y + '= {ownership,x1,y1,x2,y2}');
				eval('roads.rd' + x + '_' + y + '.x1 = vertices.v' + x + '_' + y + '.x');
				eval('roads.rd' + x + '_' + y + '.y1 = vertices.v' + x + '_' + y + '.y');
				eval('roads.rd' + x + '_' + y + '.x2 = vertices.v' + x + '_' + (y + 1) + '.x');
				eval('roads.rd' + x + '_' + y + '.y2 = vertices.v' + x + '_' + (y + 1) + '.y');
			}else{}
		}else{}
	}
}

function createPorts(){
	var Xdiff = Math.sqrt(3)*mapR;
	var numOfVertices = 0;
	var numOfPorts = 0;
	for(i = 0; i < mapX*2; i++){
		if(portSpacing[numOfVertices%portSpacing.length]){
			eval('vertices.v' + (mapZ - 1 + i) + '_0.port = portTypes[Math.floor(numOfPorts/2)%portTypes.length]');
			numOfPorts ++;
		}else{}
		numOfVertices++;
	}		
	for(i = 0; i < mapY; i++){
		if(portSpacing[numOfVertices%portSpacing.length]){
			eval('vertices.v' + (mapZ - 1 + mapX*2 + i) + '_' + i + '.port = portTypes[Math.floor(numOfPorts/2)%portTypes.length]');
			numOfPorts ++;
		}else{}
		numOfVertices++;

		if(portSpacing[numOfVertices%portSpacing.length]){
			eval('vertices.v' + (mapZ - 1 + mapX*2 + i) + '_' + (i + 1) + '.port = portTypes[Math.floor(numOfPorts/2)%portTypes.length]');
			numOfPorts ++;
		}else{}
		numOfVertices++;
	}
	for(i = 0; i < mapZ - 1; i++){
		if(portSpacing[numOfVertices%portSpacing.length]){
			eval('vertices.v' + (mapZ - 1 + mapX*2 + mapY - 2 - i) + '_' + (mapY + i) + '.port = portTypes[Math.floor(numOfPorts/2)%portTypes.length]');
			numOfPorts ++;
		}else{}
		numOfVertices++;

		if(portSpacing[numOfVertices%portSpacing.length]){
			eval('vertices.v' + (mapZ - 1 + mapX*2 + mapY - 2 - i) + '_' + (mapY + i + 1) + '.port = portTypes[Math.floor(numOfPorts/2)%portTypes.length]');
			numOfPorts ++;
		}else{}
		numOfVertices++;
	}
	for(i = 0; i < mapX*2; i++){
		if(portSpacing[numOfVertices%portSpacing.length]){
			eval('vertices.v' + (mapY - 1 + mapX*2 - i - 1) + '_' + (mapY + mapZ - 1) + '.port = portTypes[Math.floor(numOfPorts/2)%portTypes.length]');
			numOfPorts ++;
		}else{}
		numOfVertices++;
	}
	for(i = 0; i < mapY - 1; i++){
		if(portSpacing[numOfVertices%portSpacing.length]){
			eval('vertices.v' + (mapY - i - 1) + '_' + (mapZ + mapY - 2 - i) + '.port = portTypes[Math.floor(numOfPorts/2)%portTypes.length]');
			numOfPorts ++;
		}else{}
		numOfVertices++;

		if(portSpacing[numOfVertices%portSpacing.length]){
			eval('vertices.v' + (mapY - i - 2) + '_' + (mapZ + mapY - 2 - i) + '.port = portTypes[Math.floor(numOfPorts/2)%portTypes.length]');
			numOfPorts ++;
		}else{}
		numOfVertices++;
	}
	for(i = 0; i < mapZ - 1; i++){
		if(portSpacing[numOfVertices%portSpacing.length]){
			if(i == mapZ - 2 && portSpacing[(numOfVertices + 1)%portSpacing.length]){
			}else{
				eval('vertices.v' + i + '_' + (mapZ - i - 1) + '.port = portTypes[Math.floor(numOfPorts/2)%portTypes.length]');
				numOfPorts ++;
			}
		}else{}
		numOfVertices++;

		if(portSpacing[numOfVertices%portSpacing.length] && i != mapZ - 2){
			eval('vertices.v' + (i + 1) + '_' + (mapZ - i - 1) + '.port = portTypes[Math.floor(numOfPorts/2)%portTypes.length]');
			numOfPorts ++;
		}else{}
		numOfVertices++;
	}
}

function createHexagonValues(){
	if(mapType == 'custom'){
		var k = 0;
		for(i in hexagon){
			var randomNum = Math.floor(Math.random()*normalNums.numbers.length)
			scrambledValues[k] = normalNums.numbers[randomNum];
			scrambledDots[k] = normalNums.dots[randomNum];
			k++;
		}
	}else{
		for(i in hexagonValues.numbers){
			var randomNum = Math.ceil(Math.random()*scrambledValues.length)
			scrambledValues.splice(randomNum, 0, hexagonValues.numbers[i]);
			scrambledDots.splice(randomNum, 0, hexagonValues.dots[i]);
		}
		var anotherRandomNum = Math.floor(Math.random()*scrambledValues.length)
		scrambledDots.splice(anotherRandomNum, 0, scrambledDots[0])
		scrambledDots.splice(0,1);
		scrambledValues.splice(anotherRandomNum, 0, scrambledValues[0])
		scrambledValues.splice(0,1);
	}
}

function validateHexagons(){
	var k = 0;
	for(i in hexagon){
		if(scrambledDots[k] == 5){
			var l = 0;
			for(j in hexagon){
				if(scrambledDots[l] == 5){
					var h1x = parseInt(i.substring(1));
					var h1y = parseInt(i.substring(i.indexOf('_') + 1));
					var h2x = parseInt(j.substring(1));
					var h2y = parseInt(j.substring(j.indexOf('_') + 1));
					if((Math.abs(h1x - h2x) == 1 && Math.abs(h1y - h2y) == 1)){
						return false
					}else if ((Math.abs(h1x - h2x) == 2 && Math.abs(h1y - h2y) == 0)){
						return false;
					}else{}
				}
				l++;
			}
		}
		k++;
	}
	return true;
}

function create_vertex_row(length,rowNumber,xOffset){
	create_vertex(xOffset, rowNumber);
	for(i = 0; i < length; i++){
		if(i == length - 1){
			create_vertex(xOffset + 1 + i, rowNumber, i, true);
		}
		else{
			create_vertex(xOffset + 1 + i, rowNumber, i, false);
		}
	}
}

//creates vertices and hexagon objects
function create_vertex(x,y, vertexNumber, last) {
	var actualX = sqrt(3)*0.5*x*mapR + mapMarginLeft;
	var actualY;
	if(y%2 == 0){
		if(x%2 !== mapZ%2){
			actualY = 0.5*mapR + 1.5*y*mapR + mapMarginTop;
		}else{
			actualY = mapR*y*1.5 + mapMarginTop;
		}
	}else{
		if(x%2 !== mapZ%2){
			actualY = mapR*y*1.5 + mapMarginTop;
		}else{
			actualY = 0.5*mapR + 1.5*y*mapR + mapMarginTop;
		}
	}
	var pieceStatus = 'none';
	var port = 'none';
	eval('vertices.v' + x + '_' + y + '= {x,y,rollNumber,rollDots,type,pieceStatus,port}')
	eval('vertices.v' + x + '_' + y + '.x =' + actualX)
	eval('vertices.v' + x + '_' + y + '.y =' + actualY)

	//creates points for hexagon object
	if(y < mapZ && !last){
		if(vertexNumber%2 == 0){
			var rollNumber;
			var rollDots;
			var type;
			eval('hexagon.h' + x + '_' + y + '= {x,y,rollNumber,rollDots,type}')
			eval('hexagon.h' + x + '_' + y + '.x =' + actualX)
			eval('hexagon.h' + x + '_' + y + '.y =' + (actualY + mapR))
		}else{}
	}else if(y < mapY + mapZ - 1 && !last){
		if(vertexNumber%2 == 1){
			var rollNumber;
			var rollDots;
			eval('hexagon.h' + x + '_' + y + '= {x,y,rollNumber,rollDots}')
			eval('hexagon.h' + x + '_' + y + '.x =' + actualX)
			eval('hexagon.h' + x + '_' + y + '.y =' + (actualY + mapR))
		}else{}
	}else{}
}

function create_water(x,y,delX,delY,check1,check2,check1Image,check2Image){
	var width = Math.sqrt(3)*mapR;
	var hexType;
	var vertex = eval('vertices.v' + x + '_' + y);
	var vertexR = eval('vertices.v' + (x + 1) + '_' + y);
	var vertexL = eval('vertices.v' + (x - 1) + '_' + y);
	var vertexA = eval('vertices.v' + x + '_' + (y - 1));
	var vertexB = eval('vertices.v' + x + '_' + (y + 1));
	check1V = eval('vertex' + check1);
	check2V = eval('vertex' + check2);
	if(vertex.port != 'none'){
		if (check1V && check1V.port != 'none'){
			hexType = check1Image;
		}else if (check2V && check2V.port != 'none'){
			hexType = check2Image;
		}else{
			hexType = water;
		}
		image(hexType, vertex.x + delX, vertex.y + delY, width, mapR*2)

		//creates ships
		var ship = eval(vertex.port + '_ship');
		var shipX = vertex.x + delX;
		var shipY = vertex.y + delY;
		if(hexType == waterSL){
			shipX += -15;
			shipY += -18;
			image(ship, shipX, shipY, ship.width*mapR/284, ship.height*mapR/337)
		}else if(hexType == waterSR){
			shipX += 25;
			shipY += -5;
			image(ship, shipX, shipY, ship.width*mapR/284, ship.height*mapR/337)
		}else if(hexType == waterAL){
			shipX += -3;
			shipY += -20;
			image(ship, shipX, shipY, ship.width*mapR/284, ship.height*mapR/337)
		}else if(hexType == waterAR){
			shipX += 10;
			shipY += -20;
			image(ship, shipX, shipY, ship.width*mapR/284, ship.height*mapR/337)
		}else if(hexType == waterBL){
			shipX += 0;
			shipY += 5;
			image(ship, shipX, shipY, ship.width*mapR/284, ship.height*mapR/337)
		}else if(hexType == waterBR){
			shipX += 10;
			shipY += 10;
			image(ship, shipX, shipY, ship.width*mapR/284, ship.height*mapR/337)
		}
	}else{
		image(water, vertex.x + delX, vertex.y + delY, width, mapR*2);
	}
}

function setup() {
	if(showMap == true){
		if(mapY => mapZ){
			createCanvas((mapY + mapX - 1 - ((mapY - mapZ)/2))*Math.sqrt(3)*mapR + mapMarginLeft*2, windowHeight);
			frameRate(5);
		}else{
			createCanvas((mapZ + mapX - 1 - ((mapZ - mapY)/2))*Math.sqrt(3)*mapR + mapMarginLeft*2, windowHeight);
			frameRate(15);
		}
	}else{}
}
  
function drawMap(){
	if(showMap == true){
		//draws border lines
		for(i in vertices){
			for(j in vertices){
				var x1 = parseInt(vertices[i].x);
				var x2 = vertices[j].x;
				var y1 = vertices[i].y;
				var y2 = vertices[j].y;
				var distance = Math.pow(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2), 0.5);
				if(distance < mapR*1.1 && distance > mapR*0.9){
					stroke('#e8ce97');
					strokeWeight(5);
					line(x1,y1,x2,y2);
				}
			}
		}


	//creates earth tiles
		for(i in hexagon){
			eval('var shape' + i);
			var x = hexagon[i].x;
			var y = hexagon[i].y;
			imageMode(CENTER)
			image(eval(hexagon[i].type), x, y, Math.sqrt(3)*mapR, mapR*2);
		}
		
	//add water/ports
		for(i = 0; i <= mapX; i++){
			create_water((mapZ - 1 + i*2), 0,0,-mapR,'R','L',waterBR,waterBL);
		}		
		for(i = 0; i < mapY; i++){
			create_water((mapZ - 1 + mapX*2 + i), (i + 1), Math.sqrt(3)*mapR/2, -mapR/2,'R','A',waterBL,waterSL);
		}
		for(i = 0; i < mapZ - 1; i++){
			create_water((mapZ - 1 + mapX*2 + mapY - 2 - i), (mapY + i), Math.sqrt(3)*mapR/2, mapR/2,'R','B',waterAL,waterSL);
		}
		for(i = 0; i <= mapX; i++){
			create_water((mapY - 1 + mapX*2 - i*2), (mapY + mapZ - 1), 0, mapR,'R', 'L', waterAR, waterAL);
		}
		for(i = 0; i < mapY; i++){
			create_water((mapY - i - 1),(mapZ + mapY - 2 - i),-Math.sqrt(3)*mapR/2, mapR/2,'L','B',waterAR,waterSR);
		}
		for(i = 0; i < mapZ - 1; i++){
			create_water((i + 1), (mapZ - i - 1), -Math.sqrt(3)*mapR/2, -mapR/2,'L','A',waterBR,waterSR);
		}


	//draws tile number pieces
		for(i in hexagon){
			var x = hexagon[i].x;
			var y = hexagon[i].y;
			numOfDots = hexagon[i].rollDots;
			//draws circle
			strokeWeight(1);
			fill('none');
			stroke('black');
			if(numOfDots == 0){
			}else{
				circle(x, y, mapR*0.7);
			}

			
			var dotMargin = mapR*0.7*0.26;
			//draws dots in circle
			if(numOfDots%2 == 1){
				strokeWeight(dotWeight);
				if(numOfDots == 5){
					stroke(luckyColor);
				}else{
					stroke('black');
				}
				point(x, y + dotMargin);
				for(j = 0; j < Math.ceil(numOfDots/2); j++){
					point(x + j*dotSpacing, y + dotMargin)
					point(x - j*dotSpacing, y + dotMargin)
				}
			}else{
				strokeWeight(dotWeight)
				stroke('black')
				for(j = 0; j < numOfDots/2; j++){
					point(x + j*dotSpacing + 0.5*dotSpacing, y + dotMargin)
					point(x - j*dotSpacing - 0.5*dotSpacing, y + dotMargin)
				}
			}

			//draws number text in circle
			strokeWeight(1);
			if(numOfDots == 5){
				fill(luckyColor);
				stroke(luckyColor);
			}else{
				fill('black');
				stroke('black');
			}
			textAlign(CENTER, CENTER);
			textSize(mapR*0.3);
			if(numOfDots == 0){
			}else{
				text(hexagon[i].rollNumber, x, y)
			}
		}

		//creates triangles to cover up the water on the sides of the board
		stroke('none');
		strokeWeight(0);
		fill(bgColor);
		triangle(0,0,((mapZ - 1)*Math.sqrt(3)*mapR/2 + mapMarginLeft),-mapR/2,0,((mapZ - 1)*mapR*1.5 + mapMarginTop));
		triangle(0,height,((mapY - 1)*Math.sqrt(3)*mapR/2 + mapMarginLeft),height,0,((mapZ - 1)*mapR*1.5 + mapMarginTop + mapR*2));
		triangle(width,height,(width - mapZ*mapR*Math.sqrt(3)/2),height,width,((mapY - 1)*mapR*1.5 + mapMarginTop + mapR*2));
		triangle(width,0,(width - (mapY - 1)*Math.sqrt(3)*mapR/2 - mapMarginLeft),-mapR/2,width,((mapY - 1)*mapR*1.5 + mapMarginTop));
	}
}

function draw() {
	drawMap()
	for(i in roads){
		var color;
		var roadWidthDraw;
		if(roads[i].ownership == -2){
			roadWidthDraw = 0;
			color= 'white';
		}else if (roads[i].ownership == -1){
			roadWidthDraw = roadWidth;
			color = availableColor;
		}else{
			roadWidthDraw = roadWidth;
			color = players[roads[i].ownership].secondaryColor;
		}
		strokeWeight(roadWidthDraw);
		stroke(color);;
		line(roads[i].x1, roads[i].y1, roads[i].x2, roads[i].y2);
	}

	for(i in vertices){
		if(vertices[i].pieceStatus == 'settlement'){
			strokeWeight(1);
			stroke('black');
			fill('red');
			var x = vertices[i].x - settlementWidth/2;
			var y = vertices[i].y - settlementWidth/2;
			beginShape()
				vertex(x,y);
				vertex(x + settlementWidth/2, y - settlementWidth*0.5);
				vertex(x + settlementWidth, y);
				vertex(x + settlementWidth, y + settlementWidth*0.6);
				vertex(x, y + settlementWidth*0.6)
			endShape(CLOSE);
		}else if(vertices[i].pieceStatus == 'city'){
			strokeWeight(1);
			stroke('black');
			fill('red');
			var x = vertices[i].x - settlementWidth;
			var y = vertices[i].y - settlementWidth;
			beginShape()
				vertex(x,y);
				vertex(x + settlementWidth/2, y - settlementWidth/2);
				vertex(x + settlementWidth, y);
				vertex(x + settlementWidth, y + settlementWidth/2);
				vertex(x + settlementWidth*2, y + settlementWidth/2);
				vertex(x + settlementWidth*2, y + settlementWidth*3/2);
				vertex(x, y + settlementWidth*3/2)
			endShape(CLOSE);
		}else{}
	}
}

function preload(){
	grain = loadImage(grain);
	brick = loadImage(brick);
	desert = loadImage(desert);
	wood = loadImage(wood);
	wool = loadImage(wool);
	ore = loadImage(ore);
	water = loadImage(water);
	any_ship = loadImage(any_ship);
	wood_ship = loadImage(wood_ship);
	wool_ship = loadImage(wool_ship);
	ore_ship = loadImage(ore_ship);
	grain_ship = loadImage(grain_ship);
	brick_ship = loadImage(brick_ship);
	waterAL = loadImage(waterAL);
	waterAR = loadImage(waterAR);
	waterBL = loadImage(waterBL);
	waterBR = loadImage(waterBR);
	waterSL = loadImage(waterSL);
	waterSR = loadImage(waterSR);
}
