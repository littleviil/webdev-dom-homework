import { login, setToken, setUserName, token } from "./API.js";
import { searchSwap } from "./events.js";
import { renderReg } from "./renderReg.js";

export const renderLogin = ({ getCommentsFromServer }) => {
    const appElement = document.getElementById("app");
    const loginHtml = `
      <div class="container">
        <div class="add-form">
          <a class="link-sign-up" id="sign-up" href="#">Зарегистрироваться</a>
          <h3>Форма входа</h3>
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
            class="add-form-login"
            placeholder="Ваш пароль"
          />
          <button id="login-button" class="login-button">Войти</button>
        </div>
      </div>`;
  
    appElement.innerHTML = loginHtml;
  
    const link = document.getElementById("sign-up")
    const buttonElement = document.getElementById("login-button");
    const loginInputElement = document.getElementById("login-input");
    const passwordInputElement = document.getElementById("password-input");
  
    link.addEventListener("click", () => renderReg({ getCommentsFromServer }))
  
    buttonElement.addEventListener("click", () => {
      login({
        login: searchSwap(loginInputElement.value),
        password: searchSwap(passwordInputElement.value),
      })
        .then((responseData) => {
          if (responseData === "error") return Promise.reject();
          console.log(token);
          setToken(responseData.user.token);
          setUserName(responseData.user.name);
          console.log(token);
        })
        .then(() => {
          getCommentsFromServer();
        });
    });
  };