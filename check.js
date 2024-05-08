import { inputName, inputText, deleteButton, buttonElement} from './dom.js';

//Блокировка кнопки "Написать"
export function checkInputForm() {
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

//Неактивность кнопки удаления при 0 длинне массива объектов
export function checkDeleteButton(comments) {
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