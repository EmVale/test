const canvas = document.querySelector('.myCanvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

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
ctx.fillText('Amazing Game', width / 2 - ctx.measureText(txt).width / 2, height * 0.1 / 2 + 20);

const image = new Image();
image.src = 'testimage.jpg';
image.addEventListener('load', () => ctx.drawImage(image, width / 2 - image.naturalWidth / 4, height / 2 - image.naturalHeight / 4, 960, 540));



