
export function resetInputError(input) { // fonction appelé pour enlever les messages d'erreurs si le champ est valide
    const errorDiv = input.parentElement.querySelector('.error'); 
    errorDiv.textContent = "";
            input.classList.remove('invalid');
}


// fonction pour la vérification des champs
export function validateInput(input) {
      
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

export function addInputSuccess(input) { // fonction de succes lors de la validation d'un input
    input.classList.add('valid');
    
}

export function findInputType(input) {  // fonction pour lancer la fonction de la validation approprié au type de l'input

    if (input.type === "submit") { // si l'élément est de type submit (generalement le bouton) on passe au suivant
        return true;
    }

    const validators = {   // on crée un objet pour stocker les fonctions de la validation selon chaque type d'input
    text : validateInputText,       //text
    tel : validateInputTel,         //tel
    email : validateInputMail,      //email
};

    const validator = validators[input.type] || showError;  // On va récuperer la fonction correspondante grace au type de l'input 
                                                            // ou on envoie une erreur avec la fonction showError si le type n'est pas supporté
    return validator(input);   // On retourne le resultat de la fonction (true / false) pour valider ou non l'input

}

// DEUXIEME SOLUTION POSSIBLE
// switch (input.type) {
//     case "text" :
//         validateInputText(input);
//         break;
//     case "tel" :
//         validateInputTel(input);
//         break;
//     case "email" :
//         validateInputMail(input);
//         break;
//     default : showError(input);
// }

const errorMessages = {
    required: "Ce champ est obligatoire.",
    minlength: min => `Minimum ${min} caractères requis.`,
    invalid: "Format invalide.",
    minLengthTel: "Le numéro doit contenir 10 chiffres."
};

export function validateInputText(input) { // fonction de validation des inputs text 

    let validate = true;
    
    if (!emptyField(input) || !minlengthNotValid(input)) {  // si une des fonctions renvoie false

        validate = false;   // on invalide 
    }

    if (validate === true) { // si toute les fonctions renvoie true 
        validateInput(input);  // on valide l'input visuellement

    }
    
    return validate; 
}

function emptyField(input) { // fonction pour vérifier si le champ n'est pas vide

    let validate = true;
    const errorDiv = input.parentElement.querySelector('.error');

if (input.value.trim() === "") { // si le champ est vide

        errorDiv.textContent = errorMessages.required; // on affiche un message d'erreur
        input.classList.add('invalid'); // on ajoute la classe invalid pour changer le Css

        validate = false;
    }

    return validate;
}

function minlengthNotValid(input) { // fonction pour vérifier si la longueur minimale est respectée
    
    let validate = true;
    const errorDiv = input.parentElement.querySelector('.error');
    const minlength = input.minLength; // on récupere la minLength si il y'en a une

if (minlength > 0 && input.value.length < minlength) { // Si il ya une longueur minimale et que la longueur du champ
                                                            // est plus petite que la longueur minimale
        errorDiv.textContent = errorMessages.minlength(minlength);     // message d'erreur
        input.classList.add('invalid');

        validate = false;
    }

    return validate;
}


function validateInput(input) { // fonction de validation des inputs en apparence (css)
    
        resetInputError(input); // on appelle la fonction qui permet d'enlever les potentiels erreurs affichées
        addInputSuccess(input);
        validate = true; // on valide 
    }

function validateInputTel(input) { // fonction de validation des inputs tel

    let validate = true;

    if (!emptyField(input) || !minLengthTel(input)) { // si une des fonctions renvoie false 

        validate = false;  // on invalide
    }

    if (validate === true) {
        validateInput(input);
    }

    return validate;
}

function minLengthTel(input) { // fonction pour vérifier qu'il s'agit bien d'un numéro de telephone 

    let validate = true; 
    let inputSanitize = input.replace(/\D/g, ""); // on nettoie le champ en n'acceptant que des chiffres

    if  (inputSanitize.value.length !== 10) { // si le champ

        errorDiv.textContent = errorMessages.minLengthTel;     // message d'erreur
        input.classList.add('invalid');

        validate = false;
    }
    
    return validate;
}
    
export function escapeHtml(input) { // fonction pour empecher les caracteres spéciaux et donc les attaques XSS
    return input

      .replace(/&/g, "&amp;") // Remplace & par &amp;
      .replace(/</g, "&lt;") // Remplace < par &lt;
      .replace(/>/g, "&gt;") // Remplace > par &gt;
      .replace(/"/g, "&quot;") // Remplace " par &quot;
      .replace(/'/g, "&#039"); // Remplace ' par &#039;
}

