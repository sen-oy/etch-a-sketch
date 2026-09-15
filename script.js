// get dom nodes
const gridDimension = document.querySelector('#grid-dimension-slider');
const gridContainer = document.querySelector('#grid-container');
const gridColor = document.querySelector('#grid-color');

function createGrid (dimension) {
    let numberOfSquares = gridDimension ** 2;
    let gridSize = gridContainer.style.width;
    let squareWidth = gridSize / dimension;
    for (let i = 0; i < numberOfSquares; i++){
        let square = document.createElement('div');
        square.style.width = squareWidth;
        square.style.height = squareWidth;
        square.classList.add('grid-square');
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
createGrid(gridDimension.value);