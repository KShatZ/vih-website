const hamburgerMenu = document.getElementById("hamburger-menu");
const navLinksItems = document.querySelectorAll("#nav-links li");
const navServices = document.getElementById("nav-services");
const servicesDropdown = document.getElementById("nav-services-dropdown");

const navLinksClasses = document.getElementById("nav-links").classList;
const servicesDropdownClasses = document.getElementById("nav-services-dropdown").classList;


document.addEventListener("DOMContentLoaded", () => {

    const lead = servicesDropdown.querySelector("li:last-child");

    if (lead.classList.contains("active")) {
        servicesDropdownClasses.add("lead-active");
    } else {
        servicesDropdownClasses.remove("lead-active");
    }
});

hamburgerMenu.addEventListener("click", (e) => {
    
    navLinksClasses.toggle("active");

    if (navLinksClasses.contains("active")) {
        servicesDropdownClasses.add("active");
    } else {
        servicesDropdownClasses.remove("active");
    };

    e.stopPropagation();
});

navServices.addEventListener("click", (e) => {
    servicesDropdownClasses.toggle("active");
});


document.addEventListener("click", (e) => {
    if (navLinksClasses.contains("active")) {
        if (e.target != document.getElementById("nav-links")) {
            navLinksClasses.remove("active");
        }
    }

    if (servicesDropdownClasses.contains("active")) {
        if (e.target != servicesDropdown) {
            servicesDropdownClasses.remove("active");
        }
    }
});

navLinksItems.forEach((item) => {
    item.addEventListener("click", (e) => {
        e.stopPropagation();
    });
});

// Prevent nav-bar shenanigins on resize of window
let resizeTimer;
window.addEventListener("resize", () => {

    if (navLinksClasses.contains("active")) {
        navLinksClasses.remove("active");
    }

    if (servicesDropdownClasses.contains("active")) {
        servicesDropdownClasses.remove("active");
    }

    document.body.classList.add("disable-transitions");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove("disable-transitions");
    }, 200);
});