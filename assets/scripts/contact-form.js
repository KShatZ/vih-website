const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("contact-form-status");
const inquiryContainer = document.getElementById("inquiry-container");


contactForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    // Reset status, if multiple attempts
    if (formStatus.classList.contains("active")) {
        formStatus.classList.remove("active", "error");
        inquiryContainer.classList.remove("status-active");
        formStatus.firstElementChild.innerText = "";
    }

    const formData = new FormData(contactForm);
    const body = Object.fromEntries(formData.entries());
    
    try {
        grecaptcha.ready(function () {
            grecaptcha.execute("6Le2tVoqAAAAABwVor7zjLaav1mQh34i5Lny7evR", {action: "submit"}).then(async function (token) {
                
                body.captchaToken = token;

                const response = await fetch("/send-email", {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    contactForm.reset();
                    inquiryContainer.classList.add("status-active");
                    formStatus.classList.add("active");
                    formStatus.firstElementChild.innerText = "Your message has been sent successfully, we will be in touch with you soon!";
        
                } else {
                    inquiryContainer.classList.add("status-active");
                    formStatus.classList.add("active", "error");
            
                    switch(response.status) {
                        case 403: //Failed Captcha --TODO
                            formStatus.firstElementChild.innerText = "Can't send your message at this time...";
                            break;
                        case 500:
                            formStatus.firstElementChild.innerText = "There was an issue sending your message. Please try again or send us an email at info@vihsolutions.com";
                            break;
                        default:
                            formStatus.firstElementChild.innerText = "An unexpected error occured...";
                            break;
                    }
                }
            });
        });
    } catch (error) {
        inquiryContainer.classList.add("status-active");
        formStatus.classList.add("active", "error");
        formStatus.firstElementChild.innerText = "There was an issue sending your message. Please try again or send us an email at info@vihsolutions.com";
    }
});