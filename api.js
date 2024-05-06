import { loadingForm, loadingComment } from './dom.js';
import { render } from './render.js';
import { searchSwap } from './events.js';
import { checkInputForm } from './check.js';

export const getAPI = () => {
    return fetch("https://wedev-api.sky.pro/api/v1/elena-saveleva/comments", {
        method: "GET"
    }).then((response) => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error("Сервер упал");
        }
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
        render(comments);
    }).then(() => {
        loadingForm.classList.add('load');
        document.getElementById('form').classList.remove('load');
    }).catch(() => {
        alert('Отсутствует соединение с интернетом или проблемы на сервере.');
    });
  };

export const postAPI = (inputName, inputText) => {
    loadingComment.classList.remove('load');
    document.getElementById('form').classList.add('load');

    fetch('https://wedev-api.sky.pro/api/v1/elena-saveleva/comments', {
        method: "POST",
        body: JSON.stringify({
            name: searchSwap(inputName.value),
            text: searchSwap(inputText.value),
            // forceError: true,
        }),
    }).then((response) => {
        console.log(response);
        if (response.status === 201) {
            return response.json();
        } else if (response.status === 400) {
            alert(`Server error ${response.status}\nВведите не менее 3-х символов!`);
            throw new Error("Сервер упал 400");
        } else if (response.status === 500) {
            alert(`Server error ${response.status}`);
            post();
            throw new Error("Сервер упал 500");
        }
    }).then(() => {
        return getAPI();
    }).then((response) => {
        inputName.value = "";
        inputText.value = "";
        return response;
    }).catch((error) => {
        if (error.message === "Failed to fetch") {
            alert("Кажется что-то пошло не так, попробуй позже..");
        };
        console.warn(error);
        return error;
    }).finally(() => {
        loadingComment.classList.add('load');
        document.getElementById('form').classList.remove('load');
    });

    render(comments);
    checkInputForm();
};

export let comments = [];