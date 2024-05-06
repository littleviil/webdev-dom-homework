import { initClickHandler, render } from './render.js';
import { checkInputForm } from './check.js';
import { inputName, inputText, deleteButton, loadingForm } from './dom.js';
import { getAPI, comments } from './API.js';

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

getAPI();
initClickHandler();