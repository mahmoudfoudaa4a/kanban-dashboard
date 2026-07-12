import {
  saveData,
  fillRequiredFields,
  createToast,
  nameIsBig,
} from "./toasts.js";
import { logOutMsg } from "./confirm.js";
let choosenAvatarDiv = document.querySelector(".choosen-avatar");
let userNameInput = document.getElementById("user-name-inp");
let notSignedIn = document.querySelector(".not-signed-in");
let signIn = document.querySelector(".signed-in");
let userInfo = document.querySelector(".user-acc");
let userName = document.querySelector("#user-name");
let userPhoto = document.querySelector(".avatar");
let asideSignInBtn = document.querySelector("aside .sign-in");
let welcoming = document.querySelector("#welcoming");
let saveDataBtn = document.getElementById("save-info");
let logOutBtn = document.getElementById("log-out");
export let isSignedIn = JSON.parse(localStorage.getItem("isSignedIn")) || false;

savedData();

function savedData() {
  if (JSON.parse(localStorage.getItem("isSignedIn")) === true) {
    notSignedIn.classList.add("hidden");
    asideSignInBtn.classList.add("hidden");
    signIn.classList.remove("hidden");
    userInfo.classList.remove("hidden");
    userPhoto.src = localStorage.getItem("avatar");
    userName.textContent = localStorage.getItem("user-name");
    welcoming.textContent = `Welcome Dear ${localStorage.getItem("user-name")}`;
  }
}

saveDataBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    userNameInput.value.trim() === "" ||
    choosenAvatarDiv.children.length === 0
  ) {
    fillRequiredFields();
  } else if (userNameInput.value.length > 10) {
    nameIsBig();
  } else {
    isSignedIn = true;
    userName.textContent = userNameInput.value;
    localStorage.setItem("isSignedIn", JSON.stringify(isSignedIn));
    localStorage.setItem("user-name", userName.textContent);
    savedData();
    saveData();
    location.reload();
    userNameInput.value = "";
  }
});

logOutBtn.addEventListener("click", () => {
  logOutMsg();
});
