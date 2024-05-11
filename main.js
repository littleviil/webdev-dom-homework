import { initClickHandler, render } from './render.js';
import { checkInputForm } from './check.js';
import { inputName, inputText, deleteButton, loadingForm } from './dom.js';
import { getAPI, comments } from './API.js';

export let user = null;
export function setUser(value) {
    user = value;
};

loadingForm.classList.remove('load');
document.getElementById('form').classList.add('load');

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
    preloaderElement.classList.remove("disguise");
    getAPI().then((responseData) => {
        console.log(responseData);
  
        containerPeople = responseData.comments.map((comment) => {
          return {
            name: comment.author.name,
            date: printDate(new Date(comment.date)),
            text: comment.text,
            likes: comment.likes,
            isLiked: false,
            isEdit: false,
          };
        });
        renderContainerPeople({
          containerPeople,
        });
        preloaderElement.classList.add("disguise");
      }).catch((error) => {
        if (error === "Failed to fetch")
          alert("Отсутствует интернет, попробуйте позже");
        else
          throw error
      });
  };

loadingForm.classList.add('load');
document.getElementById('form').classList.remove('load');

initClickHandler(comments);