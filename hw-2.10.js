const { log } = console;
"use strict";

const commentsList = document.querySelectorAll(".commentsList");

const cardElement = document.getElementById("comments");
const buttonElement = document.getElementById("add-buttonId");
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

renderCommentList = () => {
  const userHtml = users.map((user) => {
    return `<li class="comment">
        <div class="comment-header">
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
            <button class="like-button"></button>
          </div>
        </div>
      </li>`
  }).join('');
  cardElement.innerHTML = userHtml;
};
renderCommentList();

//Enter
document.addEventListener("keyup", (event) => {
  if (event.code === 'Enter') {
    document.getElementById("add-buttonId").click();
    return;
  }
});

// const initEventList = () => {
//   const commentList = document.querySelectorAll(".commentList");
//   for (const commetList of commentsList) {
//     commentList.addEventListener("click", () => {
//       if (commentList.likeStatus() === false) {
//         commentList.likeStatus() = true;
//       } else commentList.likeStatus() = false;
//     });
//   }
// };

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

  users.push({
    name: inputName.value,
    time: date.toLocaleString("ru", year) + " " + date.toLocaleString('ru', time),
    comment: inputText.value,
    likes: 0,
    likeStatus: false,
  });

  renderCommentList();

  inputName.value = "";
  inputText.value = "";
});

renderCommentList();

console.log("It works!");