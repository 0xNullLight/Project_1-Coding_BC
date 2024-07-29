// script.js

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('#nav_sidebar a');
    const pages = document.querySelectorAll('.page');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetPage = link.getAttribute('data-page');

            // Hide all pages
            pages.forEach(page => page.style.display = 'none');

            // Show the selected page
            document.getElementById(`${targetPage}-page`).style.display = 'block';
        });
    });
});


/* Store data from submit form income */

const income = document.getElementById('income');


income.addEventListener('click', function (event) {
    event.preventDefault();

    const incomeSubmission = {
        date: incomeDate.value,
        source: incomeSource.value,
        amount: incomeAmount.value,
        account: optionselectIncome.value,
    };

    let incomeTable = JSON.parse(localStorage.getItem('incomes')) //check if there any previous stored incomes

    if (!incomeTable) {
        incomeTable = []
    } incomeTable.push(incomeSubmission);

    if (!incomeSubmission.date){
        alert('Please select date!');
    } else if (!incomeSubmission.source){
        alert('Please enter source!');
    } else if (!incomeSubmission.amount){
        alert('Please enter amount!');
    } else {
        localStorage.setItem('incomes', JSON.stringify(incomeTable));
        alert('Income was submitted!');
    }

});


/* Store data from submit form expense */

const expense = document.getElementById('expense');


expense.addEventListener('click', function (event) {
    event.preventDefault();

    const expenseSubmission = {
        date: expenseDate.value,
        source: expenseSource.value,
        amount: expenseAmount.value,
        account: optionselectExpense.value,
    };

    let expenseTable = JSON.parse(localStorage.getItem('expenses')) //check if there any previous stored incomes

    if (!expenseTable) {
        expenseTable = []
    } expenseTable.push(expenseSubmission);

    if (!expenseSubmission.date) {
        alert('Please select date!');
    } else if (!expenseSubmission.source) {
        alert('Please enter source!');
    } else if (!expenseSubmission.amount) {
        alert('Please enter amount!');
    } else {
        localStorage.setItem('expenses', JSON.stringify(expenseTable));
        alert('Expense was submitted!');
    }
});

/* take information from incomes array and send it to income table */


const incomePosts = document.querySelector('#income-elements');
const incomeSebmit = document.querySelector('#income');
const incomePage = document.querySelector('#iincome-elements');

function renderIncome(){
    let storedIncomes = JSON.parse(localStorage.getItem('incomes'));
    if (storedIncomes) {
        for(let i = 0; i < storedIncomes.length; i++){
            let storedIncome = storedIncomes[i];
            let incomePostTable = document.createElement('tr');
            let incomePostDate = document.createElement('td');
            let incomePostSource = document.createElement('td');
            let incomePostAmount = document.createElement('td');
            let incomePostAccount = document.createElement('td');


           incomePostDate.innerHTML = storedIncome.date;
           incomePostSource.innerHTML = storedIncome.source;
           incomePostAmount.innerHTML = storedIncome.amount;
           incomePostAccount.innerHTML = storedIncome.account;


           incomePosts.appendChild(incomePostTable);
           incomePostTable.appendChild(incomePostDate);
           incomePostTable.appendChild(incomePostSource);
           incomePostTable.appendChild(incomePostAmount);
           incomePostTable.appendChild(incomePostAccount);
        }
    }
}

document.addEventListener('DOMContentLoaded', renderIncome);


/* take information from incomes array and send it to income table */


const expensePosts = document.querySelector('#expense-elements');
const expenseSebmit = document.querySelector('#expense');
const expensePage = document.querySelector('#expense-elements');

function renderExpense() {
    let storedExpenses = JSON.parse(localStorage.getItem('expenses'));
    if (storedExpenses) {
        for (let i = 0; i < storedExpenses.length; i++) {
            let storedExpense = storedExpenses[i];
            let expensePostTable = document.createElement('tr');
            let expensePostDate = document.createElement('td');
            let expensePostSource = document.createElement('td');
            let expensePostAmount = document.createElement('td');
            let expensePostAccount = document.createElement('td');


            expensePostDate.innerHTML = storedExpense.date;
            expensePostSource.innerHTML = storedExpense.source;
            expensePostAmount.innerHTML = storedExpense.amount;
            expensePostAccount.innerHTML = storedExpense.account;


            expensePosts.appendChild(expensePostTable);
            expensePostTable.appendChild(expensePostDate);
            expensePostTable.appendChild(expensePostSource);
            expensePostTable.appendChild(expensePostAmount);
            expensePostTable.appendChild(expensePostAccount);
        }
    }
}

document.addEventListener('DOMContentLoaded', renderExpense);