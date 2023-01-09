// Querying elements from the DOM
// Input Elements
const billInput = document.querySelector('#bill');
const customInput = document.querySelector('#custom');
const peopleInput = document.querySelector('#people');
const tipBtns = document.querySelectorAll('.tip-btn');

// Error Elements
const errorBillEl = document.querySelector('#error-bill');
const errorCustomEl = document.querySelector('#error-custom');
const errorPeopleEl = document.querySelector('#error-people');

// Result Elements
const tipAmountEl = document.querySelector('#tipAmount');
const totalAmountEl = document.querySelector('#totalAmount');

// Reset Button
const resetBtn = document.querySelector('#reset');

// Variables to calculate tip per person and total per person
let bill, numOfPeople, tipPercent;

// Functions
function currencyFormatter(num) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(num);
}

function calcAndRender() {
  if (!bill || !numOfPeople || !tipPercent) {
    return;
  }

  const totalTip = bill * (tipPercent / 100);

  const tipAmountPerPerson = totalTip / numOfPeople;
  const totalAmountPerPerson = (bill + totalTip) / numOfPeople;

  tipAmountEl.textContent = currencyFormatter(tipAmountPerPerson);
  totalAmountEl.textContent = currencyFormatter(totalAmountPerPerson);
}

function renderError(inputEl, errorEl, errorMsg) {
  inputEl.classList.add('focus:ring-red-400');
  errorEl.classList.remove('hidden');
  errorEl.textContent = errorMsg;
}

function removeError(inputEl, errorEl) {
  inputEl.classList.remove('focus:ring-red-400');
  errorEl.classList.add('hidden');
  errorEl.textContent = '';
}

function checkError(input, inputEl, errorEl) {
  if (input && Number(input) === 0) return renderError(inputEl, errorEl, "Can't be zero");

  if (input && isNaN(input)) return renderError(inputEl, errorEl, 'Must be number');

  removeError(inputEl, errorEl);
}

// Event Listeners
billInput.addEventListener('input', function (event) {
  checkError(event.target.value, billInput, errorBillEl);

  resetBtn.removeAttribute('disabled');

  bill = Number(event.target.value);

  calcAndRender();
});

peopleInput.addEventListener('input', function (event) {
  checkError(event.target.value, peopleInput, errorPeopleEl);

  resetBtn.removeAttribute('disabled');

  numOfPeople = Number(event.target.value);

  calcAndRender();
});

customInput.addEventListener('input', function (event) {
  checkError(event.target.value, customInput, errorCustomEl);

  resetBtn.removeAttribute('disabled');

  tipPercent = Number(event.target.value);

  tipBtns.forEach((btn) => btn.classList.remove('bg-strong-cyan', 'text-dark-cyan'));

  calcAndRender();
});

tipBtns.forEach(function (tipBtn) {
  tipBtn.addEventListener('click', function (event) {
    resetBtn.removeAttribute('disabled');

    customInput.value = '';

    tipPercent = Number(event.target.dataset.tipPercent);

    tipBtns.forEach((btn) => {
      event.target === btn
        ? btn.classList.add('bg-strong-cyan', 'text-dark-cyan')
        : btn.classList.remove('bg-strong-cyan', 'text-dark-cyan');
    });

    calcAndRender();
  });
});

resetBtn.addEventListener('click', function () {
  billInput.value = '';
  customInput.value = '';
  peopleInput.value = '';
  bill = undefined;
  numOfPeople = undefined;
  tipPercent = undefined;
  tipAmountEl.textContent = '$0.00';
  totalAmountEl.textContent = '$0.00';
  resetBtn.setAttribute('disabled', 'true');
  tipBtns.forEach((btn) => btn.classList.remove('bg-strong-cyan', 'text-dark-cyan'));
});
