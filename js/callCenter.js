let form = document.querySelector(".call-center-container form");
let submitBtn = document.querySelector("#submit-info");
let responseStatus = document.querySelector("#status-of-response");
let publicKey = "Y68PPM9kneUBVXcBz";
let servId = "service_boys6sv";
let tempId = "template_j1yi0ff";

emailjs.init({
  publicKey: publicKey,
  blockHeadless: true,
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  responseStatus.style.display = "block";
  responseStatus.textContent = "Sending...";
  responseStatus.style.color = "#f39d0d";
  submitBtn.disabled = true;
  emailjs
    .sendForm(servId, tempId, form)
    .then(() => {
      responseStatus.textContent = "Successfully Sent!";
      responseStatus.style.color = "#25c55f";
      form.reset();
    })
    .catch(() => {
      responseStatus.textContent = "Failed While Sending, Try Again Later 💜";
      responseStatus.style.color = "red";
    })
    .finally(() => {
      submitBtn.disabled = false;

      setTimeout(() => {
        responseStatus.style.display = "none";
      }, 3000);
    });
});
