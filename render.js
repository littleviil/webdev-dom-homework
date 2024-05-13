import { cardElement, linkReg } from './dom.js';
import { addLikeClickButton, editComments } from './events.js';
import { buttonElement, inputName, inputText, loadingComment } from './dom.js';
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
  if (token)
    bottomContent = `<div class="add-form">
        <input
          type="text"
          id="name-input"
          value="${userName}"
          class="add-form-name"
          placeholder="Введите ваше имя"
          disabled
        />
        <textarea
          type="textarea"
          id="comment-input"
          class="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
        ></textarea>
        <div class="add-form-row">
          <button id="add-button" disabled class="add-form-button">
            Написать
          </button>
        </div>
      </div>`;
  else linkReg.classList.add("link-active");

  cardElement.innerHTML = userHtml;

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