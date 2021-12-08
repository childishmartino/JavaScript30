const canvas = document.querySelector('#draw');
// choosing the context of the canvas, which is what you actually draw on
const ctx = canvas.getContext('2d');

// sizing the canvas window up to fit the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// since we are drawing we need to give the line: color, how the end of the line is styled, what happens when a line meets another line
ctx.strokeStyle = '#BADA55'; //color
ctx.lineCap = 'round'; // how the end of the line is styled
ctx.lineJoin = 'round'; // what happens when it meets another line
ctx.lineWidth = 100;

let isDrawing = false; //going to be the event we track in this case when we click down it will turn to true and paint to the canvas
let lastX = 0; // where do we start and finish the line
let lastY = 0; // where do we start and finish the line
let hue = 0;
let direction = true;

function draw(e) {
    if (!isDrawing) return // stops function from running when they are not moused down
    console.log(e)
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    //start from
    ctx.moveTo(lastX, lastY);
    //go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY]; // destructed way to reassign lastX and last Y
    // lastX = e.offsetX;
    // lastY = e.offsetY;
    hue++
    if (hue >= 360) {
        hue = 0; // resets hue
    }

    if (ctx.lineWidth >= 100 || ctx.lineWidth <=1) {
        direction = !direction;
    }
    if (direction) {
        ctx.lineWidth ++
    } else {
        ctx.lineWidth --
    }
};

function startLine(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', startLine)
canvas.addEventListener('mouseup', () => isDrawing = false );
canvas.addEventListener('mouseout', () => isDrawing = false);