// import { initClickHandler } from './render.js';
import { loadingForm } from './dom.js';
import { getAPI, comments } from './API.js';
import { format, addDays } from 'date-fns';

export let user = null;
export function setUser(value) {
  user = value;
};

loadingForm.classList.remove('load');
getAPI(comments);

//Enter
document.addEventListener("keyup", (event) => {
  if (event.code === 'Enter') {
    document.getElementById("add-buttonId").click();
    return;
  }
});