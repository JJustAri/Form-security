const form = document.getElementById('registrationForm'); // On récupere le formulaire

form.addEventListener('submit', function (e) { // Quand le formulaire est soumis
    e.preventDefault();  // On enleve le comportement par défaut

    const target = e.currentTarget; // On récupere la cible de l'evenement (ici le formulaire)
    const inputs = target.elements; // On récupere dans un objet tout les elements du formulaire
    let validate = false; // On déclare une variable qui nous servira a confirmer si la formulaire est valide
    
    Array.from(inputs).forEach(input => { // On copie les elements de l'objet dans un tableau puis 
                                          // on effectue les vérification ci dessous pour chaque élément
        
        validateInput(input);
    });

    if (validate === true) { // si la variable est true apres les vérifications ci dessus 
        console.log('validé!')
        target.submit(); // on envoie le formulaire
    }
    
})

function resetInputError(input) { // fonction appelé pour enlever les messages d'erreurs si le champ est valide
    const errorDiv = input.parentElement.querySelector('.error'); 
    errorDiv.textContent = "";
            input.classList.remove('invalid');
} 

const inputs = document.querySelectorAll('form input'); // on récupere tout les inputs

inputs.forEach(input => {
    
    input.addEventListener('input', function () {

        validateInput(input);
    })

    
});


function validateInput(input) {

if (input.type === "submit") { // si l'élément est de type submit (generalement le bouton) on passe au suivant

            return;
        }

        
        const minlength = input.minLength; // on récupere la minLength si il y'en a une
        const errorDiv = input.parentElement.querySelector('.error'); 
        
        //si l'élément est un texte et que sa longueur est supérieur a celle requise
        if (input.type === "text" && minlength && input.value.length >= minlength) {
            resetInputError(input); // on appelle la fonction qui permet d'enlever les potentiels erreurs affichées
            validate = true; // on valide 
            
        } // sinon si l'élément est un texte et qu'aucune minlength n'est précisé mais l'element au moins 1 charactere 
        else if (input.type === "text" && !minlength && input.value.length > 0){
            resetInputError(input); // on appelle la fonction qui permet d'enlever les potentiels erreurs affichées
            validate = true; // on valide
            
        }
        else { 
            validate = false; // sinon le formulaire est non valide 

            
            errorDiv.textContent = input.dataset.error; // Et on fait apparaitre un message d'erreur

            input.classList.add('invalid');
        }

}