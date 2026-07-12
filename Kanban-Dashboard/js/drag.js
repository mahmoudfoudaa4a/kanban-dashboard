import { worksArr, getCountNum } from "./tasks.js";
import { updateChart, createChart } from "./analytics.js";

let cols = document.querySelectorAll(".col");
let dragged = null;

document.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("work")) {
    dragged = e.target;
  }
});
document.addEventListener("dragend", (e) => {
  if (e.target.classList.contains("work")) {
    dragged = e.target;
    getCountNum();
    updateChart(worksArr);
  }
  dragged = null;
});

cols.forEach((e) => {
  e.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
});

cols.forEach((col) => {
  col.addEventListener("drop", (e) => {
    e.preventDefault();
    let works = col.querySelector(".works");

    updateStatus(col.dataset.status);
    works.prepend(dragged);
  });
});

function updateStatus(col) {
  let id = Number(dragged.dataset.id);
  let task = worksArr.find((task) => task.id === id);

  task.status = col;
  localStorage.setItem("works-objects", JSON.stringify(worksArr));
  getCountNum();
}
