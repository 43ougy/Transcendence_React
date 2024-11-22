const menu = document.getElementById('menu');
const buttonMenu = document.querySelector('.menuButton');
const buttonSolo = document.getElementById('buttonSolo');
const buttonMulti = document.getElementById('buttonMultiplayer');
const buttons = document.querySelectorAll('.btn');
const overlay = document.getElementById('overlay');
const borderAnim = document.getElementById('borderAnim');
const borderAnim2 = document.getElementById('borderAnim2');
const body = document.body;
const root = document.documentElement;
const backColor = getComputedStyle(root).getPropertyValue('--back-color');
const color1 = getComputedStyle(root).getPropertyValue('--color-1');
const color2 = getComputedStyle(root).getPropertyValue('--color-2');

const laser = document.querySelector('.laser');
const bgaGame = document.querySelector('.bgaGame');

function handleMenu() {
    menu.addEventListener('mouseover', () => {
        menu.style.transition = 'all .5s ease-in-out';
        menu.style.background='none';
        /*overlay.classList.remove('overlay-appear');
        overlay.classList.add('overlay-disappear');*/
    })
    
    menu.addEventListener('mouseout', () => {
        menu.style.background='';
        menu.style.boxShadow='';
        /*overlay.classList.add('overlay-appear');
        overlay.classList.remove('overlay-disappear');*/
    })

    laser.addEventListener('click', () => {
        bgaGame.classList.add('bga');
        body.classList.add('shake');
        bgaGame.addEventListener('animationend', () => {
            bgaGame.classList.remove(bga);
            body.classList.remove('shake');
        })
    })

    buttons.forEach(btn => {
        btn.addEventListener('mouseover', () => {
            borderAnim.style.opacity=1;
            borderAnim.classList.add('border-is-animate');
            borderAnim2.style.opacity=1;
            borderAnim2.classList.add('border2-is-animate');
        })
        btn.addEventListener('mouseout', () => {
            borderAnim.style.opacity=0;
            borderAnim.classList.remove('border-is-animate');
            borderAnim2.style.opacity=0;
            borderAnim2.classList.remove('border2-is-animate');
        })
    })

    buttonSolo.addEventListener('mouseover', () => {
        body.style.backgroundImage="url('Icons/Capture d’écran du 2024-11-18 15-19-32.png')";
        body.style.backgroundSize="cover";
        body.style.boxShadow="inset 0 0 50px black,inset 0 0 100px black,inset 0 0 150px black,inset 0 0 270px black,inset 0 0 400px black";
    })
    buttonMulti.addEventListener('mouseover', () => {
        body.style.backgroundImage="url('Icons/Capture d’écran du 2024-11-18 15-19-32.png')";
        body.style.backgroundSize="cover";
        body.style.boxShadow="inset 0 0 50px black,inset 0 0 100px black,inset 0 0 150px black,inset 0 0 270px black,inset 0 0 400px black";
    })

    buttonSolo.addEventListener('click', () => {
        console.log("button is click");
        menu.classList.add('menuAnimated');

        body.style.backgroundImage='none';
        overlay.style.display = 'none';
        canvas.style.display = 'block';
        canvas.classList.add('is-animated');
        canvas.addEventListener('animationend', () => {
            canvas.classList.remove('is-animated');
            startGame();
        })
    })
}

handleMenu();

/* ------------------------------------------------*/

const canvas = document.getElementById('pongCanvas');
const button = document.getElementById('menu');
const context = canvas.getContext('2d');

// ---------------------------------------------------------//

class Ball {
    constructor(size, speed, shakeSpeed) {
        this.size = size;
        this.initialSpeed = speed;
        this.speed = speed;
        this.x = canvas.width / 2 - size / 2;
        this.y = canvas.height / 2 - size / 2;
        this.dx = this.speed;
        this.dy = this.speed;
    }
}
let ball = new Ball(10, 4, 6);

// ---------------------------------------------------------//

class Paddle {
    constructor(x, y, width, height, color) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.dy = 0;
        this.color = color;
    }
}

let paddle = new Paddle(0, 0, 10, 100, 'white');
let middleBar = new Paddle(canvas.width / 2 - 2 / 2
    , 0
    , 2
    , canvas.height
    , 'white');

// ---------------------------------------------------------//

class Player {
    constructor(paddle) {
        this.paddle = paddle;
        this.point = 0;
    }
}

let player1 = new Player(new Paddle(15
    , canvas.height / 2 - paddle.height / 2
    , paddle.width
    , paddle.height
    , 'orange'));
let player2 = new Player(new Paddle(canvas.width - paddle.width - 15
    , canvas.height / 2 - paddle.height / 2
    , paddle.width
    , paddle.height
    , 'violet'));

// ---------------------------------------------------------//

let textPoint = { x: canvas.width / 2, y: 30}

let hue1 = 0;
let hue2 = 180;
let shakeDuration = 0;
let shakeSpeed = 6

document.addEventListener('keydown', (event) => {
    if (event.key === 'w') {
        player1.paddle.dy = -5;
    }
    if (event.key === 's') {
        player1.paddle.dy = 5;
    }
    if (event.key === 'ArrowUp') {
        player2.paddle.dy = -5;
    }
    if (event.key === 'ArrowDown') {
        player2.paddle.dy = 5;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'w' || event.key === 's') {
        player1.paddle.dy = 0;
    }
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        player2.paddle.dy = 0;
    }
});

function drawRect(x, y, width, height, color) {
    context.fillStyle = color;
    context.shadowBlur = 20;
    context.shadowColor = color;
    context.fillRect(x, y, width, height);
    context.shadowBlur = 0;
}

function drawBall(x, y, size, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, size, 0, Math.PI * 2, true);
    context.fill();
}

function drawMiddleBar(x, y, width, height, color) {
    context.fillStyle = color;
    context.shadowBlur = 20;
    context.shadowColor = color;
    context.fillRect(x, y, width, height);
    context.shadowBlur = 0;
}

function drawPoints(x, y) {
    const textSize = context.measureText(player1.point.toString() + "   " + player2.point.toString());
    context.fillStyle = 'white';
    context.font = "25px arial";
    context.fillText(player1.point.toString() + "   " + player2.point.toString(), x - textSize.width / 2, y);
}

function ballToPaddleCheck(playerN)
{
    if (playerN === 1)
    {
        if (ball.x - ball.size < player1.paddle.x + player1.paddle.width &&
            ball.y > player1.paddle.y &&
            ball.y < player1.paddle.y + player1.paddle.height) {
            ball.dx *= -1.1;
            ball.dy += player1.paddle.dy / 2;
            triggerImpactEffect();
        }
    }
    if (playerN === 2)
    {
        if (ball.x + ball.size > player2.paddle.x &&
            ball.y > player2.paddle.y &&
            ball.y < player2.paddle.y + player2.paddle.height)
        {
            ball.dx *= -1.1;
            ball.dy += player2.paddle.dy / 2;
            triggerImpactEffect();
        }
    }
}

function playerDirection(player)
{
    player.paddle.y += player.paddle.dy;
    if (player.paddle.y < 0)
        player.paddle.y = 0;
    if (player.paddle.y + paddle.height > canvas.height)
        player.paddle.y = canvas.height - paddle.height;
}

function ballMovement()
{
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1;
    }

    if (ball.x < 0) {
        player2.point++;
        resetBall();
    }
    else if (ball.x > canvas.width) {
        player1.point++;
        resetBall();
    }
}

function update() {
    playerDirection(player1);
    ballMovement();

    ballToPaddleCheck(1);
    ballToPaddleCheck(2);

    playerDirection(player2);

    //updatePaddleColors();
    shakeScreen();
}

function updatePaddleColors() {
    hue1 = (hue1 + 1) % 360;
    hue2 = (hue2 + 1) % 360;

    player1.paddle.color = `hsl(${hue1}, 100%, 50%)`;
    player2.paddle.color = `hsl(${hue2}, 100%, 50%)`;
}

function shakeScreen()
{
    if (shakeDuration > 0) {
        shakeDuration--;
        const shakeIntensity = shakeDuration * 3.5;
        const offsetX = Math.random() * shakeIntensity - shakeIntensity / 2;
        const offsetY = Math.random() * shakeIntensity - shakeIntensity / 2;
        canvas.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    } else {
        canvas.style.transform = "translate(0, 0)";
    }
}

function triggerImpactEffect() {
    if (Math.abs(ball.dx) >= shakeSpeed) {
        shakeDuration = 5;
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = ball.initialSpeed;
    ball.dx = (Math.random() > 0.5 ? 1 : -1) * ball.speed;
    ball.dy = (Math.random() * 2 - 1) * ball.speed;
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawRect(player1.paddle.x, player1.paddle.y, player1.paddle.width, player1.paddle.height, player1.paddle.color);
    drawRect(player2.paddle.x, player2.paddle.y, player2.paddle.width, player2.paddle.height, player2.paddle.color);
    drawBall(ball.x, ball.y, ball.size, 'white');
    drawMiddleBar(middleBar.x, middleBar.y, middleBar.width, middleBar.height, 'white')
    drawPoints(textPoint.x, textPoint.y);
}

function gameLoop() {
    update();
    draw();
    if (player1.point === 10 || player2.point === 10)
        return;
    requestAnimationFrame(gameLoop);
}

canvas.style.display = 'none';

function startGame() {
    canvas.style.display = 'block';
    gameLoop();
}