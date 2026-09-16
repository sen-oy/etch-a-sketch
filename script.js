// get dom nodes
const gridDimension = document.querySelector('#grid-dimension-slider');
const gridContainer = document.querySelector('#grid-container');
const gridColor = document.querySelector('#grid-color');

// helper functions
function getContainerWidth (container) {
    return container.offsetWidth; // we're using border box sizing
}

function getGridColorValue (colorPicker) {
    return colorPicker.value;
}

function getGridDimensions (dimensionInput) {
    return dimensionInput.value;
}

function createGrid (dimension) {
    let numberOfSquares = parseInt(dimension) ** 2;
    let gridSize = parseInt(gridContainer.clientWidth);
    let squareWidth = gridSize / dimension;
    for (let i = 0; i < numberOfSquares; i++){
        let square = document.createElement('div');
        square.classList.add('grid-square');
        square.style.width = squareWidth;
        square.style.height = squareWidth;
        gridContainer.appendChild(square);

        // add event listener for each square
        square.addEventListener('mouseover', colorSquare);
    }
}

function colorSquare (event, color = gridColor.value) {
    let currentColor = color;
    event.target.style.backgroundColor = currentColor;
}

gridDimension.addEventListener('change', resetGrid);

function resetGrid () {
    // clear grid first
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.lastChild);
    }

    // recreate the grid with current dimensions
    let dimension = gridDimension.value;
    createGrid(dimension);
}

// initialize grid
window.addEventListener('load', () => {
    createGrid(gridDimension.value);
})

// add helper functions to decouple variables and functions