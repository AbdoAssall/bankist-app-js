'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const now = new Date();

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2025-06-15T23:36:17.929Z',
    '2025-06-23T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2025-06-20T18:49:59.371Z',
    '2025-06-23T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [1200, -350, -200, 450, 3800, -1200, 150, -90],
  interestRate: 0.7, // %
  pin: 3333,
  movementsDates: [
    '2020-03-15T09:24:17.194Z',
    '2020-05-12T10:17:24.185Z',
    '2021-01-25T14:18:46.235Z',
    '2021-04-10T14:43:26.374Z',
    '2022-07-19T16:33:06.386Z',
    '2023-09-23T07:42:02.383Z',
    '2025-06-21T15:51:36.790Z',
    '2025-06-23T18:20:33.000Z',
  ],
  currency: 'GBP',
  locale: 'en-GB',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [700, -50, 600, -120, 400, 90, -30, 500],
  interestRate: 1.1, // %
  pin: 4444,
  movementsDates: [
    '2021-03-10T13:15:33.035Z',
    '2021-04-18T09:48:16.867Z',
    '2022-08-25T06:04:23.907Z',
    '2023-02-14T10:17:24.185Z',
    '2023-12-05T14:11:59.604Z',
    '2024-03-27T17:01:17.194Z',
    '2025-06-19T23:36:17.929Z',
    '2025-06-23T11:35:59.000Z',
  ],
  currency: 'CAD',
  locale: 'en-CA',
};

const account5 = {
  owner: 'Ahmed Mostafa',
  movements: [1000, -200, 1500, -350, 700, -50, 4000, -120],
  interestRate: 1.0, // %
  pin: 5555,
  movementsDates: [
    '2021-06-01T09:15:04.904Z',
    '2021-08-15T14:11:59.604Z',
    '2022-03-25T10:17:24.185Z',
    '2022-09-30T07:42:02.383Z',
    '2023-02-10T13:15:33.035Z',
    '2023-06-18T09:48:16.867Z',
    '2025-06-20T12:35:17.929Z',
    '2025-06-23T14:40:36.790Z',
  ],
  currency: 'EGP',
  locale: 'ar-EG',
};

const account6 = {
  owner: 'Fahad Al Saud',
  movements: [3000, -1000, 2500, -600, 1200, -150, 7000, -500],
  interestRate: 1.3, // %
  pin: 6666,
  movementsDates: [
    '2021-05-20T06:04:23.907Z',
    '2021-10-12T14:18:46.235Z',
    '2022-01-10T14:43:26.374Z',
    '2022-06-22T16:33:06.386Z',
    '2023-04-01T17:01:17.194Z',
    '2024-08-19T23:36:17.929Z',
    '2025-06-21T09:15:04.904Z',
    '2025-06-23T15:30:00.000Z',
  ],
  currency: 'SAR',
  locale: 'ar-SA',
};

const accounts = [account1, account2, account3, account4, account5, account6];
console.log(accounts);

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
// pop
const pop = document.querySelector('.pop');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const btnCanceLoan = document.querySelector('.btn--cancel-loan');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const formatMovmentDate = function (date, locale = navigator.language) {
  // Calc days passed
  const calcDaysPassed = (date1, date2) => Math.round((date1 - date2) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(now, date);

  if (daysPassed <= 7) {
    return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(-daysPassed, 'day');
  };

  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCurrency = function (value, locale = navigator.language, currency = 'USD') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const combineMovsDates = acc.movements.map((mov, i) => ({
    movement: mov,
    date: acc.movementsDates.at(i)
  }));

  if (sort) combineMovsDates.sort((a, b) => a.movement - b.movement);

  combineMovsDates.forEach(({ movement, date }, i) => {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const formatDate = new Date(date);

    const displayDate = formatMovmentDate(formatDate, acc.locale);
    const formatedMov = formatCurrency(movement, acc?.locale, acc?.currency);

    const html = `
     <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
         <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formatedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCurrency(acc.balance, acc?.locale, acc?.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurrency(incomes, acc?.locale, acc?.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCurrency(Math.abs(out), acc?.locale, acc?.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate / 100))
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCurrency(interest, acc?.locale, acc?.currency);
}

const createUsername = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  })
}
createUsername(accounts);

const updateUI = (acc) => {
  // Display movements 
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
}

// Display pop message
let popTimeout;
const wrongMessage = function (message) {
  // 1. Display error message (POP)
  pop.classList.remove('operation--loan');
  pop.classList.add('operation--close');
  pop.classList.add('show');
  pop.classList.remove('hide');

  // 2. Error message
  pop.textContent = message;

  // 3. Cancel any previous timer to ensure the new message doesn't disappear prematurely.
  clearTimeout(popTimeout);

  // 4. Start a new timer to hide the message after 5 seconds.
  popTimeout = setTimeout(() => {
    pop.classList.add('hide');
    pop.classList.remove('show');
    pop.classList.remove('operation--close');
  }, 5000)
}

const correctMessage = function (message) {
  // 1. Display error message (POP)
  pop.classList.remove('operation--close');
  pop.classList.remove('hide');
  pop.classList.add('operation--loan');
  pop.classList.add('show');

  // 2. Error message
  pop.textContent = message;

  clearTimeout(popTimeout);

  popTimeout = setTimeout(() => {
    pop.classList.add('hide');
    pop.classList.remove('show');
    pop.classList.remove('operation--loan');
  }, 5000)
}

// Event handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submiting
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  // console.log(currentAccount);

  if (currentAccount?.pin === +(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 1;

    // Create current date and time
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  } else {
    alert("Incorrect 'user' or 'pin' please try again.");
  }
})

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = +inputTransferAmount.value;
  const receiveAcc = accounts.find(acc => acc.username === inputTransferTo.value);

  // Clear input fields
  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferAmount.blur();

  if (
    amount > 0 &&
    receiveAcc
    && currentAccount.balance >= amount
    && receiveAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiveAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(now.toISOString());
    receiveAcc.movementsDates.push(now.toISOString());

    //* Desplay successful message
    correctMessage(`${amount}€ successfully transferred to ${receiveAcc.owner} 😎`)

    // Update UI
    updateUI(currentAccount);
  } else {
    //* Desplay wrong message
    const getErrorMessage = () => {
      if (amount <= 0) {
        return `You canno't amount ${amount}€, min amount is 1€ 😅`;
      } else if (!receiveAcc) {
        return `This Username is not founded or not in our bunk 🤦‍♂️`;
      } else if (currentAccount.balance < amount) {
        return `You cannot transfer ${amount}€, because you do not have enough balance 💔`;
      } else if (receiveAcc.username === currentAccount.username) {
        return `You cannot transfer to yourself 😒`;
      }

      return 'An unknown error occurred.';
    };
    wrongMessage(getErrorMessage());
  }
})

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = +inputLoanAmount.value;

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movment
    currentAccount.movements.push(amount);

    // Add loan date
    currentAccount.movementsDates.push(now.toISOString());

    // Update UI
    updateUI(currentAccount);

    // Clear input fields
    inputLoanAmount.value = '';

    //* Desplay successful message
    correctMessage(`Your loan ${amount}€ has been accepted 🤑`);
  } else {
    //* Desplay wrong message
    wrongMessage(`Your loan ${amount}€ has not been accepted 😭`);
  }
})

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (inputCloseUsername.value === currentAccount.username && +inputClosePin.value === currentAccount.pin) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    labelWelcome.textContent = 'Log in to get started';
    containerApp.style.opacity = 0;

    //* Desplay successful message
    correctMessage(`Your account has been deleted successfully 😢`)
  } else {
    //* Desplay successful message
    if (inputCloseUsername.value !== currentAccount.username || +inputClosePin.value !== currentAccount.pin) {
      wrongMessage(`Username or Pin is incorect 😤`);
    }
  }
  // Clear input fields
  inputCloseUsername.value = inputClosePin.value = '';
  inputClosePin.blur();
})

let isSorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !isSorted);
  isSorted = !isSorted;
});

window.onload = function () {
  inputLoginUsername.focus();
};