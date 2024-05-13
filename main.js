import { initClickHandler, render } from './render.js';
import { checkInputForm } from './check.js';
import { inputName, inputText, deleteButton, loadingForm, inpurForm } from './dom.js';
import { getAPI, comments } from './API.js';

export let user = null;
export function setUser(value) {
    user = value;
};

loadingForm.classList.remove('load');
document.getElementById('form').classList.add('load');
inpurForm.classList.add("disguise");

//Enter
document.addEventListener("keyup", (event) => {
    if (event.code === 'Enter') {
        document.getElementById("add-buttonId").click();
        return;
    }
});

//Удаление последнего комментария
deleteButton.addEventListener('click', (event) => {
    event.stopPropagation();
    comments.pop();
    render(comments);
    checkInputForm();
});

inputName.addEventListener("input", checkInputForm);
inputText.addEventListener("input", checkInputForm);
checkInputForm();

getAPI(comments);

export function getCommentsFromServer() {
  getAPI().then((responseData) => {
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
}

loadingForm.classList.add('load');
document.getElementById('form').classList.remove('load');

initClickHandler(comments);