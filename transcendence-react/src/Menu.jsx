import './Menu.css'
import GameOne from './GameCopy.jsx';
import { useRef, useState } from 'react';

function GameMenu() {
    const pongMenu = useRef(null);
    const [gameShow, setGameShow] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const handleStartClick = () => {
        setGameShow(true);
    };

    const launchGame = () => {
        pongMenu.current.classList.add('menu-animated');
        pongMenu.current.addEventListener('animationend', () => {
            setIsStarted(true);
        })
    };

    if (gameShow) {
        launchGame();
        if (isStarted) {
            return (
                <GameOne/>
            )
        }
    }
    
    return (
        <div className='menu'>
            <div ref={pongMenu} className='gameMenu'>
                <h1 className='gameTitle'>THE PONG</h1>
                <button className="GameButton" onClick={handleStartClick}>Start</button>
            </div>
        </div>
    );
}

export default GameMenu