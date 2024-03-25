const dajBozeDaRadi = document.getElementById('hamburger');
const navbarNav = document.querySelector('.navbar-list ul');

dajBozeDaRadi.addEventListener('click', function () {
    navbarNav.classList.toggle('show');
});

