import { getAPI, registr, setToken, setUserName, token } from "./API.js";
import { searchSwap } from "./events.js";
import { renderLogin } from "./renderLogin.js";

export const renderReg = () => {
    const appElement = document.getElementById("app");
    const loginHtml = `
      <div class="container">
        <div class="add-form">
          <h3 class="form-entry">Регистрация</h3>
          <input
            type="text"
            id="name-input"
            value=""
            class="add-form-login"
            placeholder="Введите имя"
          />
          <input
            type="text"
            id="login-input"
            value=""
            class="add-form-login"
            placeholder="Ваш логин"
          />
          <input
            type="text"
            id="password-input"
            value=""
            class="add-form-login"
            placeholder="Ваш пароль"
          />
          <button id="login-button" class="login-button">Зарегистрироваться</button>
          <a class="link-sign-up" href="#" id="sign-in">Войти</a>
        </div>
      </div>`;
    appElement.innerHTML = loginHtml;

    const link = document.getElementById("sign-in");
    const buttonLogin = document.getElementById("login-button");
    const loginInputElement = document.getElementById("login-input");
    const passwordInputElement = document.getElementById("password-input");
    const nameInputElement = document.getElementById("name-input");
    link.addEventListener("click", () => renderLogin());

    buttonLogin.addEventListener("click", () => {
        registr({
            name: searchSwap(nameInputElement.value),
            login: searchSwap(loginInputElement.value),
            password: searchSwap(passwordInputElement.value),
        }).then((responseData) => {
            if (responseData === "error") return Promise.reject();
            console.log(token);
            setToken(responseData.user.token);
            setUserName(responseData.user.name);
            console.log(token);
        }).then(() => {
            getAPI();
        });
    });
};