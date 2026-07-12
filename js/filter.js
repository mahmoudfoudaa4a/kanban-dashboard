let options = document.querySelectorAll("nav .option");
let cols = document.querySelectorAll(".col");

function statusCatch(status) {
  cols.forEach((e) => {
    if (e.dataset.status === status) {
      e.classList.remove("not-selected");
    } else if (status === "all-works") {
      e.classList.remove("not-selected");
    } else {
      e.classList.add("not-selected");
    }
  });
}

function filtering(option) {
  if (option.dataset.status === "in-prog") {
    statusCatch("in-prog");
  }
  if (option.dataset.status === "reviewed") {
    statusCatch("reviewed");
  }
  if (option.dataset.status === "completed") {
    statusCatch("completed");
  }
  if (option.dataset.status === "all-works") {
    statusCatch("all-works");
  }
}

options.forEach((e) => {
  e.addEventListener("click", (_) => {
    options.forEach((e) => e.classList.remove("activated"));
    e.classList.add("activated");
    filtering(e);
  });
});
