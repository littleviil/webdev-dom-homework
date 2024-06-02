import { postAPI, getAPI, token, userName } from './API.js';
import { checkInputForm } from './check.js';
import { renderLogin } from './renderLogin.js'
import { initEvent, searchSwap } from './events.js';

const initClickHandler = (comments) => {
  //Ввод
  const buttonElement = document.getElementById("add-buttonId");
  buttonElement.addEventListener("click", (event) => {
    event.stopPropagation();

    var inputName = document.getElementById("nameTextId");
    var inputText = document.getElementById("commentTextId");
    inputText.classList.remove("error");
    inputName.classList.remove("error");

    if ((inputText.value.length === 0) || (inputName.value.length === 0)) {
      if ((inputText.value.length === 0) && (inputName.value.length === 0)) {
        inputName.classList.add("error");
        inputText.classList.add("error");
        return;
      }
      else if (inputName.value.length === 0) {
        inputName.classList.add("error");
        return;
      }
      else if (inputText.value.length === 0) {
        inputText.classList.add("error");
        return;
      }
    };

    searchSwap(inputName);
    searchSwap(inputText);
    postAPI(inputName, inputText).then(() => {
      document.getElementById('loading').classList.remove('load');
      document.getElementById('form').classList.add('load');
    }).then(() => {
      return getAPI();
    }).then(() => {
      loadingForm.classList.add('load');
      checkInputForm({ inputName, inputText, buttonElement });
    }).then(() => {
      inputName = "";
      inputText = "";
      document.getElementById('loading').classList.add("load");
      document.getElementById("form").classList.remove("load");
    });
  });
};

export { initClickHandler };

const render = (comments) => {
  const appElement = document.getElementById("app");
  const userHtml = comments.map((user, index) => {
    return `<li class="comment" id="comment-block" data-index="${index}">
        <div class="comment-header" data-index="${index}">
          <div>${user.author}</div>
          <div>${user.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
          ${user.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${user.likes}</span>
            <button data-index="${index}" class="like-button ${user.isLiked === true ? '-active-like' : ''}"></button>
          </div>
          <button class="add-form-button edit-button" data-index="${index}">Редактировать</button>
        </div>
      </li>`
  }).join('');

  let bottomContent;
  if (token) {
    bottomContent = `<div id="loading" class="add-form load">Комментарий добавляется, подождите пожалуйста!</div>
    <div class="add-form" id="form">
      <input type="text" class="add-form-name" id="nameTextId" value="${userName}" placeholder="Введите ваше имя" />
        <textarea type="textarea" class="add-form-text" id="commentTextId" placeholder="Введите ваш коментарий"
          rows="4"></textarea>
        <div class="add-form-row">
          <button class="add-form-button" id="add-buttonId">Написать</button>
          <button id="delete-button" class="add-form-button">Удалить</button>
        </div>
      </div>`;
    const appHtml = `
  <div class="container">
    <ul class="comments" id="comments">${userHtml}</ul>
    <div id="loading" class="add-form load">Комментарий добавляется, подождите пожалуйста!</div>
    ${bottomContent}
  </div>`;
    appElement.innerHTML = appHtml;
    document.getElementById('nameTextId').readOnly = true;
    initClickHandler(comments);
    initEvent(comments);
  }
  else {
    bottomContent = `<a href="#" class="link-reg" id="reg">Чтобы добавить комментарий, авторизируйтесь</a>`;
    const appHtml = `
        <div class="container">
          <ul class="comments" id="comments">${userHtml}</ul>
          ${bottomContent}
        </div>`;
    appElement.innerHTML = appHtml;

    document.getElementById('reg').addEventListener("click", (event) => {
      event.stopPropagation();
      renderLogin();
    });
  };
};

export { render };