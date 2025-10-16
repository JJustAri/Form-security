
export function resetInputError(input) { // fonction appelé pour enlever les messages d'erreurs si le champ est valide
    const errorDiv = input.parentElement.querySelector('.error'); 
    errorDiv.textContent = "";
            input.classList.remove('invalid');
}


// fonction pour la vérification des champs
export function validateInput(input) {
    
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

export function addInputSuccess(input) {
    input.classList.add('valid');
    
}