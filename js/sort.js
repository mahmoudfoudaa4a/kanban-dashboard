import { refreshTasks, worksArr } from "./tasks.js";

let sortSelect = document.querySelector("#sort-item");

function AtoZ() {
  worksArr.sort((a, b) => a.title.localeCompare(b.title));
}

function sortByDate() {
  worksArr.sort((a, b) => b.id - a.id);
}

sortSelect.addEventListener("change", () => {
  if (sortSelect.value === "a-z") {
    AtoZ();
  }
  if (sortSelect.value === "newest") {
    sortByDate();
  }

  localStorage.setItem("works-objects", JSON.stringify(worksArr));
  refreshTasks();
});
