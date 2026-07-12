import { closeModal, openModal, cancelBtnModal, modal } from "./modal.js";
import { fillRequiredFields } from "./toasts.js";
import { isSignedIn } from "./auth.js";
import { showConfirmMsg } from "./confirm.js";
import { createChart, updateChart } from "./analytics.js";

let addTaskBtn = document.querySelector(".task-modal .add-btn");
export let worksDiv = document.querySelectorAll(".works");
let addTaskButtons = document.querySelectorAll(".icon-plus");
let statusInput = document.getElementById("task-status");
let titleInput = document.getElementById("task-title");
let descriptionInput = document.getElementById("task-description");
export let worksArr = JSON.parse(localStorage.getItem("works-objects")) || [];
let counts = document.querySelectorAll(".count");
let editingId = null;
addingTasksFromLocal();
createChart(worksArr);

export function getCountNum() {
  counts.forEach((e) => {
    let column = e.closest(".col");
    let countNum = column.querySelector(".works");
    e.innerHTML = countNum.childNodes.length;
  });
}

function addingTasksFromLocal() {
  if (isSignedIn) {
    worksArr.forEach((e) => {
      createElements(e.title, e.description, e.status, e.id);
    });
    getCountNum();
  } else return;
}

export function refreshTasks() {
  worksDiv.forEach((e) => (e.innerHTML = ""));
  addingTasksFromLocal();
}

export function createElements(titl, descrip, status, id) {
  let work = document.createElement("div");
  let title = document.createElement("h2");
  let description = document.createElement("p");
  let editAndDelDiv = document.createElement("div");
  let delBtn = document.createElement("i");
  let editBtn = document.createElement("i");

  editAndDelDiv.classList.add("edit-delete");
  work.dataset.id = id;
  work.draggable = true;

  work.classList.add("work");
  delBtn.classList.add("icon-trash");
  delBtn.id = "delete-task";
  editBtn.classList.add("icon-pencil");
  editBtn.id = "edit-task";

  title.textContent = titl;
  description.textContent = descrip;

  editAndDelDiv.append(editBtn, delBtn);
  work.append(title, description, editAndDelDiv);
  worksDiv.forEach((e) => {
    e.dataset.status == status ? e.append(work) : false;
  });
}

function createWork(stat, tit, descrip) {
  let workObj = {
    status: stat,
    title: tit,
    description: descrip,
    id: Date.now(),
  };

  if (
    workObj.status === "in-prog" ||
    workObj.status === "reviewed" ||
    workObj.status === "completed"
  ) {
    createElements(
      workObj.title,
      workObj.description,
      workObj.status,
      workObj.id,
    );
    worksArr.push(workObj);
    localStorage.setItem("works-objects", JSON.stringify(worksArr));
    getCountNum();
  }
}

// add tasks buttons
addTaskButtons.forEach((e) => {
  e.addEventListener("click", (_) => {
    if (!e.closest(".col")) {
      statusInput.disabled = false;
      return openModal();
    } else {
      openModal("Add Task Info");
      statusInput.value = e.closest(".col").dataset.status;
      statusInput.disabled = true;
      statusInput.style.cursor = "auto";
    }
  });
});
addTaskBtn.addEventListener("click", (_) => {
  if (titleInput.value.trim() === "" || descriptionInput.value.trim() === "") {
    fillRequiredFields();
  } else {
    if (editingId == null) {
      createWork(statusInput.value, titleInput.value, descriptionInput.value);
    } else {
      updateWork();
    }
    updateChart(worksArr);
    closeModal();
    resetModal();
  }
});

// edit and delete task
function updateWork() {
  let task = worksArr.find((task) => task.id === editingId);
  task.title = titleInput.value;
  task.description = descriptionInput.value;
  task.status = statusInput.value;
  localStorage.setItem("works-objects", JSON.stringify(worksArr));
  refreshTasks();
  editingId = null;
}

function resetModal() {
  editingId = null;
  clearInputs();
}

async function delTask(id, work) {
  let isConfirmed = await showConfirmMsg("Delete this task ?");
  if (isConfirmed) {
    let workId = Number(id);
    work.remove();
    worksArr = worksArr.filter((task) => task.id !== workId);
    localStorage.setItem("works-objects", JSON.stringify(worksArr));
    getCountNum();
  }
}
function clearInputs() {
  titleInput.value = "";
  descriptionInput.value = "";
}
worksDiv.forEach((container) => {
  container.addEventListener("click", (e) => {
    if (e.target.id === "delete-task") {
      let work = e.target.closest(".work");
      delTask(work.dataset.id, work);
      updateChart(worksArr);
    }

    if (e.target.id === "edit-task") {
      let work = e.target.closest(".work");
      editingId = Number(work.dataset.id);
      let task = worksArr.find((task) => task.id === editingId);

      statusInput.disabled = false;
      titleInput.value = task.title;
      descriptionInput.value = task.description;
      statusInput.value = task.status;
      updateChart(worksArr);
      openModal("Edit Task");
    }
  });
});

// cancel modal actions

cancelBtnModal.addEventListener("click", (_) => {
  closeModal();
  resetModal();
});

modal.addEventListener("mousedown", (e) => {
  if (e.target == modal) {
    closeModal();
    resetModal();
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
    resetModal();
  }
});
