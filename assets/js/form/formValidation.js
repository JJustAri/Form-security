import * as utils from './formUtils.js';

export function initFormValidation() {

const form = document.getElementById('registrationForm'); // On récupere le formulaire

form.addEventListener('submit', function (e) { // Quand le formulaire est soumis
    e.preventDefault();  // On enleve le comportement par défaut

    const target = e.currentTarget; // On récupere la cible de l'evenement (ici le formulaire)
    const inputs = target.elements; // On récupere dans un objet tout les elements du formulaire
    let validate = true; // On déclare une variable qui nous servira a confirmer si la formulaire est valide
    
    Array.from(inputs).forEach(input => { // On copie les elements de l'objet dans un tableau puis 
                                          // on effectue les vérification ci dessous pour chaque élément
        
        utils.findInputType(input);
    });

    if (validate === true) { // si la variable est true apres les vérifications ci dessus 
        console.log('validé!')
        target.submit(); // on envoie le formulaire
    }
    
})


const inputs = document.querySelectorAll('form input'); // on récupere tout les inputs

inputs.forEach(input => {
    
    input.addEventListener('input', function () {
        utils.validateInput(input);
    })
    
    
});
}


