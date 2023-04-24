/***********************************************/

// ------ DÉCLARATION DES VARIABLES ----------//

/***********************************************/

let formLogin = document.getElementById("formLogin");
let token = "";

/***********************************************/

// ------ DÉCLARATION DES FONCTIONS ----------//

/***********************************************/

// Fonction pour chercher le Token sur l'API. On récupère les données saisi par l'utilisateur à travers le Formulaire. On stock ces infos dans des variables. Les varibales qu'on intègre dans la méthode POST. Si les identifiants sont reconnu, l'api nous renvoi un token. Un token qu'on stock dans la session storage, puis on redirige vers la page d'acceuil.
const getToken = async () => {
  let userMail = document.getElementById("email").value;
  let userPassword = document.getElementById("password").value;
  console.log(userMail + "   " + userPassword);
  let loginParam = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userMail,
      password: userPassword,
    }),
  };
  await fetch("http://localhost:5678/api/users/login", loginParam)
    .then((res) => res.json())
    .then((data) => (token = data.token));

  if (token) {
    sessionStorage.setItem("token", token);
    window.location.replace("./index.html");
  } else {
    alert("Identifiant ou mot de passe incorrect! ");
  }
};

// fonction qui met en ecoute la validation du formulaire. avec un preventDefault pour eviter le rechargement par defaut de la page lors de la validation du formulaire.
const userLogin = () => {
  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();
    getToken();
  });
};

/***********************************************/

// ------ Exécution des fonctions ----------//

/***********************************************/

userLogin();
