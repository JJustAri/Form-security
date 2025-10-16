import { initFormValidation } from "./form/formValidation.js";
import { initModals } from "./modal/modal.js";

document.addEventListener("DOMContentLoaded", () => {

    initFormValidation();
    initModals();
});