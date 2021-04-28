///<reference path='../p5.global-mode.d.ts'/>
var paused = true;
var started = false;

var grid;
var newGridButton;
var gridSizeSlider;
var frameRateSlider;
var body = document.querySelector("body");
var canvasContainer = document.getElementById("canvas-container");
var margin = parseInt(
  window
    .getComputedStyle(canvasContainer)
    .getPropertyValue("padding")
    .replace("px", "")
);
var panel = document.getElementById("panel");

var gridSize;
var myCanvas;
var cellCount = 50;

function setup() {
  gridSize = windowHeight - margin * 3;
  canvasContainer.style.height = gridSize + "px";
  canvasContainer.style.width = gridSize + "px";

  myCanvas = createCanvas(gridSize, gridSize);
  myCanvas.parent(canvasContainer);
  myCanvas.mouseClicked(canvasClicked);

  pauseButton = createButton("Start (SpaceBar)");
  pauseButton.parent(panel);
  pauseButton.mouseReleased(togglePause);

  cellCountSlider = createSlider(10, gridSize, 50, 1);
  cellCountSlider.parent(panel);
  cellCountSlider.style("width", "80px");
  newGridButton = createButton("New Grid (N)");
  newGridButton.parent(panel);
  newGridButton.mousePressed(createNewGrid);
  frameRateSlider = createSlider(1, 30, 10, 1);
  frameRateSlider.parent(panel);
  frameRateSlider.style("width", "80px");

  createNewGrid();
  frameRate(frameRateSlider.value());
}

function togglePause() {
  started = true;
  paused = !paused;
  console.log(paused);
}
function createNewGrid() {
  paused = true;
  started = false;
  cellCount = cellCountSlider.value();
  grid = new Grid(cellCount, cellCount);
  grid.render();
}

function draw() {
  frameRate(frameRateSlider.value());
  if (started) {
    if (!paused) {
      pauseButton.html("Pause (SpaceBar)");
      background(0);
      grid.nextGen();
    } else {
      pauseButton.html("Resume");
    }
    grid.render();
  } else {
    pauseButton.html("Start (SpaceBar)");
  }
}

function keyPressed() {
  if (key == " ") {
    togglePause();
  }

  if (key == "r") {
    paused = true;
    grid.randomGrid();
    grid.render();
  }

  if (key == "n") {
    createNewGrid();
  }
}

function canvasClicked() {
  if (paused) {
    var i = floor(mouseX / (width / grid.cells.length));
    var j = floor(mouseY / (height / grid.cells.length));
    if (grid.cells[i][j] == 0) {
      grid.cells[i][j] = 1;
    } else {
      grid.cells[i][j] = 0;
    }
  } else {
    paused = true;
  }
  grid.render();
}
