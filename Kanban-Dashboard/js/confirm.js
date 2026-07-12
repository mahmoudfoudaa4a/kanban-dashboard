let confirmDiv = document.querySelector(".confirm");
let confirmMessage = document.querySelector(".confirm-message");
let confirmh1 = document.querySelector(".confirm-message h1");
let confirmBtn = document.querySelector(".confirm-message .add-btn");
let cancelBtn = document.querySelector(".confirm-message .cancel-btn");
let mainText = confirmh1.textContent;

confirmDiv.addEventListener("click", (e) => {
  if (e.target == confirmDiv) {
    closeModal();
  }
});
function closeModal() {
  confirmMessage.style.animation = "fade-out 0.3s ease";
  setTimeout((_) => confirmDiv.classList.add("hidden"), 300);
}

function showConfirmMsg(msg) {
  return new Promise((isConfirmed) => {
    confirmDiv.classList.remove("hidden");
    confirmMessage.style.animation = "fade-in .3s ease";
    confirmh1.textContent = `${mainText} ${msg}`;

    confirmBtn.onclick = () => {
      closeModal();
      isConfirmed(true);
    };

    cancelBtn.onclick = () => {
      closeModal();
      isConfirmed(false);
    };
  });
}

async function factoryReset() {
  let isConfirmed = await showConfirmMsg("Delete All Data ?");

  if (isConfirmed) {
    localStorage.clear();
    location.reload();
  }
}

async function logOutMsg() {
  let isConfirmed = await showConfirmMsg(" Log Out ?");

  if (isConfirmed) {
    localStorage.setItem("isSignedIn", "false");
    location.reload();
  }
}

export { showConfirmMsg, factoryReset, logOutMsg };
