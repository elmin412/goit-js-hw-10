// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

console.log(flatpickr);
console.log(iziToast);

const datetimePicker = document.getElementById("datetime-picker");
const buttonStart = document.querySelector("[data-start]");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr("input#datetime-picker", options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

let userSelectedDate;

datetimePicker.addEventListener("change", () => {
  const selectedDate = new Date(datetimePicker.value);
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    iziToast.error({
      title: "Error",
      message: "Please choose a date in the future",
    });
    buttonStart.disabled = true;
  } else {
    buttonStart.disabled = false;
    userSelectedDate = selectedDate;
  }
});

buttonStart.addEventListener("click", () => {
  const datetimePicker = document.getElementById("datetime-picker").value;
  const targetDate = new Date(datetimePicker).getTime();
  const timerInterval = setInterval(() => {
    const currentDate = new Date().getTime();
    const remainingTime = targetDate - currentDate;

    if (remainingTime > 0) {
      buttonStart.disabled = true;
      const { days, hours, minutes, seconds } = convertMs(remainingTime);
      document.querySelector("[data-days]").textContent = String(days).padStart(
        2,
        "0",
      );
      document.querySelector("[data-hours]").textContent = String(
        hours,
      ).padStart(2, "0");
      document.querySelector("[data-minutes]").textContent = String(
        minutes,
      ).padStart(2, "0");
      document.querySelector("[data-seconds]").textContent = String(
        seconds,
      ).padStart(2, "0");
    } else {
      clearInterval(timerInterval);
    }
  }, 1000);
});
