import { showConfirmMsg, factoryReset } from "./confirm.js";

let choosenAvatarDiv = document.querySelector(".choosen-avatar");
let arrowBtn = document.getElementById("icon-down-open");
let selectOpt = document.querySelector(".select-options");
let resetData = document.getElementById("reset-data");
let imgLis = document.querySelectorAll(".option-item");

function checkAvatar() {
  if (localStorage.getItem("avatar") !== null) {
    let avatar = localStorage.getItem("avatar");
    addChoosenAvatar(avatar);
  }
}
checkAvatar();

function hideChooseSelection() {
  selectOpt.classList.add("hidden");
  arrowBtn.style.animation = "arrow-down 0.2s ease forwards";
}

function addChoosenAvatar(imgUrl) {
  choosenAvatarDiv.innerHTML = "";
  let choosenAvatar = document.createElement("img");
  choosenAvatar.src = imgUrl;
  choosenAvatar.alt = "your-avatar";
  choosenAvatarDiv.appendChild(choosenAvatar);
}

arrowBtn.addEventListener("click", () => {
  if (selectOpt.classList.contains("hidden")) {
    selectOpt.classList.remove("hidden");
    arrowBtn.style.animation = "arrow-up 0.2s ease forwards";
    selectOpt.style.animation = "slide-down 0.2s ease";
  } else {
    hideChooseSelection();
  }
});

imgLis.forEach((el) => {
  el.addEventListener("click", () => {
    addChoosenAvatar(el.dataset.img);
    hideChooseSelection();
    localStorage.setItem("avatar", el.dataset.img);
  });
});

resetData.addEventListener("click", factoryReset);
