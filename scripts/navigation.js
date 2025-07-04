
const navbuttom = document.querySelector('#ham-btn');
const navlinks = document.querySelector('#nav-bar');

navbuttom.addEventListener('click', () => {
    navbuttom.classList.toggle('show');
    navlinks.classList.toggle('show');
});