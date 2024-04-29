const { log } = console;
"use strict";

const commentsList = document.querySelectorAll(".commentsList");

const cardElement = document.getElementById("comments");
const buttonElement = document.getElementById("add-buttonId");
const inputName = document.getElementById("nameTextId");
const inputText = document.getElementById("commentTextId");
var li = document.getElementById("comments").getElementsByTagName("li");
const deleteButton = document.getElementById("delete-button");

document.getElementById('start-loading').classList.remove('load');
document.getElementById('form').classList.add('load');

// Получаю данные из API 
function getComments() {
    return fetch('https://wedev-api.sky.pro/api/v1/elena-saveleva/comments', {
        method: "GET"
    }).then((response) => {
        return response.json();
    }).then((responseData) => {
        const appComments = responseData.comments.map((user) => {
            const currentDate = new Date(user.date).toLocaleDateString('ru-Ru');
            const currentTime = new Date(user.date).toLocaleTimeString('ru-RU');
            return {
                author: user.author.name,
                date: `${currentDate} ${currentTime}`,
                text: user.text,
                likes: user.likes,
                isLiked: user.isLiked,
            };
        });
        comments = appComments;
        renderCommentList();
    }).then(() => {
        document.getElementById('start-loading').classList.add('load');
        document.getElementById('form').classList.remove('load');
    });
};
getComments();

let time = {
    hour: 'numeric',
    minute: 'numeric',
};
let year = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
};

let comments = [];

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
deleteButton.addEventListener('click', (event) => {
    event.stopPropagation();
    comments.pop();
    // fetch("https://wedev-api.sky.pro/api/v1/elena-saveleva/comments", {
    // method: "DELETE"
    renderCommentList();
    checkInputForm();
});

//Неактивность кнопки удаления при 0 длинне массива объектов
function checkDeleteButton() {
    if (comments.length === 0) {
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
            if (comments[index].isLiked === false) {
                comments[index].likes++;
                comments[index].isLiked = true;
            } else if (comments[index].isLiked === true) {
                comments[index].likes--;
                comments[index].isLiked = false;
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
                    <input type="text" class="add-form-name" id="newNameTextId" value="${comments[index].author}"></input>
                    <div>${comments[index].date}</div>
                </div>
                <textarea type="textarea" class="add-form-text" id="newCommentTextId" rows="4">${comments[index].text}</textarea>
                <div class="add-form-row">
                    <button class="add-form-button" id="save-buttonId">Сохранить</button>
                    <button id="delete-button" class="add-form-button">Удалить</button>
                </div>`;
            li[index].innerHTML = userHTML;
            li[index].classList.add("edit-add-form");
            const editName = document.getElementById("newNameTextId");
            const editText = document.getElementById("newCommentTextId");
            document.getElementById('save-buttonId').addEventListener("click", (event) => {
                event.stopPropagation();
                comments[index].author = editName.value.replaceAll("<", "&lt").replaceAll(">", "&gt");
                comments[index].text = editText.value.replaceAll("<", "&lt").replaceAll(">", "&gt");
                editName.value = "";
                editText.value = "";
                renderCommentList();
            });
            document.getElementById('delete-button').addEventListener("click", (event) => {
                event.stopPropagation();
                checkInputForm();
                renderCommentList();
            });
        });
    };

    for (const liClick of li) {
        liClick.addEventListener("click", (event) => {
            event.stopPropagation();
            index = liClick.dataset.index;

            inputText.value = "✦♡ " + comments[index].text + `\n Автор: ` + comments[index].author + `♡✦\n`;
            checkInputForm();
        });
    };
};

//HTML разметка
const renderCommentList = () => {
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


    document.getElementById('loading').classList.remove('load');
    document.getElementById('form').classList.add('load');

    fetch("https://wedev-api.sky.pro/api/v1/elena-saveleva/comments", {
        method: "POST",
        body: JSON.stringify({
            name: inputName.value.replaceAll("<", "&lt").replaceAll(">", "&gt"),
            text: inputText.value.replaceAll("<", "&lt").replaceAll(">", "&gt").replaceAll("✦♡", "<div class='quote'>").replaceAll("♡✦", "</div>"),
        }),
    }).then((response) => {
        return response.json();
    }).then(() => {
        return getComments();
    }).then(() => {
        document.getElementById('loading').classList.add('load');
        document.getElementById('form').classList.remove('load');
    });

    inputName.value = "";
    inputText.value = "";

    renderCommentList();
    checkInputForm();
});

renderCommentList();
checkInputForm();
editComments();

console.log("It works!");