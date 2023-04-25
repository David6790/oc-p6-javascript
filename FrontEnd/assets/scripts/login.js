/***********************************************/

// ------ DÉCLARATION DES VARIABLES ----------//

/***********************************************/

let formLogin = document.getElementById("formLogin");
let token = "";

/***********************************************/

// ------ DÉCLARATION DES VARIABLES ----------//

/***********************************************/

const getToken = async () => {
  const myFormData = new FormData(formLogin);
  const formDataObj = {};
  myFormData.forEach((value, key) => (formDataObj[key] = value));
  console.log(formDataObj);
  let loginParam = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataObj),
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
