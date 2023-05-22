const years = document.querySelector(".years");
const months = document.querySelector(".months");
const days = document.querySelector(".days");
const labelday = document.querySelector(".labelday");
const labelmonth = document.querySelector(".labelmonth");
const labelyear = document.querySelector(".labelyear");

function calculate() {
  if (isFieldEmpty()) {
    console.log("empty");
  }
}

function resetBorderAndLabelColors(day, month, year) {
  day.style.borderColor = "hsl(0, 0%, 94%)";
  month.style.borderColor = "hsl(0, 0%, 94%)";
  year.style.borderColor = "hsl(0, 0%, 94%)";
  labelday.style.color = "hsl(0, 1%, 44%)";
  labelmonth.style.color = "hsl(0, 1%, 44%)";
  labelyear.style.color = "hsl(0, 1%, 44%)";
}

function addBorderAndLabelColors() {
  const day = document.querySelector(".day");
  const month = document.querySelector(".month");
  const year = document.querySelector(".year");

  day.style.borderColor = "hsl(0, 100%, 67%)";
  month.style.borderColor = "hsl(0, 100%, 67%)";
  year.style.borderColor = "hsl(0, 100%, 67%)";

  labelday.style.color = "hsl(0, 100%, 67%)";
  labelmonth.style.color = "hsl(0, 100%, 67%)";
  labelyear.style.color = "hsl(0, 100%, 67%)";
}

function isFieldEmpty() {
  const day = document.querySelector(".day");
  const month = document.querySelector(".month");
  const year = document.querySelector(".year");

  resetBorderAndLabelColors(day, month, year);

  document.querySelector(".empty-day").classList.add("hide");
  document.querySelector(".empty-month").classList.add("hide");
  document.querySelector(".empty-year").classList.add("hide");

  if (day.value === "") {
    day.style.borderColor = "hsl(0, 100%, 67%)";
    labelday.style.color = "hsl(0, 100%, 67%)";
    document.querySelector(".empty-day").classList.remove("hide");
  }
  if (month.value === "") {
    month.style.borderColor = "hsl(0, 100%, 67%)";
    labelmonth.style.color = "hsl(0, 100%, 67%)";
    document.querySelector(".empty-month").classList.remove("hide");
  }
  if (year.value === "") {
    year.style.borderColor = "hsl(0, 100%, 67%)";
    labelyear.style.color = "hsl(0, 100%, 67%)";
    document.querySelector(".empty-year").classList.remove("hide");
  }

  if ( day.value == "" || month.value == "" || year.value == "") {
    return true;
  }
  const fieldValid = isFieldValid(day, month, year);
}

function isFieldValid(d, m, y) {
  let status = true;

  document.querySelector(".invalid-day").classList.add("hide");
  document.querySelector(".invalid-month").classList.add("hide");
  document.querySelector(".invalid-year").classList.add("hide");

  if (d.value > 31 || d.value < 1) {
    labelday.style.color = "hsl(0, 100%, 67%)";
    document.querySelector(".invalid-day").classList.remove("hide");
    status = false;
  }
  if (m.value > 12 || m.value < 1) {
    labelmonth.style.color = "hsl(0, 100%, 67%)";
    document.querySelector(".invalid-month").classList.remove("hide");
    status = false;
  }
  if (y.value < 1) {
    labelyear.style.color = "hsl(0, 100%, 67%)";
    document.querySelector(".invalid-year").classList.remove("hide");
    status = false;
  }
  if (status) {
    validDate(d, m, y);
  }
  return status;
}

function validDate(d, m, y) {
  document.querySelector(".past-date").classList.add("hide");
  const currentYear = new Date().getFullYear();
  const invalid = Number(y.value) > currentYear ? true : false;
  console.log("invalid ", invalid);
  console.log("user input: ", Number(d.value));

  if (invalid) {
    addBorderAndLabelColors();
    document.querySelector(".past-date").classList.remove("hide");
    return false;
  }
  if (!invalid) {
    calculateDMY(d, m, y);
  }
  return true;
}

function calculateDMY(d, m, y) {
  const birthYear = Number(y.value);
  const birthMonth = Number(m.value);
  const birthDate = Number(d.value);
  const date = new Date();
  let currDate = date.getDate();
  let currYear = date.getFullYear();
  let currMonth = date.getMonth() + 1;

  let dateDiff = 0;
  let monthDiff = 0;
  let yearDiff = 0;

  if (currDate >= birthDate && currMonth >= birthMonth) {
    dateDiff = currDate - birthDate;
    monthDiff = currMonth - birthMonth;
    yearDiff = currYear - birthYear;
  }
  if (currDate - birthDate < 0) {
    currDate += 30;
    --currMonth;
  }
  if (currMonth - birthMonth < 0) {
    currMonth += 12;
    --currYear;
  }
  dateDiff = currDate - birthDate;
  monthDiff = currMonth - birthMonth;
  yearDiff = currYear - birthYear;

  days.textContent = dateDiff;
  months.textContent = monthDiff;
  years.textContent = yearDiff;
}


document.querySelector('.submit').addEventListener("click", calculate);