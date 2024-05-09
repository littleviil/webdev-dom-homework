import { addRegButton, nameReg, loginReg, passwordReg } from "./dom";

const addUser = () => {
    //Ввод
    addRegButton.addEventListener("click", (event) => {
        event.stopPropagation();
        nameReg.classList.remove("error");
        loginReg.classList.remove("error");
        passwordReg.classList.remove("error");

        if ((nameReg.value.length === 0) || (loginReg.value.length === 0) || (passwordReg.value.length === 0)) {
            if ((nameReg.value.length === 0) && (inputName.value.length === 0) && (passwordReg.value.length === 0)) {
                nameReg.classList.add("error");
                loginReg.classList.add("error");
                passwordReg.classList.add("error");
                return;
            }
            else if (nameReg.value.length === 0) {
                nameReg.classList.add("error");
                return;
            }
            else if (loginReg.value.length === 0) {
                loginReg.classList.add("error");
                return;
            }
            else if (passwordReg.value.length === 0) {
                passwordReg.classList.add("error");
                return;
            }
        };

        nameReg.value = "";
        loginReg.value = "";
        passwordReg.value = "";
    });
};

export const renderLogin = ({ getCommentsFromServer }) => {
    const appElement = document.getElementById("app");
    const loginHtml = `
    <div class="container">
    <div class="add-form">
      <h3>Форма входа</h3>
      <input
        type="text"
        id="loginInput"
        value=""
        class="add-form-login"
        placeholder="Ваш логин"
      />
      <input
        type="text"
        id="passwordInput"
        class="add-form-login"
        placeholder="Ваш пароль"
      />
      <button id="loginButton" class="login-button">Войти</button>
      <a href="login.html">Зарегистрироваться</a>
    </div>
  </div>`;

    appElement.innerHTML = loginHtml;

    const buttonLogin = document.getElementById("loginButton");
    const loginInputElement = document.getElementById("loginInput");
    const passwordInputElement = document.getElementById("passwordInput");

    buttonLogin.addEventListener("click", () => {
        login({
            login: loginInputElement.value,
            password: passwordInputElement.value,
        }).then((responseData) => {
            console.log(token);
            setToken(responseData.user.token);
            console.log(token);
        }).then(() => {
            getCommentsFromServer();
        });
    });
};