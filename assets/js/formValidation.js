const form = document.getElementById('registrationForm'); // On récupere le formulaire

form.addEventListener('submit', function (e) { // Quand le formulaire est soumis
    e.preventDefault();  // On enleve le comportement par défaut

    const target = e.currentTarget; // On récupere la cible de l'evenement (ici le formulaire)
    const inputs = target.elements; // On récupere dans un objet tout les elements du formulaire
    let validate = true; // On déclare une variable qui nous servira a confirmer si la formulaire est valide
    
    Array.from(inputs).forEach(input => { // On copie les elements de l'objet dans un tableau puis 
                                          // on effectue les vérification ci dessous pour chaque élément
        
        if (validateInput(input) === false) { // si un des champs n'est pas valide validate = false
            validate = false; 
        }
    });

    if (validate === true) { // si la variable est true apres les vérifications ci dessus 
        console.log('validé!')
        target.submit(); // on envoie le formulaire
    }
    
})


const inputs = document.querySelectorAll('form input'); // on récupere tout les inputs

inputs.forEach(input => {
    
    input.addEventListener('input', function () {
        validateInput(input);
    })
    
    
});

function resetInputError(input) { // fonction appelé pour enlever les messages d'erreurs si le champ est valide
    const errorDiv = input.parentElement.querySelector('.error'); 
    errorDiv.textContent = "";
            input.classList.remove('invalid');
} 

// fonction pour la vérification des champs
function validateInput(input) {
    
    if (input.type === "submit") { // si l'élément est de type submit (generalement le bouton) on passe au suivant
        
        return true;
    }
    
    
    const minlength = input.minLength; // on récupere la minLength si il y'en a une
    const errorDiv = input.parentElement.querySelector('.error'); 
    let validate = false;
    
    //si l'élément est un texte et que sa longueur est supérieur a celle requise
    if (input.type === "text" && ((minlength && input.value.length >= minlength) || !minlength)) {
        resetInputError(input); // on appelle la fonction qui permet d'enlever les potentiels erreurs affichées
        addInputSuccess(input);
        validate = true; // on valide 
        
    } 
        else if (input.type === "tel" && input.value.length === 10) {
        resetInputError(input); // on appelle la fonction qui permet d'enlever les potentiels erreurs affichées
        addInputSuccess(input);
        validate = true; // on valide

        }
        else { 
            validate = false; // sinon le formulaire est non valide 

            
            errorDiv.textContent = input.dataset.error; // Et on fait apparaitre un message d'erreur

            input.classList.add('invalid'); // on ajoute la classe invalid pour changer le Css
        }

        return validate;

}

function addInputSuccess(input) {
    input.classList.add('valid');
    
}