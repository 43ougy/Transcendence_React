import { useEffect, useRef, useState } from 'react'
import './Game.css'

function Game() {
    const [isStarted, setIsStarted] = useState(false);
    const pongCanvas = useRef(null);

    const startGame = () => {
        console.log('Game started');
    }
    useEffect(() => {
        if (isStarted)
            {
                console.log(`Animation running -> ${isStarted}`);
                pongCanvas.current.classList.add('is-animated');
                pongCanvas.current.addEventListener('animationend', () => {
                    startGame();
                })
            }
    }, [isStarted]);
    console.log(`is started2 -> ${isStarted}`);

    return (
        <>
            {isStarted ?
                (
                    <div>
                        <canvas ref={pongCanvas} id='gameCanvas' height={500} width={1000}></canvas>
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