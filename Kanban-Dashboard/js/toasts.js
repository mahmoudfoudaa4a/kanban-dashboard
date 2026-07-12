let toastsDiv = document.querySelector(".toasts-div");
let timerCount = 4000;

function createToast(content, timerColor) {
  if (timerColor === "success") {
    timerColor = "green";
  } else if (timerColor === "error") {
    timerColor = "red";
  }
  let toast = document.createElement("div");
  let timer = document.createElement("div");
  toast.classList.add("toast");
  timer.classList.add("timer");
  toast.textContent = content;
  timer.style.background = timerColor;
  toast.appendChild(timer);
  toastsDiv.appendChild(toast);
  setTimeout(() => toast.remove(), timerCount);
}

function addTask() {
  createToast("Task Added ✅", "success");
}
function cancelTask() {
  createToast("Task has been canceld", "error");
}

function saveData() {
  createToast("Data has been saved ✅", "success");
}

function fillRequiredFields() {
  createToast("Fill Required Fields", "error");
}
function nameIsBig() {
  createToast("Your name is bigger than 10", "error");
}

export { createToast, addTask, cancelTask, saveData, fillRequiredFields, nameIsBig };
