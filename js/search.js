import { worksArr, createElements, worksDiv, getCountNum } from "./tasks.js";

let searchBar = document.querySelector("#search");
let filterdArr = [];

searchBar.addEventListener("input", () => {
  filterdArr = worksArr.filter((task) =>
    task.title.toLowerCase().includes(searchBar.value.toLowerCase()),
  );
  worksDiv.forEach((e) => (e.innerHTML = ""));
  filterdArr.forEach((e) =>
    createElements(e.title, e.description, e.status, e.id),
  );
  getCountNum();
});
