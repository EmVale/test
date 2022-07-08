const canvas = document.querySelector('.myCanvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
const button = document.querySelector('button');
var pressed = false;

ctx.fillStyle = 'rgb(0, 0, 0)';
ctx.fillRect(0, 0, width, height);

ctx.fillStyle = 'rgb(41, 140, 97)';
ctx.fillRect(width * 0.1, height * 0.1, width * 0.8, height * 0.8);

function degToRad(degrees){
    return degrees * Math.PI / 180;
}

ctx.fillStyle = 'rgb(41, 140, 97)';
ctx.font = '60px arial';
var txt = 'Amazing Game';
var bttxt = 'Wow what a great button!';
ctx.fillText('Amazing Game', width / 2 - ctx.measureText(txt).width / 2, height * 0.1 / 2 + 20);

const image = new Image();
image.src = 'testimage.jpg';
image.addEventListener('load', () => ctx.drawImage(image, width / 2 - image.naturalWidth / 4, height / 2 - image.naturalHeight / 4, 960, 540));


function rand(min, max) {
    return Math.floor(Math.random() * (max-min+1)) + (min);
}
  
ctx.translate(width/2, height/2);

const walk = new Image();
walk.src = 'walk-right.png';
walk.onload = draw;
let sprite = 0;
let posX = 0;

function draw() {
    ctx.translate(-width/2, -height/2);
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'rgb(41, 140, 97)';
    ctx.fillRect(width * 0.1, height * 0.1, width * 0.8, height * 0.8);
    ctx.fillText('Amazing Game', width / 2 - ctx.measureText(txt).width / 2, height * 0.1 / 2 + 20);
    ctx.drawImage(image, width / 2 - image.naturalWidth / 4, height / 2 - image.naturalHeight / 4, 960, 540);
    if (pressed === true){
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.font = '60px arial';
        ctx.fillText('Wow what a great button!', width / 2 - ctx.measureText(bttxt).width / 2, height * 0.17);
    }
    ctx.translate(width/2, height/2);
    ctx.drawImage(walk, (sprite*102), 0, 102, 148, 0+posX, -74, 102, 148);
    if (posX % 13 === 0) {
        if (sprite === 5) {
          sprite = 0;
        } 
        else {
          sprite++;
        }
    }
    if (posX % 13 === 0) {
        if (sprite === 5) {
          sprite = 0;
        } 
        else {
          sprite++;
        }
    }
    if(posX > width/2) {
        let newStartPos = -((width/2) + 102);
        posX = Math.ceil(newStartPos);
        console.log(posX);
      } else {
        posX += 2;
    }
    window.requestAnimationFrame(draw);
}

button.addEventListener('click', () => {
    ctx.fillStyle = 'rgb(41, 140, 97)';
    ctx.font = '60px arial';
    ctx.fillText('Wow what a great button!', width / 2 - ctx.measureText(txt).width / 2, height * 0.1 / 2 + 20);
    pressed = !pressed;
});

function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y;
}

var testrect = {
    x:width * 0.1,   
    y:height * 0.1,
    width:width * 0.8,
    height:height * 0.8
}

canvas.addEventListener('click', function(e) {
    var mousePos = getMousePos(canvas, e);
    if (isInside(mousePos, testrect)){
        pressed = !pressed;
    }
});
