const hamburgerMenu = document.getElementById("hamburger-menu");
const navServices = document.getElementById("nav-services");

const navLinksClasses = document.getElementById("nav-links").classList;
const servicesDropdownClasses = document.getElementById("nav-services-dropdown").classList;


// Add clicking outside of both dropdowns to close it

hamburgerMenu.addEventListener("click", (e) => {
    
    navLinksClasses.toggle("active");

    if (navLinksClasses.contains("active")) {
        servicesDropdownClasses.add("active");
    } else {
        servicesDropdownClasses.remove("active");
    };

});

navServices.addEventListener("click", (e) => {

    servicesDropdownClasses.toggle("active");

});
