/***********************************************/

// ------ DÉCLARATION DES VARIABLES ----------//

/***********************************************/

let formLogin = document.getElementById("formLogin");
let token = "";

/***********************************************/

// ------ DÉCLARATION DES FONCTIONS ----------//

/***********************************************/

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

userLogIn();
