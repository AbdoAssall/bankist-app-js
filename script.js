'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];
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

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
     <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
}

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate / 100))
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
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
  displayMovements(acc.movements);

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

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 1;

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

  const amount = Number(inputTransferAmount.value);
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

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movment
    currentAccount.movements.push(amount);

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

  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
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
    if (inputCloseUsername.value !== currentAccount.username || Number(inputClosePin.value) !== currentAccount.pin) {
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
  displayMovements(currentAccount.movements, !isSorted);
  isSorted = !isSorted;
})

window.onload = function () {
  inputLoginUsername.focus();
}