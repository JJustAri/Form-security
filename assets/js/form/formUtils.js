
export function resetInputError(input) { // fonction appelé pour enlever les messages d'erreurs si le champ est valide
    const errorDiv = input.parentElement.querySelector('.error'); 
    errorDiv.textContent = "";
            input.classList.remove('invalid');
}

export function addInputSuccess(input) { // fonction de succes lors de la validation d'un input
    input.classList.add('valid');
    
}

export function findInputType(input) {  // fonction pour lancer la fonction de la validation approprié au type de l'input

    if (input.type === "submit") { // si l'élément est de type submit (generalement le bouton) on passe au suivant
        return true;
    }

    const inputType = input.dataset.type || input.type;

    const validators = {   // on crée un objet pour stocker les fonctions de la validation selon chaque type d'input
    text : validateInputText,       //text
    tel : validateInputTel,         //tel
    email : validateInputMail,      //email
    password : validateInputPassword // password
};

    const validator = validators[inputType] || showError;  // On va récuperer la fonction correspondante grace au type de l'input 
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

const errorMessages = {  // Objet pour contenir les messages d'erreurs
    required: "❌ Ce champ est obligatoire.",
    minlength: min => `Minimum ${min} caractères requis.`,
    invalid: "❌ Format invalide.",
    errorTel: "❌ Le numéro doit contenir seulement 10 chiffres.",
    errorText: "❌ Le champ ne doit contenir que des lettres, des espaces ou des tirets.",
    errorEmail: `❌ L’adresse email n’est pas valide. Veuillez vérifier le format (ex: utilisateur@domaine.com)`,
    errorPassword: "❌ Mot de passe invalide — au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial."
};


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
        errorDiv.textContent = errorMessages.minlength(minlength); // on affiche un message d'erreur
        input.classList.add('invalid'); // on ajoute la classe invalid pour changer le Css
        validate = false;
    }
    
    return validate;
}


function validateInput(input) { // fonction de validation des inputs en apparence (css)
    
    resetInputError(input); // on appelle la fonction qui permet d'enlever les potentiels erreurs affichées
    addInputSuccess(input);
}

export function validateInputText(input) { // fonction de validation des inputs text 
    
    let validate = true;

    if (!emptyField(input) || !minlengthNotValid(input) || !sanitizeTextInput(input)) {  // si une des fonctions renvoie false

        validate = false;   // on invalide 
    }

    if (validate === true) { // si toute les fonctions renvoie true 
        validateInput(input);  // on valide l'input visuellement

    }
    
    return validate; 
}

function validateInputTel(input) { // fonction de validation des inputs tel    let validate = true;
    let validate = true;
    
    if (!emptyField(input) || !sanitizeTelInput(input)) { // si une des fonctions renvoie false 

        validate = false;  // on invalide
    }

    if (validate === true) {
        validateInput(input);
    }

    return validate;
}

function validateInputMail(input) { // fonction de validation des inputs tel

    let validate = true;

    if (!emptyField(input) || !sanitizeEmailInput(input)) { // si une des fonctions renvoie false 

        validate = false;  // on invalide
    }

    if (validate === true) {
        validateInput(input);
    }

    return validate;
}

function validateInputPassword(input) {

    let validate = true;

    if (!emptyField(input) || !sanitizePasswordInput(input) ) { // si une des fonctions renvoie false 

        validate = false;  // on invalide
    }

    if (validate === true) {
        validateInput(input);
    }
}

function sanitizePasswordInput(input) {

    let validate = true;
    const errorDiv = input.parentElement.querySelector('.error');
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#+=^_-])[A-Za-z\d@$!%*?&#+=^_-]{9,}$/;

    if(!passwordRegex.test(input.value)) {

        errorDiv.textContent = errorMessages.errorPassword;     // message d'erreur
        input.classList.add('invalid');
        validate = false;
    }

    return validate;
}

function sanitizeTelInput(input) { // fonction pour vérifier qu'il s'agit bien d'un numéro de telephone 

    let validate = true; 
    const errorDiv = input.parentElement.querySelector('.error');
    const phoneRegex = /^\d{10}$/;
    input.value = input.value.replace(/\s/g, "");

    if (!phoneRegex.test(input.value)) {

        errorDiv.textContent = errorMessages.errorTel;     // message d'erreur
        input.classList.add('invalid');
        validate = false;
    }

        return validate;
    }
    
    


function sanitizeTextInput(input) { //fonction de netoyage des inputs text

    let validate = true; 
    const errorDiv = input.parentElement.querySelector('.error');
    const textRegex = /[^A-Za-zÀ-ÖØ-öø-ÿ\s-]/;
    input.value = input.value.trim();

    if (textRegex.test(input.value)) {

        errorDiv.textContent = errorMessages.errorText;     // message d'erreur
        input.classList.add('invalid');
        validate = false;
    }

        return validate;
}

function sanitizeEmailInput(input) { //fonction de netoyage des inputs email

    let validate = true; 
    const errorDiv = input.parentElement.querySelector('.error');
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    input.value = input.value.trim();

    if (!emailRegex.test(input.value)) {

        errorDiv.textContent = errorMessages.errorEmail;     // message d'erreur
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

