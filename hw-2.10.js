const { log } = console;
const commentList = document.querySelector(".commentList");
const commentListData = [
    {
        name: "Глеб Фокин",
        time: "12.02.22 12:18",
        comment: "Это будет первый комментарий на этой странице",
        likes: 3,
    },
    {
        name: "Варвара Н.",
        time: "13.02.22 19:22",
        comment: "Мне нравится как оформлена эта страница! ❤",
        likes: 75,
    },
];

renderCommentList = () => {
    comment
}
"use strict";
const cardElement = document.getElementById("commentsId");
const buttonElement = document.getElementById("buttonId");
const inputName = document.getElementById("nameTextId");
const inputText = document.getElementById("commentTextId");
const likeElement = document.getElementsByClassName("like-button");

let time = {
    hour: 'numeric',
    minute: 'numeric',
};
let year = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
};
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
    }

    const textHtml =
        `<ul class="comments">
        <li class="comment">
          <div class="comment-header">
            <div>${inputName.value}</div>
            <div>${date.toLocaleString("ru", year) + " " + date.toLocaleString('ru', time)}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${inputText.value} 
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">0</span>
              <button class="like-button"></button>
            </div>
          </div>
        </li>
      </ul>`

    cardElement.innerHTML += textHtml;
    document.getElementById("nameTextId").value = "";
    document.getElementById("commentTextId").value = "";
    log(likeElement)
    log(textHtml)
});

console.log("It works!");