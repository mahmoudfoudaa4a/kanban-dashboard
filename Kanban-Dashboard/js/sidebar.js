let showBtn = document.querySelector(".aside-show");
let aside = document.querySelector("aside");
let pageOptions = document.querySelectorAll(".pages-options .option");

function initSidebar() {
  if (window.innerWidth <= 992) {
    showBtn.addEventListener("click", (e) => {
      if (window.innerWidth > 992) return;
      e.stopPropagation();
      aside.classList.add("show-sidebar");
      aside.classList.remove("hide-sidebar");
    });

    aside.addEventListener("click", (e) => {
      if (window.innerWidth > 992) return;
      e.stopPropagation();
    });

    document.addEventListener("click", () => {
      if (window.innerWidth > 992) return;
      aside.classList.remove("show-sidebar");
      aside.classList.add("hide-sidebar");
    });

    pageOptions.forEach((option) => {
      option.addEventListener("click", () => {
        if (window.innerWidth > 992) return;
        aside.classList.remove("show-sidebar");
        aside.classList.add("hide-sidebar");
      });
    });
  } else {
    aside.classList.remove("show-sidebar");
    aside.classList.remove("hide-sidebar");
  }
}
initSidebar();
window.addEventListener("resize", initSidebar);
