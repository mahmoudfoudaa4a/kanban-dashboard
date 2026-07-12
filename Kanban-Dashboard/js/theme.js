let themeToggle = document.querySelector(".slide-opt");
let body = document.body;

if (localStorage.getItem("theme") === "dark") {
  body.className = "dark";
  themeToggle.classList.add("active");
}

themeToggle.addEventListener("click", () => {
  themeToggle.classList.toggle("active");
  if (themeToggle.classList.contains("active")) {
    body.className = "dark";
    localStorage.setItem("theme", "dark");
  } else {
    body.className = "";
    localStorage.setItem("theme", "light");
  }
});
