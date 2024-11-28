document.getElementById("generateMatrix").addEventListener("click", function () {
    const rows = parseInt(document.getElementById("rows").value);
    const columns = parseInt(document.getElementById("columns").value);

    if (rows > 10 || columns > 10 || rows !== columns) {
        alert("Rows and columns must be equal and less than or equal to 10.");
        return;
    }

    const matrixInputDiv = document.getElementById("matrixInput");
    matrixInputDiv.innerHTML = "";

    // Set the CSS grid properties dynamically
    matrixInputDiv.style.gridTemplateRows = `repeat(${rows}, auto)`;
    matrixInputDiv.style.gridTemplateColumns = `repeat(${columns}, auto)`;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const input = document.createElement("input");
            input.type = "number";
            input.className = "matrix-cell";
            input.dataset.row = i;
            input.dataset.col = j;
            matrixInputDiv.appendChild(input);
        }
    }

    document.getElementById("calculate").style.display = "block";
});

document.getElementById("calculate").addEventListener("click", function () {
    const rows = parseInt(document.getElementById("rows").value);
    const columns = parseInt(document.getElementById("columns").value);

    const matrix = [];
    const resultMatrix = Array.from({ length: rows }, () => Array(columns).fill(0));

    const inputs = document.querySelectorAll(".matrix-cell");
    inputs.forEach((input) => {
        const row = parseInt(input.dataset.row);
        const col = parseInt(input.dataset.col);
        if (!matrix[row]) matrix[row] = [];
        matrix[row][col] = parseInt(input.value);
    });

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            for (let k = 0; k < rows; k++) {
                resultMatrix[i][j] += matrix[i][k] * matrix[k][j];
            }
        }
    }

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "<h2>Input Matrix:</h2>";
    resultsDiv.appendChild(createMatrixGrid(matrix, rows, columns));

    resultsDiv.innerHTML += "<h2>Result Matrix (A^2):</h2>";
    resultsDiv.appendChild(createMatrixGrid(resultMatrix, rows, columns));
});

function createMatrixGrid(matrix, rows, columns) {
    const grid = document.createElement("div");
    grid.className = "matrix-grid";
    grid.style.gridTemplateRows = `repeat(${rows}, auto)`;
    grid.style.gridTemplateColumns = `repeat(${columns}, auto)`;

    matrix.forEach(row => {
        row.forEach(value => {
            const cell = document.createElement("span");
            cell.textContent = value;
            grid.appendChild(cell);
        });
    });

    return grid;
}
