let pages = document.querySelectorAll("section");
let options = document.querySelectorAll(".pages-options .option");
let signInBtns = document.querySelectorAll(".sign-in");
let signInPage = document.querySelector(".settings-page");

function hideAllPages() {
  pages.forEach((page) => {
    !page.classList.contains("hidden") ? page.classList.add("hidden") : false;

    options.forEach((opt) => {
      opt.classList.contains("active-opt")
        ? opt.classList.remove("active-opt")
        : false;
    });
  });
}

options.forEach((option) => {
  option.addEventListener("click", () => {
    pages.forEach((page) => {
      page.classList.add("hidden");
    });

    options.forEach((opt) => {
      opt.classList.remove("active-opt");
    });

    let page = document.querySelector(`.${option.dataset.page}`);

    page.classList.remove("hidden");

    option.classList.add("active-opt");
  });
});

signInBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    hideAllPages();
    signInPage.classList.remove("hidden");
    btn.classList.add("active");

    options.forEach((opt) => {
      if (opt.dataset.page == "settings-page") {
        opt.classList.add("active-opt");
      }
    });
  });
});
