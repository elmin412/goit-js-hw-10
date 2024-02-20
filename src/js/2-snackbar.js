// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

console.log(iziToast);

const form = document.querySelector(".form");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const delay = parseInt(this.elements.delay.value);
  const state = this.elements.state.value;

  const makePromise = new Promise((resolve, reject) => {
    if (state === "fulfilled") {
      setTimeout(() => {
        resolve(delay);
      }, delay);
    } else if (state === "rejected") {
      setTimeout(() => {
        reject(delay);
      }, delay);
    }
  });

  makePromise.then(
    (delay) => {
      iziToast.success({
        title: "OK",
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    },
    (delay) => {
      iziToast.error({
        title: "Error",
        message: `❌ Rejected promise in ${delay}ms`,
      });
    },
  );
});
