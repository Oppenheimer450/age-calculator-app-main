import { func } from "prop-types";
import "../css/Button.css";

const Button = () => {
  const handleEvent = function () {
    // take input
    const dayInput = document.getElementById("day") as HTMLInputElement;
    const monthInput = document.getElementById("month") as HTMLInputElement;
    const yearInput = document.getElementById("year") as HTMLInputElement;

    const dayBirth: number = parseInt(dayInput.value, 10);
    const monthBirth: number = parseInt(monthInput.value, 10);
    const yearBirth: number = parseInt(yearInput.value, 10);

    // check validity of input
    if (
      !(dayBirth != null && isNumberBetween(dayBirth, 1, 31)) ||
      !(monthBirth != null && isNumberBetween(monthBirth, 1, 12))
    ) {
        console.error("Wrong day or month.");
        return;
    }

    if (!isValidDate(dayBirth, monthBirth, yearBirth)) {
        console.error("Date is not valid!");
        return;
    }

    // calculate age
    const {days, months, years } = getDifferenceInDaysMonthsYears(dayBirth, monthBirth, yearBirth);
    console.log('Time in between: days: ' + days + ' months: ' + months + ' years ' + years);

    // show age
    const daySpan = document.getElementById('show-days') as HTMLSpanElement;
    const monthSpan = document.getElementById('show-months') as HTMLSpanElement;
    const yearSpan = document.getElementById('show-years') as HTMLSpanElement;

    daySpan.innerText = days.toString();
    monthSpan.innerText = months.toString();
    yearSpan.innerText = years.toString();

  };

  return (
    <div className="submit-button">
      <hr />
      <button onClick={handleEvent}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="46"
          height="44"
          viewBox="0 0 46 44"
        >
          <g fill="none" stroke="#FFF" strokeWidth="2">
            <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
          </g>
        </svg>
      </button>
    </div>
  );
};

function isNumberBetween(n: number, lowest: number, highest: number): boolean {
  try {
    return n >= lowest && n <= highest;
  } catch (error) {
    return false;
  }
}

function isValidDate(day: number, month: number, year: number) {
    const date = new Date(year, month - 1, day); // Months are 0-based in JavaScript, so we subtract 1 from the month
    const currentDate = new Date();

    console.log(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())

    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day &&
        date < currentDate
      );
}

function getDifferenceInDaysMonthsYears(day: number, month: number, year: number): { days: number, months: number, years: number } {
    const startDate: Date = new Date(year, month - 1, day);
    const endDate: Date = new Date();
    
    // Calculate the difference in milliseconds between the two dates
    const differenceInMillis = endDate.getTime() - startDate.getTime();
  
    // Calculate the number of milliseconds in a day, month, and year
    const oneDayInMillis = 1000 * 60 * 60 * 24;
    const oneMonthInMillis = oneDayInMillis * 30.4375; // Average days in a month (365.25 days / 12 months)
    const oneYearInMillis = oneDayInMillis * 365.25;  // Average days in a year
  
    // Calculate the number of whole years, months, and days
    const years = Math.floor(differenceInMillis / oneYearInMillis);
    const months = Math.floor((differenceInMillis % oneYearInMillis) / oneMonthInMillis);
    const days = Math.floor((differenceInMillis % oneMonthInMillis) / oneDayInMillis);
  
    return { days, months, years };
  }

export default Button;
