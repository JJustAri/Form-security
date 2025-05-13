const links = document.querySelectorAll('[data-modal]'); // On récupere les liens d'ouverture des modals
const modalFilter = document.getElementById('modalFilter'); // Et le filtre modal

//Pour chaque lien on ajoute un listener au click 
links.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // suppréssion du comportement par défaut (ici du lien)

        const modal = document.getElementById(link.dataset.modal); // on récupére le modal grace a l'id
        modal.classList.add('animate-opacity');                             // stocké dans le data-modal puis on l'affiche
        modalFilter.style.display = "block";
    })
});

const closebuttons = document.querySelectorAll('[data-close]'); // récupération des liens de fermeture du modal

// pour chaque liens de fermeture on supprime le comportement par défaut et on fait disparaitre le modal et le filtre
closebuttons.forEach(button => { 
    button.addEventListener('click', function (e) {
        e.preventDefault();

        const modal = button.closest('.modal');
        modal.classList.remove('animate-opacity');
        modalFilter.style.display = "none";
    })
});

// const form = document.getElementById('registrationForm');

// form.addEventListener('submit', function (e) {
//     e.preventDefault();
//     const target = e.currentTarget;
// })