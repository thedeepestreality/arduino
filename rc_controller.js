var canvas, ctx;

canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
document.addEventListener('mousedown', startDrawing);
document.addEventListener('mouseup', stopDrawing);
document.addEventListener('mousemove', Draw);
document.getElementById("x_coordinate").innerText = 0;
document.getElementById("y_coordinate").innerText = 0;

var width, height, radius, x_center, y_center;
width = window.innerWidth;
radius = 100;
height = 700;
ctx.canvas.width = width;
ctx.canvas.height = height;
background();
joystick(width / 2, height / 3);

function background() {
    x_center = width / 2;
    y_center = height / 3;

    ctx.beginPath();
    ctx.arc(x_center, y_center, radius + 20, 0, Math.PI * 2);
    ctx.fillStyle = 'gray';
    ctx.fill();
}

function joystick(width, height) {
    ctx.beginPath();
    ctx.arc(width, height, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#503d3f';
    ctx.fill();
}

let coord = { x: 0, y: 0 };
let paint = false;

function getPosition(event) {
    coord.x = event.clientX - canvas.offsetLeft;
    coord.y = event.clientY - canvas.offsetTop;
}

function is_it_in_the_circle() {
    var current_radius = Math.sqrt(Math.pow(coord.x - x_center, 2) + Math.pow(coord.y - y_center, 2));
    if (radius >= current_radius) return true
    else return false
}

function startDrawing(event) {
    paint = true;
    getPosition(event);
    if (is_it_in_the_circle()) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background();
        joystick(coord.x, coord.y);
        Draw();
    }
}

function stopDrawing() {
    paint = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background();
    joystick(width / 2, height / 3);
    document.getElementById("x_coordinate").innerText = 0;
    document.getElementById("y_coordinate").innerText = 0;
}

function Draw(event) {
    if (paint) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background();
        var x, y;

        if (is_it_in_the_circle()) {
            x = coord.x;
            y = coord.y;
        }
        else {
            x = radius * Math.cos(Math.atan2((coord.y - y_center), (coord.x - x_center))) + x_center;
            y = radius * Math.sin(Math.atan2((coord.y - y_center), (coord.x - x_center))) + y_center;
        }
        joystick(x, y);

        getPosition(event);

        document.getElementById("x_coordinate").innerText = Math.round(x - x_center);
        document.getElementById("y_coordinate").innerText = Math.round(y - y_center);
        send(Math.round(x - x_center), Math.round(y - y_center));
    }
}
