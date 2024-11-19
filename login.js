const menu = document.getElementById('menu');
const buttonMenu = document.querySelector('.menuButton');
const buttons = document.querySelectorAll('.btn');
const body = document.body;
const root = document.documentElement;
const backColor = getComputedStyle(root).getPropertyValue('--back-color');
const color1 = getComputedStyle(root).getPropertyValue('--color-1');
const color2 = getComputedStyle(root).getPropertyValue('--color-2');

function handleMenu() {
    menu.addEventListener('mouseover', () => {
        menu.style.transition = 'all .5s ease-in-out';
        menu.style.background='none';
    })
    
    menu.addEventListener('mouseout', () => {
        menu.style.background='';
        menu.style.boxShadow='';
    })
}

//handleMenu();