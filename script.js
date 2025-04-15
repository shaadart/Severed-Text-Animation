const canvas = document.getElementById('ascii-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

// Placeholder for drawing logic
ctx.fillStyle = 'white';
ctx.font = '16px monospace';
ctx.fillText('ASCII Art Animation Tool', 50, 50);

// Initialize layers array
const layers = [];

// Track mouse state for drawing
let isDrawing = false;
let currentPath = [];

// Add event listeners for canvas drawing
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    currentPath = [{ x: e.offsetX, y: e.offsetY }];
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    const point = { x: e.offsetX, y: e.offsetY };
    currentPath.push(point);
    drawPath(currentPath);
});

canvas.addEventListener('mouseup', () => {
    if (isDrawing) {
        isDrawing = false;
        layers.push({ path: currentPath, speed: 1, color: 'white', size: 16, timing: 0 });
        currentPath = [];
    }
});

// Function to draw a path on the canvas
function drawPath(path) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].x, path[i].y);
    }
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Redraw existing layers
    layers.forEach(layer => animateLayer(layer));
}

// Function to animate a layer
function animateLayer(layer) {
    const { path, speed, color, size, timing, ascii } = layer;
    if (path.length === 0) return;

    const time = (Date.now() / 1000) * speed + timing;
    const index = Math.floor(time % path.length);

    ctx.fillStyle = color;
    ctx.font = `${size}px monospace`;
    ctx.fillText(ascii, path[index].x, path[index].y);
}

// Add layer button functionality
document.getElementById('add-layer').addEventListener('click', () => {
    alert('Draw a path on the canvas to add a new layer.');
});

// Manage layers button functionality
document.getElementById('manage-layers').addEventListener('click', () => {
    console.log('Layers:', layers);
    alert('Layer management UI is under development.');
});

// Handle adding ASCII layers
document.getElementById('add-ascii-layer').addEventListener('click', () => {
    const asciiChar = document.getElementById('ascii-input').value;
    if (!asciiChar) {
        alert('Please enter an ASCII character.');
        return;
    }

    const newLayer = {
        path: [],
        ascii: asciiChar,
        speed: 1,
        color: 'white',
        size: 16,
        timing: 0
    };
    layers.push(newLayer);

    updateLayerList();
    alert(`Layer with ASCII character '${asciiChar}' added. Draw a path on the canvas.`);
});

// Update the layer list UI
function updateLayerList() {
    const layerList = document.getElementById('layer-list');
    layerList.innerHTML = '';

    layers.forEach((layer, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Layer ${index + 1}: '${layer.ascii}'`;
        layerList.appendChild(listItem);
    });
}