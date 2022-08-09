//initial setup
const canvas = document.querySelector('.myCanvas');
//const width = canvas.width = window.innerWidth;
//const height = canvas.height = window.innerHeight;
const width = canvas.width = 1200;
const height = canvas.height = 675;
const ctx = canvas.getContext('2d');
var betsize = 1;
var spinning = 0;
var menu = false;
var quickspin = false;
var imgsize = Math.min(width*0.1, height*0.14);
var symbols = [];

var balance = 500.00;

//dictionary of bet sizes
const betsizes = {1:0.10, 2:0.20, 3:0.40, 4:0.60, 5:0.80, 6:1.00, 7:1.20, 8:1.40, 9:1.60, 10:1.80, 11:2.00, 12:3.00, 13:4.00, 14:5.00, 15:6.00, 16:7.00, 17:8.00, 18:9.00, 19:10.00, 20:15.00, 21:20.00, 22:25.00, 23:50.00, 24:75.00, 25:100.00};

//boxes for buttons
const increasebox = {x:width*0.9, y:height*0.85, width:width*0.1, height:height*0.15};
const decreasebox = {x:width*0.65, y:height*0.85, width:width*0.1, height:height*0.15};
const menubox = {x:0, y:height*0.85, width:width*0.1, height:height*0.15};
const spinbox = {x:width*0.85, y:height*0.65, width:width*0.1, height:height*0.15};
const quickspinbox = {x:0, y:height*0.75, width:width*0.15, height:height*0.1};

//loading images
var xqcM = new Image();
xqcM.src = './Images/xqcM.png';
xqcM.onload = () => {
    symbols.push(xqcM);
};
var xqcKek = new Image();
xqcKek.src = './Images/xqcKek.png';
xqcKek.onload = () => {
    symbols.push(xqcKek);
};
var xqcF = new Image();
xqcF.src = './Images/xqcF.png';
xqcF.onload = () => {
    symbols.push(xqcF);
};
var xqcY = new Image();
xqcY.src = './Images/xqcY.png';
xqcY.onload = () => {
    symbols.push(xqcY);
};
var Ace = new Image();
Ace.src = './Images/Ace.png';
Ace.onload = () => {
    symbols.push(Ace);
};
var King = new Image();
King.src = './Images/King.png';
King.onload = () => {
    symbols.push(King);
};
var Queen = new Image();
Queen.src = './Images/Queen.png';
Queen.onload = () => {
    symbols.push(Queen);
};
var Jack = new Image();
Jack.src = './Images/Jack.png';
Jack.onload = () => {
    symbols.push(Jack);
};
var Ten = new Image();
Ten.src = './Images/Ten.png';
Ten.onload = () => {
    symbols.push(Ten);
};

var xqcS = new Image();
xqcS.src = './Images/xqcS.png';
xqcS.onload = () => {
    symbols.push(xqcS);
    drawframe();
};

var oldreel1 = [xqcM, xqcM, xqcM, xqcM, xqcM];
var oldreel2 = [xqcM, xqcM, xqcM, xqcM, xqcM];
var oldreel3 = [xqcM, xqcM, xqcM, xqcM, xqcM];
var oldreel4 = [xqcM, xqcM, xqcM, xqcM, xqcM];
var oldreel5 = [xqcM, xqcM, xqcM, xqcM, xqcM];
var reel1 = [xqcM, xqcM, xqcM, xqcM, xqcM];
var reel2 = [xqcM, xqcM, xqcM, xqcM, xqcM];
var reel3 = [xqcM, xqcM, xqcM, xqcM, xqcM];
var reel4 = [xqcM, xqcM, xqcM, xqcM, xqcM];
var reel5 = [xqcM, xqcM, xqcM, xqcM, xqcM];

//function to randomly generate a new reel
function rollreel(){
    var ret = [];
    for (i=0; i < 5; i++){
        var num = Math.floor(Math.random()*10);
        ret.push(symbols[num]);
    };
    return ret;
};

//function to randomly generate new reels
function rollreels(){
    oldreel1 = reel1;
    oldreel2 = reel2;
    oldreel3 = reel3;
    oldreel4 = reel4;
    oldreel5 = reel5;
    reel1 = rollreel();
    reel2 = rollreel();
    reel3 = rollreel();
    reel4 = rollreel();
    reel5 = rollreel();
};

//function to display a given reel
function drawreel(reel, xpos, offset){
    //first symbol
    ctx.drawImage(reel[0], xpos, -height*0.1 - imgsize*5 + offset, imgsize, imgsize);
    //second symbol
    ctx.drawImage(reel[1], xpos, -height*0.075 - imgsize*4 + offset, imgsize, imgsize);
    //third symbol
    ctx.drawImage(reel[2], xpos, -height*0.05 - imgsize*3 + offset, imgsize, imgsize);
    //fourth symbol
    ctx.drawImage(reel[3], xpos, -height*0.025 - imgsize*2 + offset, imgsize, imgsize);
    //bottom symbol
    ctx.drawImage(reel[4], xpos, -imgsize + offset, imgsize, imgsize);

};

//main function to draw the outer board
function drawframe(){

    //primary background
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, width, height);

    //reel background
    ctx.fillStyle = 'rgb(106, 121, 145, 0.5)';
    ctx.fillRect(width*0.19, 0, width*0.62, height*0.855);

     //Not currently spinning
     if (spinning === 0){
        drawreel(oldreel1, width*0.21, height*0.825);
        drawreel(oldreel2, width*0.33, height*0.825);
        drawreel(oldreel3, width*0.45, height*0.825);
        drawreel(oldreel4, width*0.57, height*0.825);
        drawreel(oldreel5, width*0.69, height*0.825);
        //ctx.drawImage(xqcM, width*0.21, height*0.03, imgsize, imgsize);
    };

    //End of spin
    if (spinning >= height*0.83){
        drawreel(reel1, width*0.21, height*0.825);
        drawreel(reel2, width*0.33, height*0.825);
        drawreel(reel3, width*0.45, height*0.825);
        drawreel(reel4, width*0.57, height*0.825);
        drawreel(reel5, width*0.69, height*0.825);
        //ctx.drawImage(xqcM, width*0.21, height*0.82 - imgsize, imgsize, imgsize);
        spinning = 0;
    };

    //Currently Spinning
    if (spinning > 0){
        //drawreel(oldreel1, width*0.21, height*0.825 + spinning);
        //drawreel(oldreel2, width*0.33, height*0.825 + spinning);
        //drawreel(oldreel3, width*0.45, height*0.825 + spinning);
        //drawreel(oldreel4, width*0.57, height*0.825 + spinning);
        //drawreel(oldreel5, width*0.69, height*0.825 + spinning);
        drawreel(reel1, width*0.21, spinning);
        drawreel(reel2, width*0.33, spinning);
        drawreel(reel3, width*0.45, spinning);
        drawreel(reel4, width*0.57, spinning);
        drawreel(reel5, width*0.69, spinning);
        //ctx.drawImage(xqcM, width*0.21, height*0.03 + spinning, imgsize, imgsize);
        spinning += height*0.008;
        window.requestAnimationFrame(drawframe);
    };

    //bottom menu bar background
    ctx.fillStyle = 'rgb(57, 59, 61)';
    ctx.fillRect(0, height*0.85, width, height*0.15);

    //bottom left options button
    ctx.fillStyle = 'rgb(73, 123, 204, 0.5)';
    ctx.fillRect(0, height*0.85, width*0.1, height*0.15);

    //balance display
    ctx.fillStyle = 'rgb(43, 117, 73, 0.5)';
    ctx.fillRect(width*0.1, height*0.85, width*0.2, height*0.15);
    ctx.fillStyle = 'rgb(255, 255, 255)';
    var fontsize = height*0.045;
    ctx.font = fontsize + 'px arial';
    ctx.fillText('Balance:', width*0.1 + ((width*0.2 - ctx.measureText('Balance:').width)/2), height*0.91);
    ctx.fillText('$' + balance.toFixed(2), width*0.1 + ((width*0.2 - ctx.measureText('$' + balance.toFixed(2)).width)/2), height*0.965);

    //bet increase button
    ctx.fillStyle = 'rgb(43, 117, 73, 0.5)';
    ctx.fillRect(width*0.9, height*0.85, width*0.1, height*0.15);

    //bet size display
    ctx.fillStyle = 'rgb(255, 255, 255)';
    var fontsize = height*0.045;
    ctx.font = fontsize + 'px arial';
    ctx.fillText('Bet Size:', width*0.75 + ((width*0.15 - ctx.measureText('Bet Size:').width)/2), height*0.91);
    ctx.fillText('$' + betsizes[betsize].toFixed(2), width*0.75 + ((width*0.15 - ctx.measureText('$' + betsizes[betsize].toFixed(2)).width)/2), height*0.965);

    //bet decrease button
    ctx.fillStyle = 'rgb(184, 53, 86, 0.5)';
    ctx.fillRect(width*0.65, height*0.85, width*0.1, height*0.15);

    //spin button
    ctx.fillStyle = 'rgb(43, 117, 73, 0.5)';
    ctx.fillRect(width*0.85, height*0.65, width*0.1, height*0.15);

    //menu box
    if (menu){
        ctx.fillStyle = 'rgb(105, 101, 93, 0.5)';
        ctx.fillRect(0, height*0.4, width*0.15, height*0.45);
        if(quickspin){
            ctx.fillStyle = 'rgb(43, 117, 73, 0.5)';
            ctx.fillRect(0, height*0.75, width*0.15, height*0.10);
        }
        else{
            ctx.fillStyle = 'rgb(184, 53, 86, 0.5)';
            ctx.fillRect(0, height*0.75, width*0.15, height*0.1);
        };
    }
    
};

//function to check if position is inside box
function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y;
}

//function to get the position of the mouse
function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
};

//function to increase bet size
function increasebet(){
    if (betsize < 25){
        betsize += 1;
        drawframe();
    }
};

//function to decrease bet size
function decreasebet(){
    if(betsize >1){
        betsize -= 1;
        drawframe();
    }
};

//event listener for clicks
canvas.addEventListener('click', function(e) {
    var mousePos = getMousePos(canvas, e);
    if (spinning === 0){
        if (isInside(mousePos, increasebox)){
            increasebet();
        }
        if (isInside(mousePos, decreasebox)){
            decreasebet();
        }
        if (isInside(mousePos, spinbox) && balance >= betsizes[betsize]){
            spinning = 1;
            balance -= betsizes[betsize];
            rollreels();
            drawframe();
        }
        if (isInside(mousePos, menubox)){
            menu = !menu;
            drawframe();
        }
        if (menu){
            if (isInside(mousePos, quickspinbox)){
                quickspin = !quickspin;
                drawframe();
            }
        }
    };
});

//event listener for spacebar
document.addEventListener('keydown', function(e) {
    if (e.key === " ") {
        if (spinning === 0 && balance >= betsizes[betsize]){
            spinning = 1;
            balance -= betsizes[betsize];
            rollreels();
            drawframe();
        }
    }
});

drawframe();
