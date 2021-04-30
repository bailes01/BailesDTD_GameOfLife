/// @ts-check
/// <reference path="../../../node_modules/@types/p5/global.d.ts" />
var drawing = null;
var paused = true;
var started = false;
var grid;
var randomGridButton;
var clearGridButton;
var pauseButton;
var drawButton;
var cellCountOutput = document.getElementById("grid-size");
var frameRateOutput = document.getElementById("frame-rate");
var cellCountSlider;
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
var painting;
function setup() {
  gridSize = windowHeight - margin * 3;
  canvasContainer.style.height = gridSize + "px";
  canvasContainer.style.width = gridSize + "px";

  myCanvas = createCanvas(gridSize, gridSize);
  myCanvas.parent(canvasContainer);
  myCanvas.mousePressed(canvasClicked);
  myCanvas.mouseReleased(canvasReleased);

  pauseButton = createButton("Start (SpaceBar)");
  pauseButton.parent(document.getElementById("pause-button"));
  pauseButton.style("width", "80%");
  pauseButton.mouseReleased(togglePause);

  clearGridButton = createButton("Clear Grid (C)");
  clearGridButton.parent(document.getElementById("clear-button"));
  clearGridButton.style("width", "80%");
  clearGridButton.mousePressed(createNewGrid);

  randomGridButton = createButton("Random Grid (R)");
  randomGridButton.parent(document.getElementById("random-button"));
  randomGridButton.style("width", "80%");
  randomGridButton.mousePressed(createRandomGrid);

  drawButton = createButton("Draw glider");
  drawButton.parent(document.getElementById("draw-button"));
  drawButton.style("width", "80%");
  drawButton.mousePressed(drawTemplate);

  cellCountSlider = createSlider(10, 100, 50, 1);
  cellCountSlider.parent(document.getElementById("grid-slider"));
  cellCountSlider.style("width", "80%");
  cellCountSlider.input(createNewGrid);

  frameRateSlider = createSlider(1, 144, 10, 1);
  frameRateSlider.parent(document.getElementById("frame-slider"));
  frameRateSlider.style("width", "80%");
  frameRateSlider.input(changeFrameRate);

  changeFrameRate();
  createNewGrid();
}

function drawTemplate() {
  drawing = "glider";
  paused = true;
}

function changeFrameRate() {
  frameRate(frameRateSlider.value());
}

function togglePause() {
  started = true;
  paused = !paused;
}
function createNewGrid() {
  paused = true;
  started = false;
  cellCount = cellCountSlider.value();
  cellCountOutput.innerHTML = "Size of grid " + cellCount + "x" + cellCount;
  grid = new Grid(cellCount, cellCount);
  grid.render();
}

function draw() {
  if (started) {
    if (!paused) {
      frameRateOutput.innerHTML =
        "Max frame rate (" +
        frameRateSlider.value() +
        ")" +
        " actual (" +
        round(frameRate()) +
        ")";
      pauseButton.html("Pause (SpaceBar)");

      grid.nextGen();
      background(0);
      grid.render();
    } else {
      frameRateOutput.innerHTML =
        "Max frame rate (" + frameRateSlider.value() + ")" + " actual (0)";
      pauseButton.html("Resume");
    }
  } else {
    frameRateOutput.innerHTML =
      "Max frame rate (" + frameRateSlider.value() + ")" + " actual (0)";
    pauseButton.html("Start (SpaceBar)");
  }
}

function keyPressed() {
  if (key == " ") {
    togglePause();
  }

  if (key == "r") {
    createRandomGrid();
  }

  if (key == "c") {
    createNewGrid();
  }
}

function createRandomGrid() {
  paused = true;
  grid.randomGrid();
  grid.render();
}

function canvasClicked() {
  frameRate(144);
  if (paused) {
    var i = floor(mouseX / (width / grid.cells.length));
    var j = floor(mouseY / (height / grid.cells.length));
    if (drawing != null) {
      grid.drawShape(i, j, drawing);
      grid.render();
    } else if (grid.cells[i][j] == 0) {
      painting = true;
      grid.cells[i][j] = 1;
    } else {
      painting = false;
      grid.cells[i][j] = 0;
    }
  } else {
    paused = true;
  }
  grid.render();
}

function canvasReleased() {
  drawing = null;
  frameRate(frameRateSlider.value());
}

function mouseDragged() {
  if (mouseX < gridSize && mouseY < gridSize && mouseX >= 0 && mouseY >= 0 && drawing == null) {
    var i = floor(pmouseX / (width / grid.cells.length));
    var j = floor(pmouseY / (height / grid.cells.length));
    if (painting) {
      grid.cells[i][j] = 1;
    } else {
      grid.cells[i][j] = 0;
    }
    paused = true;
    grid.renderCell(i, j);
  }
}
