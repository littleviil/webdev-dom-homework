const { log } = console;
"use strict";

const commentsList = document.querySelectorAll(".commentsList");

const cardElement = document.getElementById("comments");
const buttonElement = document.getElementById("add-buttonId");
const inputName = document.getElementById("nameTextId");
const inputText = document.getElementById("commentTextId");
var li = document.getElementById("comments").getElementsByTagName("li");
const deleteButton = document.getElementById("delete-button");

let time = {
    hour: 'numeric',
    minute: 'numeric',
};
let year = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
};

const users = [
    {
        name: "Глеб Фокин",
        time: "12.02.22 12:18",
        comment: "Это будет первый комментарий на этой странице",
        likes: 3,
        likeStatus: false,
    },
    {
        name: "Варвара Н.",
        time: "13.02.22 19:22",
        comment: "Мне нравится как оформлена эта страница! ❤",
        likes: 75,
        likeStatus: true,
    },
];

//Блокировка кнопки "Написать"
function checkInputForm() {
    if (inputName.value.trim() === "" || inputText.value.trim() === "") {
        //Блокировка и серый
        buttonElement.disabled = true;
        buttonElement.classList.add("active-input");
    } else {
        //Разблокировка и не серый
        buttonElement.disabled = false;
        buttonElement.classList.remove("active-input");
    }
};
inputName.addEventListener("input", checkInputForm);
inputText.addEventListener("input", checkInputForm);
checkInputForm();

//Удаление последнего комментария
deleteButton.addEventListener('click', () => {
    users.pop();
    renderCommentList();
    checkInputForm();
});

//Неактивность кнопки удаления при 0 длинне массива объектов
function checkDeleteButton() {
    if (users.length === 0) {
        //Блокировка и серый
        deleteButton.disabled = true;
        deleteButton.classList.add("active-input");
    } else {
        //Разблокировка и не серый
        deleteButton.disabled = false;
        deleteButton.classList.remove("active-input");
    }
};

//Лайки
const addLikeClickButton = () => {
    const clickLikes = document.querySelectorAll('.like-button');

    for (const clickLike of clickLikes) {
        clickLike.addEventListener("click", (event) => {
            event.stopPropagation();
            const index = clickLike.dataset.index;
            if (users[index].likeStatus === false) {
                users[index].likes++;
                users[index].likeStatus = true;
            } else if (users[index].likeStatus === true) {
                users[index].likes--;
                users[index].likeStatus = false;
            }
            renderCommentList();
        });
    };
};

//Редактирование
const editComments = () => {
    const editButtons = document.querySelectorAll('.edit-button');
    var li = document.getElementById("comments").getElementsByTagName("li");

    for (const editButton of editButtons) {
        editButton.addEventListener("click", (event) => {
            event.stopPropagation();
            index = editButton.dataset.index;
            userHTML = `
                <div class="comment-header">
                    <input type="text" class="add-form-name" id="newNameTextId" value="${users[index].name}"></input>
                    <div>${users[index].time}</div>
                </div>
                <textarea type="textarea" class="add-form-text" id="newCommentTextId" rows="4">${users[index].comment}</textarea>
                <div class="add-form-row">
                    <button class="add-form-button" id="save-buttonId">Сохранить</button>
                    <button id="delete-button" class="add-form-button">Удалить</button>
                </div>`;
            li[index].innerHTML = userHTML;
            li[index].classList.add("edit-add-form");
            const editName = document.getElementById("newNameTextId");
            const editText = document.getElementById("newCommentTextId");
            document.getElementById('save-buttonId').addEventListener("click", () => {
                users[index].name = editName.value.replaceAll("<", "&lt").replaceAll(">", "&gt");
                users[index].comment = editText.value.replaceAll("<", "&lt").replaceAll(">", "&gt");
                editName.value = "";
                editText.value = "";
                renderCommentList();
            });
            document.getElementById('delete-button').addEventListener("click", () => {
                checkInputForm();
                renderCommentList();
            });
        });
    };

    for (const liClick of li) {
        liClick.addEventListener("click", (event) => {
            event.stopPropagation();
            index = liClick.dataset.index;

            inputText.value = "✦♡ " + users[index].comment + `\n Автор: ` + users[index].name + `♡✦\n`;
            checkInputForm();
        });
    };
};

//HTML разметка
const renderCommentList = () => {
    const userHtml = users.map((user, index) => {
        return `<li class="comment" id="comment-block" data-index="${index}">
        <div class="comment-header" data-index="${index}">
          <div>${user.name}</div>
          <div>${user.time}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
          ${user.comment}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${user.likes}</span>
            <button data-index="${index}" class="like-button ${user.likeStatus === true ? '-active-like' : ''}"></button>
          </div>
          <button class="add-form-button edit-button" data-index="${index}">Редактировать</button>
        </div>
      </li>`
    }).join('');
    cardElement.innerHTML = userHtml;

    addLikeClickButton();
    checkInputForm();
    checkDeleteButton();
    editComments();
};
renderCommentList();

//Enter
document.addEventListener("keyup", (event) => {
    if (event.code === 'Enter') {
        document.getElementById("add-buttonId").click();
        return;
    }
});

//Ввод
buttonElement.addEventListener("click", () => {
    const date = new Date();
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

    users.push({
        name: inputName.value.replaceAll("<", "&lt").replaceAll(">", "&gt"),
        time: date.toLocaleString("ru", year) + " " + date.toLocaleString('ru', time),
        comment: inputText.value.replaceAll("<", "&lt").replaceAll(">", "&gt").replaceAll("✦♡", "<div class='quote'>").replaceAll("♡✦", "</div>"),
        likes: 0,
        likeStatus: false,
    });

    renderCommentList();

    inputName.value = "";
    inputText.value = "";

    checkInputForm();
});

renderCommentList();
checkInputForm();
editComments();

console.log("It works!");