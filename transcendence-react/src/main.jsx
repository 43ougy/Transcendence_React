import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import App from './App.jsx'
//import Game from './Game.jsx'
import Menu from './Menu.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='wrapper'>
        <div className='box'>Box1</div>
        <div className='box'>Box2</div>
        <div className='box'>Box3</div>
        <div className='box'>Box4</div>
        <div className='box'>Box5</div>
    </div>
    <Menu/>
  </StrictMode>,
)
