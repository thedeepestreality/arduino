var canvas, ctx;

canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
document.addEventListener('mouseup', stopDrawing);
document.addEventListener('mousedown', startDrawing);
document.addEventListener('mousemove', Draw);
document.getElementById("x_coords").innerText = 0;
document.getElementById("y_coords").innerText = 0;

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

var coord = { x: 0, y: 0 };
var start_drawing = false;

function getPosition(event) {
    coord.x = event.clientX - canvas.offsetLeft;
    coord.y = event.clientY - canvas.offsetTop;
}

function startDrawing(event) {
  start_drawing = true;
  getPosition(event);
  if (Math.pow(radius, 2) >= Math.pow(coord.x - x_center, 2) + Math.pow(coord.y - y_center, 2)) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      background();
      joystick(coord.x, coord.y);
      Draw();
  }
}

function stopDrawing() {
    start_drawing = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background();
    joystick(width / 2, height / 3);
    document.getElementById("x_coords").innerText = 0;
    document.getElementById("y_coords").innerText = 0;
}

function Draw(event) {
    if (start_drawing){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background();
        var x, y;

        if (Math.pow(radius, 2) >= Math.pow(coord.x - x_center, 2) + Math.pow(coord.y - y_center, 2)) {
            x = coord.x;
            y = coord.y;
        }
        else {
            x = radius * Math.cos(Math.atan2((coord.y - y_center), (coord.x - x_center))) + x_center;
            y = radius * Math.sin(Math.atan2((coord.y - y_center), (coord.x - x_center))) + y_center;
        }
        joystick(x, y);

        getPosition(event);

        document.getElementById("x_coords").innerText = Math.round(x - x_center);
        document.getElementById("y_coords").innerText = Math.round(y - y_center);
        send(Math.round(x - x_center), Math.round(y - y_center));
      }
}
