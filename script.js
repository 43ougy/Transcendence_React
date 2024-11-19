const menu = document.getElementById('menu');
const buttonMenu = document.querySelector('.menuButton');
const buttons = document.querySelectorAll('.btn');
const overlay = document.getElementById('overlay');
const buttonStart = document.getElementById('buttonStart');
const buttonOptions = document.getElementById('buttonOptions');
const buttonProfile = document.getElementById('buttonProfile');
const borderAnim = document.getElementById('borderAnim');
const borderAnim2 = document.getElementById('borderAnim2');
const body = document.body;
const root = document.documentElement;
const backColor = getComputedStyle(root).getPropertyValue('--back-color');
const color1 = getComputedStyle(root).getPropertyValue('--color-1');
const color2 = getComputedStyle(root).getPropertyValue('--color-2');

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

    buttonStart.addEventListener('mouseover', () => {
        body.style.backgroundImage="url('Icons/Capture d’écran du 2024-11-18 15-19-32.png')";
        body.style.backgroundSize="cover";
        body.style.boxShadow="inset 0 0 50px black,inset 0 0 100px black,inset 0 0 150px black,inset 0 0 270px black,inset 0 0 400px black";
    })

    buttonOptions.addEventListener('mouseover', () => {
        body.style.backgroundImage="url('Icons/04-1920x1080-93bc8f9277c05c92d97d689c2088150f.png')";
        body.style.backgroundSize="cover";
        body.style.boxShadow="inset 0 0 50px black,inset 0 0 100px black,inset 0 0 150px black,inset 0 0 270px black,inset 0 0 400px black";
    })

    buttonProfile.addEventListener('mouseover', () => {
        body.style.backgroundImage="url('Icons/Capture d’écran du 2024-11-18 15-42-04.png')";
        body.style.backgroundSize="cover";
        body.style.boxShadow="inset 0 0 50px black,inset 0 0 100px black,inset 0 0 150px black,inset 0 0 270px black,inset 0 0 400px black";
    })
}

handleMenu();