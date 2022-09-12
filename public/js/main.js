// Mobile Dropdown Menu
const mobileHam = document.querySelector('#mobile-button')
const btnHam = document.querySelectorAll('.ham-icon')
const mobileMenu = document.querySelector('#mobile-menu')

mobileHam.addEventListener('click', () => {
  btnHam.forEach(e => e.classList.toggle('hidden'))
  mobileMenu.classList.toggle('hidden')
})