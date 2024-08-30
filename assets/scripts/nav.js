const hamburgerMenu = document.getElementById("hamburger-menu");
const navLinks = document.getElementById("nav-links");


hamburgerMenu.addEventListener("click", (e) => {
    navLinks.classList.toggle("active")
});

// Add clicking outside of dropdown to close it