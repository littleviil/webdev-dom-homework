import { loadingForm } from './dom.js';
import { render } from './render.js';
import { searchSwap } from './events.js';

const myURL = "https://wedev-api.sky.pro/api/v1/elena-saveleva/comments";
const host = "https://wedev-api.sky.pro/api/user/login";

export let token;
export const setToken = (newToken) => {
    token = newToken;
};

export let UserName;
export function setUserName(newName) {
    UserName = newName;
}

export const getAPI = () => {
    return fetch(myURL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        }
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
    });
  };

export const postAPI = (inputName, inputText) => {

    fetch(myURL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
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
    });
};

export const loginUser = ({ login, password }) => {
    return fetch(host, {
        method: "POST",
        body: JSON.stringify({
            login: searchSwap(login),
            password: searchSwap(password),
        }),
    }).then((response) => {
        if (response.status === 201) return getCommentsFromServer();
        if (response.status === 500) alert("Сервер сломался, попробуй позже");
        if (response.status === 400) alert("Введен ннверный логин или пароль");
    
        return "error";
    })
};

export let comments = [];