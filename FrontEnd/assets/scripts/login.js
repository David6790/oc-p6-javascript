/***********************************************/

// ------ DÉCLARATION DES VARIABLES ----------//

/***********************************************/

let formLogin = document.getElementById("formLogin");
let token = "";

/***********************************************/

// ------ DÉCLARATION DES FONCTIONS ----------//

/***********************************************/

// fonction pour s'authentifier sur l'API afin d'obtenir le TOKEN. Utilisation d'un object FormData pour stocker les inputs email et passwords de l'input de l'utilisateur. Fetch avec methode post. Si les identifiant sont correct, enregirstrer le token dans le sessionStorage.

const getToken = async () => {
  const userFormData = new FormData(formLogin);
  const userFormDataObj = {};
  userFormData.forEach((value, key) => (userFormDataObj[key] = value));
  console.log(userFormDataObj);
  let loginParam = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userFormDataObj),
  };
  await fetch("http://localhost:5678/api/users/login", loginParam)
    .then((res) => res.json())
    .then((data) => (token = data.token));
  console.log(token);
  if (token) {
    sessionStorage.setItem("token", token);
    window.location.replace("./index.html");
  } else {
    alert("Identifiant ou mot de passe incorrect! ");
  }
};

const userLogIn = () => {
  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();
    getToken();
  });
};

/***********************************************/

// ------ Éxécution DES FONCTIONS ----------//

/***********************************************/

userLogIn();
