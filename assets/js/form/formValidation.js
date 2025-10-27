import * as utils from './formUtils.js';

export function initFormValidation() {

const form = document.getElementById('registrationForm'); // On récupere le formulaire
const sanitizeData = {}; // objet pour contenir les données sécurisé du formulaire
const successMessage = document.querySelector('.success-message');

if (form) {
form.addEventListener('submit', function (e) { // Quand le formulaire est soumis
    e.preventDefault();  // On enleve le comportement par défaut

    const target = e.currentTarget; // On récupere la cible de l'evenement (ici le formulaire)
    const inputs = target.elements; // On récupere dans un objet tout les elements du formulaire
    let validate = true; // On déclare une variable qui nous servira a confirmer si la formulaire est valide

    Array.from(inputs).forEach(input => { // On copie les elements de l'objet dans un tableau puis 
                                          // on effectue les vérification ci dessous pour chaque élément
        
        validate = utils.findInputType(input) && validate; // on met a jour la variable validate a chaque input
                                                     // et on l'empeche de changer de changer si un des champs est false
        if (input.name && utils.findInputType(input)) { // si le champs existe et est valide 
        // pour chaque champs on ajoute sa valeur sécurisé a l'objet
        sanitizeData[input.name] = utils.escapeHtml(input.value);
    }
        
    });

    if (validate === true) { // si la variable est true apres les vérifications ci dessus 
        console.log('validé!')
        successMessage.classList.add('show');
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 3000);
        // target.submit(); // on envoie le formulaire  <- mis en commentaire car cela recharge la page et empeche les animations
    }
    
})


const inputs = document.querySelectorAll('form input'); // on récupere tout les inputs

inputs.forEach(input => {
    
    input.addEventListener('input', function () {
        utils.findInputType(input);
    })
    
    
});

const passwordToggle = document.getElementById('passwordToggle');
const passwordInput = document.querySelector('input#password');
let hidden = true;

passwordToggle.addEventListener('click', function () {

if (hidden === true) {

    passwordInput.type = "text";
    passwordToggle.textContent = "Cacher";
    hidden = false;
}

else if (hidden === false) {

    passwordInput.type = "password";
    passwordToggle.textContent = "Afficher";
    hidden = true;
}

})

return sanitizeData;
}
}


