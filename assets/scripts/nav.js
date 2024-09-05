const hamburgerMenu = document.getElementById("hamburger-menu");
const navLinksItems = document.querySelectorAll("#nav-links li");
const navServices = document.getElementById("nav-services");
const servicesChevron = document.getElementById("services-chevron");
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
    hamburgerMenu.classList.toggle("open");

    if (navLinksClasses.contains("active")) {
        servicesChevron.classList.add("active");
        servicesDropdownClasses.add("active");
        
    } else {
        servicesChevron.classList.remove("active");
        servicesDropdownClasses.remove("active");
    };

    e.stopPropagation();
});

navServices.addEventListener("click", (e) => {
    servicesChevron.classList.toggle("active");
    servicesDropdownClasses.toggle("active");
});


document.addEventListener("click", (e) => {
    if (navLinksClasses.contains("active")) {
        if (e.target != document.getElementById("nav-links")) {
            hamburgerMenu.classList.remove("open");
            navLinksClasses.remove("active");
        }
    }

    if (servicesDropdownClasses.contains("active")) {
        if (e.target != servicesDropdown) {
            servicesChevron.classList.remove("active");
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
        hamburgerMenu.classList.remove("open");
        navLinksClasses.remove("active");
    }

    if (servicesDropdownClasses.contains("active")) {
        servicesChevron.classList.remove("active");
        servicesDropdownClasses.remove("active");
    }

    document.body.classList.add("disable-transitions");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove("disable-transitions");
    }, 200);
});