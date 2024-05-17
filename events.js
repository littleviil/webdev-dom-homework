import { render } from './render.js';

//Лайки
export const addLikeClickButton = (comments) => {
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
            render(comments);
        });
    };
};

//Редактирование
export const editComments = (comments) => {
    const editButtons = document.querySelectorAll('.edit-button');
    var li = document.getElementById("comments").getElementsByTagName("li");

    for (const editButton of editButtons) {
        editButton.addEventListener("click", (event) => {
            event.stopPropagation();
            const userHTML = `
                <div class="comment-header">
                    <input type="text" class="add-form-name" id="newNameTextId" value="${comments[editButton.dataset.index].author}"></input>
                    <div>${comments[editButton.dataset.index].date}</div>
                </div>
                <textarea type="textarea" class="add-form-text" id="newCommentTextId" rows="4">${comments[editButton.dataset.index].text}</textarea>
                <div class="add-form-row">
                    <button class="add-form-button" id="save-buttonId">Сохранить</button>
                    <button id="delete-button" class="add-form-button">Удалить</button>
                </div>`;
            li[editButton.dataset.index].innerHTML = userHTML;
            li[editButton.dataset.index].classList.add("edit-add-form");
            const editName = document.getElementById("newNameTextId");
            const editText = document.getElementById("newCommentTextId");
            document.getElementById('save-buttonId').addEventListener("click", (event) => {
                event.stopPropagation();
                comments[editButton.dataset.index].author = editName.value.replaceAll("<", "&lt").replaceAll(">", "&gt");
                comments[editButton.dataset.index].text = editText.value.replaceAll("<", "&lt").replaceAll(">", "&gt");
                editName.value = "";
                editText.value = "";
                render(comments);
            });
            document.getElementById('delete-button').addEventListener("click", (event) => {
                event.stopPropagation();
                render(comments);
            });
        });
    };

    for (const liClick of li) {
        liClick.addEventListener("click", (event) => {
            event.stopPropagation();
            document.getElementById("commentTextId").value = "✦♡ " + comments[liClick.dataset.index].text + `\n Автор: ` + comments[liClick.dataset.index].author + `♡✦\n`;
        });
    };
};

//Лайки
export const LikeClickButton = (comments) => {
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
            render(comments);
        });
    };
};

//Замена спец.символов
export const searchSwap = (comment) => {
    return comment.replaceAll("<", "&lt").replaceAll(">", "&gt").replaceAll("✦♡", "<div class='quote'>").replaceAll("♡✦", "</div>");
}

//Удаление последнего комментария
export const deleteClick = (comments) => {
    document.getElementById("delete-button").addEventListener('click', (event) => {
        event.stopPropagation();
        comments.pop();
        render(comments);
    });
};

export const initEvent = (comments) => {
    addLikeClickButton(comments);
    editComments(comments);
    deleteClick(comments);
};