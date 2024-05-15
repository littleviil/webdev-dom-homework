import { loadingForm } from './dom.js';
import { render } from './render.js';
import { searchSwap } from './events.js';

const myURL = "https://wedev-api.sky.pro/api/v1/elena-saveleva/comments";
const host = "https://wedev-api.sky.pro/api/user";

export let token;
export const setToken = (newToken) => {
    token = newToken;
};

export let userName;
export function setUserName(newName) {
    userName = newName;
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

export function login({ login, password }) {
    return fetch(host + "/login", {
      method: "POST",
      body: JSON.stringify({
        login,
        password,
        //forceError: true,
      }),
    }).then((response) => {
      if (response.status === 201) return response.json(); 
      if (response.status === 500) alert("Сервер упал, попробуй позже");
      if (response.status === 400) alert("Введен неверный логин или пароль");
      return "error";
    });
  };
  
  export function registr({ name, login, password }) {
    return fetch(host, {
      method: "POST",
      body: JSON.stringify({
        name,
        login,
        password,
        //forceError: true,
      }),
    }).then((response) => {
      if (response.status === 201) return response.json();
      if (response.status === 500) alert("Сервер упал, попробуй позже");
      if (response.status === 400) alert("Введен неверный логин или пароль");
      return "error";
    });
  };

export let comments = [];