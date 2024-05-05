import { getAPI } from './api.js';
import { initClickHandler } from './render.js';

document.getElementById('start-loading').classList.remove('load');
document.getElementById('form').classList.add('load');

//Enter
document.addEventListener("keyup", (event) => {
    if (event.code === 'Enter') {
        document.getElementById("add-buttonId").click();
        return;
    }
});

getAPI();
initClickHandler();