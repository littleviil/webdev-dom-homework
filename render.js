import { cardElement } from './dom.js';
import { addLikeClickButton, editComments } from './events.js';
import { buttonElement, inputName, inputText, loadingComment, inputForm } from './dom.js';
import { postAPI, token, userName } from './API.js';
import { checkInputForm, checkDeleteButton } from './check.js';
import { loginReg } from './renderLogin.js';

const render = (comments) => {
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

  if (token)
    bottomContent = `<div class="add-form" id="form">
      <input type="text" class="add-form-name" id="nameTextId" value="${user.author.name}" placeholder="Введите ваше имя" />
        <textarea type="textarea" class="add-form-text" id="commentTextId" placeholder="Введите ваш коментарий"
          rows="4"></textarea>
        <div class="add-form-row">
          <button class="add-form-button" id="add-buttonId">Написать</button>
          <button id="delete-button" class="add-form-button">Удалить</button>
        </div>
      </div>`;
  else
    bottomContent = `<a href="#" class="link-reg" id="reg">Чтобы добавить комментарий, авторизируйтесь</a>`;

  const appHtml = `
  <div class="container">
    <ul id="list" class="comments">${userHtml}</ul>
    ${bottomContent}
  </div>`;

  cardElement.innerHTML = appHtml;

  addLikeClickButton(comments);
  checkInputForm();
  checkDeleteButton(comments);
  editComments(comments);
  loginReg();
};

export { render };

const initClickHandler = (comments) => {
  //Ввод
  buttonElement.addEventListener("click", (event) => {
    event.stopPropagation();
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
    loadingComment.classList.remove('load');
    document.getElementById('form').classList.add('load');

    postAPI(inputName, inputText);

    inputName.value = "";
    inputText.value = "";

    loadingComment.classList.add('load');
    document.getElementById('form').classList.remove('load');

    render(comments);
    checkInputForm();
  });
};

export { initClickHandler };