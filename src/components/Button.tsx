import "../css/Button.css";

const Button = () => {
  
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

function handleEvent() {

    // get input elements
    const dayInput = document.getElementById("day") as HTMLInputElement;
    const monthInput = document.getElementById("month") as HTMLInputElement;
    const yearInput = document.getElementById("year") as HTMLInputElement;
    
    // IIFE for reset error indicators
    (function resetErrorHandlig() {

        // reset input styling
        dayInput.classList.remove('empty');
        monthInput.classList.remove('empty');
        yearInput.classList.remove('empty');

        // reset lebels styling
        const dayLabel = document.getElementById('label-day') as HTMLElement
        dayLabel.style.color = 'hsl(0, 1%, 44%)';
        const monthLabel = document.getElementById('label-month') as HTMLElement
        monthLabel.style.color = 'hsl(0, 1%, 44%)';
        const yearLabel = document.getElementById('label-year') as HTMLElement
        yearLabel.style.color = 'hsl(0, 1%, 44%)';

        // reset error message
        showErrorMesageDay(' ');
        showErrorMesageMonth(' ');
        showErrorMesageYear(' ');
    })()    

    // get input
    const dayBirth: number = parseInt(dayInput.value, 10);
    const monthBirth: number = parseInt(monthInput.value, 10);
    const yearBirth: number = parseInt(yearInput.value, 10);

    // check input
    if (!validityCheck(dayBirth, monthBirth, yearBirth)) {
        return;
    }

    // calculate age
    const {days, months, years } = getDifferenceInDaysMonthsYears(dayBirth, monthBirth, yearBirth);
    console.log('Time in between: days: ' + days + ' months: ' + months + ' years ' + years);

    // get elements in show section
    const daySpan = document.getElementById('show-days') as HTMLSpanElement;
    const monthSpan = document.getElementById('show-months') as HTMLSpanElement;
    const yearSpan = document.getElementById('show-years') as HTMLSpanElement;

    // show age
    daySpan.innerText = days.toString();
    monthSpan.innerText = months.toString();
    yearSpan.innerText = years.toString();

};

function validityCheck(dayBirth: number, monthBirth: number, yearBirth: number): boolean {

    let validityCheckOk: boolean = true;


    // empty input
    if (Number.isNaN(dayBirth)) {
        console.error("Day field is required!");
        validityCheckOk = false;

        // show error
        const dayInput = document.getElementById('day') as HTMLElement;
        dayInput.classList.add('empty')
        
        const dayLabel = document.getElementById('label-day') as HTMLElement
        dayLabel.style.color = 'hsl(0, 100%, 67%)';

        showErrorMesageDay('This field is required');
    }

    if (Number.isNaN(monthBirth)) {
        console.error("Month field is required!");
        validityCheckOk = false;

        // show error
        const monthInput = document.getElementById('month') as HTMLElement;
        monthInput.classList.add('empty')
        
        const monthLabel = document.getElementById('label-month') as HTMLElement
        monthLabel.style.color = 'hsl(0, 100%, 67%)';

        showErrorMesageMonth('This field is required');
    }

    if (Number.isNaN(yearBirth)) {
        console.error("Year field is required!")
        validityCheckOk = false;

        // show error
        const yearInput = document.getElementById('year') as HTMLElement;
        yearInput.classList.add('empty')
        
        const yearLabel = document.getElementById('label-year') as HTMLElement
        yearLabel.style.color = 'hsl(0, 100%, 67%)';

        showErrorMesageYear('This field is required');
    }

    if (!validityCheckOk) {
        return validityCheckOk;
    }

    // check validity of input
    if (!(isNumberBetween(dayBirth, 1, 31))) {
        console.error("Wrong day!");
        validityCheckOk = false;
    }
    if (!(isNumberBetween(monthBirth, 1, 12))) {
        console.error("Wrong month!");
        validityCheckOk = false;
    }

    if (!isValidDate(dayBirth, monthBirth, yearBirth)) {
        console.error("Date is not valid!");
        validityCheckOk = false;
    }

    return validityCheckOk;
}

function showErrorMesageDay(msg: string) {
    const dayLabel = document.getElementById('error-msg-day') as HTMLElement;
    dayLabel.innerText = msg;
}
function showErrorMesageMonth(msg: string) {
    const dayLabel = document.getElementById('error-msg-month') as HTMLElement;
    dayLabel.innerText = msg;
}
function showErrorMesageYear(msg: string) {
    const dayLabel = document.getElementById('error-msg-year') as HTMLElement;
    dayLabel.innerText = msg;
}


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
    // input date
    const startDate: Date = new Date(year, month - 1, day);
    
    // today's date
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
