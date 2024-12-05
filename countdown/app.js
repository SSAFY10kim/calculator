const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

let futureDate = new Date(2024, 11, 8, 11, 30, 0);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = months[futureDate.getMonth()].slice(0, 3);
const date = futureDate.getDate();

const weekday = weekdays[futureDate.getDay()].slice(0, 3);

giveaway.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year}  ${hours} : ${minutes}am`;

// future time in ms
const futureTime = futureDate.getTime();

const getRemainingTime = () => {
  const today = new Date().getTime();
  const remainingTime = futureTime - today;

  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  // calcucalt all values
  let days = remainingTime / oneDay;
  days = Math.floor(days);
  let hours = (remainingTime % oneDay) / oneHour;
  hours = Math.floor(hours);
  let minutes = (remainingTime % oneHour) / oneMinute;
  minutes = Math.floor(minutes);
  let seconds = (remainingTime % oneMinute) / 1000;
  seconds = Math.floor(seconds);

  // set values array
  const values = [days, hours, minutes, seconds];

  const format = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  // update values on page
  items.forEach((item, index) => {
    item.textContent = format(values[index]);
  });

  if (remainingTime < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired</h4>`;
  }
};
// call function again in 1 second
let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();
