///<reference path='../p5.global-mode.d.ts'/>
var paused = true;
var grid;

var body = document.querySelector("body");

var canvasContainer = document.getElementById("canvas-container");
var margin = parseInt(window.getComputedStyle(canvasContainer).getPropertyValue("padding").replace("px", ""));
function setup() 
{
	var gridSize = windowHeight - margin * 3
	console.log(margin)
	var myCanvas = createCanvas(gridSize, gridSize);
	canvasContainer.style.height = gridSize + "px";
	canvasContainer.style.width = gridSize + "px";
	myCanvas.parent(canvasContainer)
	frameRate(5);
	grid = new Grid(50, 50);
	grid.render();
}

function draw()
{
	if (!paused) {
		background(0);
		grid.nextGen();
		
		}
	grid.render();
}

function keyPressed() {
	if (key == " ") {
		paused = !paused;
	}
	console.log(paused);
	if (key == "r") {
		console.log("R")
		if (!paused) {
			paused = !paused;
		}
		grid.randomGrid();
	}

}

function mouseClicked() {
	if (paused) {
		var i = floor(mouseX / (width / grid.cells.length));
		var j = floor(mouseY / (height / grid.cells.length));
		if (grid.cells[i][j] == 0) {
			grid.cells[i][j] = 1;
		} else {
			grid.cells[i][j] = 0;
		}
		grid.render();
	}
	
}


