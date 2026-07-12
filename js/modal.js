let modal = document.querySelector(".task-modal");
let cancelBtnModal = document.querySelector(".task-modal .cancel-btn");
let modalContainer = document.querySelector(".task-modal .container");
let modalHeading = document.querySelector(".task-modal .container h3");
let titleInput = document.getElementById("task-title");
let descriptionInput = document.getElementById("task-description");
let animationTime = 450;

function openModal(text) {
  modalHeading.textContent = text;
  modal.classList.remove("hidden");
  modalContainer.style.animation = `fade-in ${animationTime}ms ease`;
}
function closeModal() {
  setTimeout(() => {
    modal.classList.add("hidden");
    titleInput.value = "";
    descriptionInput.value = "";
  }, animationTime);
  modalContainer.style.animation = `fade-out ${animationTime}ms ease`;
}

export { closeModal, openModal, cancelBtnModal, modal };
