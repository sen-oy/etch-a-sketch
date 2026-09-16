// get dom nodes
const gridDimension = document.querySelector('#grid-dimension-slider');
const gridContainer = document.querySelector('#grid-container');
const gridColor = document.querySelector('#grid-color');

// helper functions
function getContainerWidth (container) {
    return parseInt(container.clientWidth); // we're using border box sizing
}

function getGridColorValue (colorPicker) {
    return colorPicker.value;
}

function getGridDimensions (dimensionInput) {
    return parseInt(dimensionInput.value);
}

function createGridSquare (squareWidth) {
    let square = document.createElement('div');
    square.classList.add('grid-square');
    square.style.width = `${squareWidth}px`;
    square.style.height = `${squareWidth}px`;

    return square
}

function createGrid (dimensionInput, container) {
    let numberOfSquares = parseInt(dimensionInput) ** 2;
    let gridSize = getContainerWidth(container);
    let squareWidth = gridSize / dimensionInput;
    
    for (let i = 0; i < numberOfSquares; i++){
        let square = createGridSquare(squareWidth);
        container.appendChild(square);

        // add event listener for each square
        square.addEventListener('mouseover', colorSquare);
    }
}

function colorSquare (event, currentColor = getGridColorValue(gridColor)) {
    event.target.style.backgroundColor = currentColor;
}

gridDimension.addEventListener('change', () => {
    resetGrid(gridContainer, gridDimension);
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