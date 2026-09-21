// get dom nodes
const gridDimension = document.querySelector('#grid-dimension-slider');
const gridContainer = document.querySelector('#grid-container');
const gridColor = document.querySelector('#grid-color');
const gridColorRandomizerButton = document.querySelector('#grid-color-randomizer');
const gridDimensionLabel = document.querySelector('#grid-dimension-label');
const gridClearButton = document.querySelector('#grid-clear-button');
const gridEraserButton = document.querySelector('#grid-eraser-button');

// random color boolean
let randomColorMode = false;
let eraserMode = false;

// helper functions
function getContainerWidth (container) {
    return parseInt(container.clientWidth); // we're using border box sizing
}

function getGridColorValue (colorPicker) {
    return hexToRgb(colorPicker.value);
}

function getGridDimensions (dimensionInput) {
    return parseInt(dimensionInput.value);
}

function createGridSquare (squareWidth) {
    let square = document.createElement('div');
    square.classList.add('grid-square');
    square.style.width = `${squareWidth}px`;
    square.style.height = `${squareWidth}px`;
    square.setAttribute('colored', 'no');
    square.style.opacity = 0.5;

    return square
}

function getRandomColorModeStatus () {
    return randomColorMode;
}

function setRandomColorModeStatus (value) {
    randomColorMode = value;
}

function getEraserModeStatus () {
    return eraserMode;
}

function setEraserModeStatus (value) {
    eraserMode = value
}

// randomize color function
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function generateRandomColor () {
    let redValue = getRandomInt(255);
    let greenValue = getRandomInt(255);
    let blueValue = getRandomInt(255);

    return `rgb(${redValue}, ${greenValue}, ${blueValue})`;
}

gridColorRandomizerButton.addEventListener('click', () => {
    if (getRandomColorModeStatus()) {
        setRandomColorModeStatus(false);
    } else {
        setRandomColorModeStatus(true);
    }
    setEraserModeStatus(false);
});

gridEraserButton.addEventListener('click', () => {
    if (getEraserModeStatus()) {
        setEraserModeStatus(false);
    } else {
        setEraserModeStatus(true);
    }
    setRandomColorModeStatus(false);
});

// color conversion function from hex to rgb
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? 
        `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : 
        null;
}

// grid color change should override randomizer and eraser
gridColor.addEventListener('change', () => {
    setEraserModeStatus(false);
    setRandomColorModeStatus(false);
})

// function to create the grid
function createGrid (dimensionInput, container) {
    let numberOfSquares = parseInt(dimensionInput) ** 2;
    let gridSize = getContainerWidth(container);
    let squareWidth = gridSize / dimensionInput;
    
    for (let i = 0; i < numberOfSquares; i++){
        let square = createGridSquare(squareWidth);
        container.appendChild(square);

        // add event listener for each square
        square.addEventListener('mouseover', (event) => {
            if ((event.target.getAttribute('colored') === 'yes') && 
                (event.target.style.backgroundColor === getGridColorValue(gridColor)) &&
                (!getRandomColorModeStatus() && !getEraserModeStatus())) 
                {
                let currentOpacity = parseFloat(event.target.style.opacity);
                if (currentOpacity < 1.0) {
                    currentOpacity += 0.1;
                    event.target.style.opacity = `${currentOpacity}`;
                }
            } else {
                if (getRandomColorModeStatus()) {
                    colorSquare(event, generateRandomColor());
                } else if (getEraserModeStatus()){
                    colorSquare(event, `rgb(255, 255, 255)`);
                } else {
                    colorSquare(event);
                }
                event.target.setAttribute('colored', 'yes');
            }
        });
    }
}

function colorSquare (event, currentColor = getGridColorValue(gridColor)) {
    event.target.style.backgroundColor = currentColor;
}

gridDimension.addEventListener('change', () => {
    resetGrid(gridContainer, gridDimension);
    gridDimensionLabel.textContent = `${getGridDimensions(gridDimension)} x ${getGridDimensions(gridDimension)}`;
});

function resetGrid (container, dimensionInput) {
    // clear grid first
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }

    // recreate the grid with current dimensions
    let dimension = getGridDimensions(dimensionInput);
    createGrid(dimension, container);
}

// initialize grid
window.addEventListener('load', () => {
    resetGrid(gridContainer, gridDimension);
})

// clear button logic
gridClearButton.addEventListener('click', () => {
    // get node list of all child nodes of our grid container
    let currentSquares = gridContainer.childNodes;
    for (let i = 0; i < currentSquares.length; i++) {
        currentSquares[i].style.backgroundColor = `rgb(255, 255, 255)`;
    }
})