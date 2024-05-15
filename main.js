// import { initClickHandler } from './render.js';
import { loadingForm } from './dom.js';
import { getAPI, comments } from './API.js';
import { loginReg } from './renderLogin.js';

export let user = null;
export function setUser(value) {
  user = value;
};

loadingForm.classList.remove('load');

getAPI(comments);

export function getCommentsFromServer() {
  getAPI(comments).then((responseData) => {
    console.log(responseData);
    comments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: printDate(new Date(comment.date)),
        text: comment.text,
        likes: comment.likes,
        isLiked: false,
        isEdit: false,
      };
    });
  }).catch((error) => {
    if (error === "Failed to fetch")
      alert("Кажется, у вас сломался интернет, попробуйте позже");
    else
      throw error
  });
};

//Enter
document.addEventListener("keyup", (event) => {
  if (event.code === 'Enter') {
    document.getElementById("add-buttonId").click();
    return;
  }
});

loadingForm.classList.add('load'); 