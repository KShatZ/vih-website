const privacyPolicyLink = document.getElementById("privacy-policy");
const privacyModal = document.getElementById("privacy-modal");
const closePrivacy = document.querySelector("#privacy-modal .modal-close-button");
const privacyContent = document.querySelector("#privacy-modal .modal-content-container");

privacyPolicyLink.addEventListener("click", (e) => {
    e.preventDefault();
    privacyModal.classList.add("open");
    privacyContent.scrollTop = 0;
    document.body.classList.add("prevent-scroll");
});

closePrivacy.addEventListener("click", () => {
    privacyModal.classList.remove("open");
    document.body.classList.remove("prevent-scroll");
});

privacyModal.addEventListener("click", (e) => {
    if (privacyModal.classList.contains("open")){
        if (e.target == privacyModal) {
            privacyModal.classList.remove("open");
            document.body.classList.remove("prevent-scroll");
        }
    }
});

const termsLink = document.getElementById("terms-conditions");
const termsModal = document.getElementById("terms-modal");
const closeTerms = document.querySelector("#terms-modal .modal-close-button");
const termsContent = document.querySelector("#terms-modal .modal-content-container");

termsLink.addEventListener("click", (e) => {
    e.preventDefault();
    termsModal.classList.add("open");
    termsContent.scrollTop = 0;
    document.body.classList.add("prevent-scroll");
});

closeTerms.addEventListener("click", () => {
    termsModal.classList.remove("open");
    document.body.classList.remove("prevent-scroll");
});

termsModal.addEventListener("click", (e) => {
    if (termsModal.classList.contains("open")){
        if (e.target == termsModal) {
            termsModal.classList.remove("open");
            document.body.classList.remove("prevent-scroll");
        }
    }
});