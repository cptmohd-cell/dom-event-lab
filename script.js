/*-------------------------------- Variables --------------------------------*/
let current = ''; 
let previous = ''; 
let operator = ''; 


/*---------------------------- Element References ---------------------------*/
const calculator = document.querySelector('#calculator'); 
const display = document.querySelector('.display'); 
const buttons = document.querySelectorAll('.button'); 


/*-------------------------------- Functions --------------------------------*/
function updateDisplay(value) { // Updates with value
  display.textContent = value;
}

function appendNumber(num) { // assign to input
  current += num;
  updateDisplay(current);
}

function setOperator(op) { 
  if (current === '') return;
  previous = current;
  current = '';
  operator = op;
}

function compute() { 
  if (previous === '' || current === '' || operator === '') return;
  
  let result;
  const a = parseFloat(previous);
  const b = parseFloat(current);
  
  if (operator === '+') result = a + b;
  else if (operator === '-') result = a - b;
  else if (operator === '*') result = a * b;
  else if (operator === '/') result = a / b;
      
  current = String(result);
  operator = '';
  previous = '';
  updateDisplay(current);
}

function clear() { // Resets all calculator state and clears the display
  current = '';
  previous = '';
  operator = '';
  updateDisplay('0');
}

if (calculator) { // Adds a click event listener to the calculator container
  calculator.addEventListener('click', (e) => {
    const btn = e.target;
    const text = btn.innerText.trim();
    
    if (/^[0-9]$/.test(text)) appendNumber(text); 
    else if (text === '.') appendNumber('.');
    else if (['+', '-', '*', '/'].includes(text)) setOperator(text); 
    else if (text === '=') compute(); // If equals is clicked, perform the calculation
    else if (text.toLowerCase() === 'c' || text.toLowerCase() === 'ac') clear(); // If clear is clicked, reset calculator
  });
}

updateDisplay('0'); // Initializes the display to show zero
