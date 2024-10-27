import { useEffect, useRef, useState } from 'react'
import './Game.css'

const width = 800;
const height = 400;
//const ratio = width / height;
let shakeDuration = 10;

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

class Player {
    constructor(paddle) {
        this.paddle = paddle;
        this.point = 0;
    }
}

class Ball {
    constructor(size, speed, shakeSpeed, maxSpeed) {
        this.size = size;
        this.initialSpeed = speed;
        this.speed = speed;
        this.shakeSpeed = shakeSpeed;
        this.maxSpeed = maxSpeed;
        this.x = width / 2;
        this.y = height / 2;
        this.dx = this.speed;
        this.dy = this.speed;
    }
}

function Game() {
    const [isStarted, setIsStarted] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const pongCanvas = useRef(null);

    const startGame = () => {
        console.log('yes');
    }
    useEffect(() => {
        if (isStarted)
        {
            console.log(`Animation running -> ${isStarted}`);
            pongCanvas.current.classList.add('is-animated');
            pongCanvas.current.addEventListener('animationend', () => {
                startGame();
                setIsReady(true);
            })
        }
        else
            setIsReady(false);
    }, [isStarted]);
    console.log(`is started2 -> ${isStarted}`);

    const handleResize = () => {
        if (!isStarted)
            return ;
        
        const pongCanvas = pongCanvas.current;

        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;

        const desiredAspectRatio = width / height; // Maintain aspect ratio

        let newHeight = windowHeight;
        let newWidth = newHeight * desiredAspectRatio;

        if (newWidth > windowWidth) {
            newWidth = windowWidth;
            newHeight = newWidth / desiredAspectRatio;
        }

        pongCanvas.width = Math.min(newWidth, width);
        pongCanvas.height = Math.min(newHeight, height);
    };

    useEffect(() => {
        if (!isReady)
            return ;
        const canvas = pongCanvas.current;
        if (!canvas)
            return ;
        const context = canvas.getContext('2d');

        let textPoint = { x: canvas.width / 2, y: 30};
        let paddle = new Paddle(0, 0, 10, 100, 'white');
        let middleBar = new Paddle(canvas.width / 2 - 2 / 2
            , 0
            , 2
            , canvas.height
            , 'white');
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
        let ball = new Ball(10, 5, 6, 20);

        document.addEventListener('keydown', (event) => {
            if (event.key === 'w') {
                player1.paddle.dy = -5;
            }
            if (event.key === 's') {
                player1.paddle.dy = 5;
            }
            if (event.key === 'ArrowUp') {
                player2.paddle.dy = -5;
                event.preventDefault();
            }
            if (event.key === 'ArrowDown') {
                player2.paddle.dy = 5;
                event.preventDefault();
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

        const drawRect = (x, y, width, height, color) => {
            context.fillStyle = color;
            context.shadowBlur = 20;
            context.shadowColor = color;
            context.fillRect(x, y, width, height);
            context.shadowBlur = 0;
        }
        
        const drawBall = (x, y, size, color) => {
            context.fillStyle = color;
            context.beginPath();
            context.arc(x, y, size, 0, Math.PI * 2, true);
            context.fill();
        }
        
        const drawMiddleBar = (x, y, width, height, color) => {
            context.fillStyle = color;
            context.shadowBlur = 20;
            context.shadowColor = color;
            context.fillRect(x, y, width, height);
            context.shadowBlur = 0;
        }

        const drawPoints = (x, y) => {
            const textSize = context.measureText(player1.point.toString() + "   " + player2.point.toString());
            context.fillStyle = 'white';
            context.font = "25px arial";
            context.fillText(player1.point.toString() + "   " + player2.point.toString(), x - textSize.width / 2, y);
        }

        const draw = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
        
            drawRect(player1.paddle.x, player1.paddle.y, player1.paddle.width, player1.paddle.height, player1.paddle.color);
            drawRect(player2.paddle.x, player2.paddle.y, player2.paddle.width, player2.paddle.height, player2.paddle.color);
            drawBall(ball.x, ball.y, ball.size, 'white');
            drawMiddleBar(middleBar.x, middleBar.y, middleBar.width, middleBar.height, 'white')
            drawPoints(textPoint.x, textPoint.y);
        }

        const playerDirection = (player) => {
            player.paddle.y += player.paddle.dy;
            if (player.paddle.y < 0)
                player.paddle.y = 0;
            if (player.paddle.y + paddle.height > canvas.height)
                player.paddle.y = canvas.height - paddle.height;
        }

        const resetBall = () => {
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
            ball.speed = ball.initialSpeed;
            ball.dx = (Math.random() > 0.5 ? 1 : -1) * ball.speed;
            ball.dy = 0;//(Math.random() * 2 - 1) * ball.speed;
            // put dy to 0 to test ball speed
        }

        const ballMovement = () => {
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

        const ballToPaddleCheck = (playerN) => {
            let paddle, ballHitY;
          
            if (playerN === 1) {
              paddle = player1.paddle;
              ballHitY = ball.y - paddle.y;
              
              if (ball.x - ball.size < paddle.x + paddle.width && ball.y > paddle.y && ball.y < paddle.y + paddle.height) {
                ball.dx *= -1.1;
                if (Math.abs(ball.dx) > ball.maxSpeed)
                    ball.dx = Math.sign(ball.dx) * ball.maxSpeed

                let relativeIntersectY = (ballHitY - paddle.height / 2) / (paddle.height / 2);
                ball.dy = relativeIntersectY * 4;

                if (ball.dy > 5) ball.dy = 5;
                if (ball.dy < -5) ball.dy = -5;
          
                triggerImpactEffect();
              }
            } else if (playerN === 2) {
              paddle = player2.paddle;
              ballHitY = ball.y - paddle.y;
          
              if (ball.x + ball.size > paddle.x && ball.y > paddle.y && ball.y < paddle.y + paddle.height) {
                ball.dx *= -1.1;
                if (Math.abs(ball.dx) > ball.maxSpeed)
                    ball.dx = Math.sign(ball.dx) * ball.maxSpeed
                
                let relativeIntersectY = (ballHitY - paddle.height / 2) / (paddle.height / 2);
                ball.dy = relativeIntersectY * 4;
                
                if (ball.dy > 5) ball.dy = 5;
                if (ball.dy < -5) ball.dy = -5;
          
                triggerImpactEffect();
              }
            }
          };

        const shakeScreen = () => {
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

        const triggerImpactEffect = () => {
            if (Math.abs(ball.dx) >= ball.shakeSpeed) {
                shakeDuration = 5;
            }
        }

        const update = () => {
            playerDirection(player1);
            ballMovement();

            ballToPaddleCheck(1);
            ballToPaddleCheck(2);

            playerDirection(player2);

            //updatePaddleColors();
            shakeScreen();
        }

        const gameLoop = () => {
            //console.log('in game loop');
            update();
            draw();

            if (isReady)
                requestAnimationFrame(gameLoop);
            else
                return ;
        }
        if (isReady)
            gameLoop();
    }, [isReady]);
    window.addEventListener('resize', handleResize);

    return (
        <>
            {isStarted ?
                (
                    <div className='gameContainer'>
                        <canvas ref={pongCanvas} id='gameCanvas' width={width} height={height}></canvas>
                        <div>
                            <button onClick={() => {setIsStarted(isStarted => !isStarted)}}>Game = {isStarted ? 'On' : 'Off'}</button>
                        </div>
                    </div>
                )
                :
                (<div>
                    <h1>
                        Game Menu
                    </h1>
                    <div>
                        <button onClick={() => {setIsStarted(isStarted => !isStarted)}}>Game = {isStarted ? 'On' : 'Off'}</button>
                    </div>
                </div>)
            }
        </>
    )
}

export default Game