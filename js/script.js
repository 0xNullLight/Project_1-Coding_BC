// script.js

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('#nav_sidebar a');
    const pages = document.querySelectorAll('.page');
    const form = document.querySelector('section#home-page form');
    const dateInput = document.querySelector('#date');
    const sourceInput = document.querySelector('#income-source');
    const amountInput = document.querySelector('#amount');
    const optionSelect = document.querySelector('#option-select');
    const typeSelect = document.querySelector('#select');
    const toggleLink = document.getElementById('toggle-scheme');
    const header = document.querySelector('header');
    const navSidebar = document.querySelector('#nav_sidebar');
    const footer = document.querySelector('footer');
    
    let isOldScheme = false; // Initial scheme (false = light, true = dark)

    // Inline CSS for page visibility
    pages.forEach(page => page.style.display = 'none');
    document.getElementById('home-page').style.display = 'block';

    // Update the toggle button text based on the current scheme
    function updateToggleButtonText() {
        toggleLink.textContent = isOldScheme ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }

    // Call the function to set the initial button text
    updateToggleButtonText();

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

    // Function to convert table to CSV format
    function tableToCSV(table) {
        const rows = Array.from(table.querySelectorAll('tr'));
        const csvContent = rows.map(row => {
            const cells = Array.from(row.querySelectorAll('th, td'));
            return cells.map(cell => `"${cell.innerText.replace(/"/g, '""')}"`).join(',');
        }).join('\n');
        return csvContent;
    }

    // Function to trigger a CSV download
    function downloadCSV(csvContent, filename) {
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.setAttribute('download', filename);
        a.click();
    }

    // Add event listeners for download buttons
    document.getElementById('download-income-csv').addEventListener('click', () => {
        const csv = tableToCSV(document.querySelector('#income-page .styled-table'));
        const filename = prompt('Enter filename for Income CSV:', 'income-data.csv');
        if (filename) {
            downloadCSV(csv, filename);
        }
    });

    document.getElementById('download-expense-csv').addEventListener('click', () => {
        const csv = tableToCSV(document.querySelector('#expense-page .styled-table'));
        const filename = prompt('Enter filename for Expense CSV:', 'expense-data.csv');
        if (filename) {
            downloadCSV(csv, filename);
        }
    });

    // Toggle between light and dark schemes
    toggleLink.addEventListener('click', () => {
        isOldScheme = !isOldScheme;

        // Apply styles dynamically for smooth transitions
        if (isOldScheme) {
            document.body.style.backgroundColor = '#121212';
            document.body.style.color = '#e0e0e0';
            header.style.backgroundColor = '#1f1f1f';
            navSidebar.style.backgroundColor = '#1f1f1f';
            footer.style.backgroundColor = '#1f1f1f';
            document.querySelectorAll('.styled-table').forEach(table => {
                table.style.backgroundColor = '#1f1f1f';
                table.style.color = '#e0e0e0';
            });
        } else {
            document.body.style.backgroundColor = '#ffffff';
            document.body.style.color = '#000000';
            header.style.backgroundColor = '#f1f1f1';
            navSidebar.style.backgroundColor = '#f1f1f1';
            footer.style.backgroundColor = '#f1f1f1';
            document.querySelectorAll('.styled-table').forEach(table => {
                table.style.backgroundColor = '#ffffff';
                table.style.color = '#000000';
            });
        }

        // Update the toggle button text
        updateToggleButtonText();
    });
});

/* Store data from submit form income */
const income = document.getElementById('income');

income.addEventListener('click', function (event) {
    event.preventDefault();

    const incomeDate = document.getElementById('incomeDate');
    const incomeSource = document.getElementById('incomeSource');
    const incomeAmount = document.getElementById('incomeAmount');
    const optionselectIncome = document.getElementById('optionselectIncome');

    const incomeSubmission = {
        date: incomeDate.value,
        source: incomeSource.value,
        amount: incomeAmount.value,
        account: optionselectIncome.value,
    };

    let incomeTable = JSON.parse(localStorage.getItem('incomes')); // Check if there are any previously stored incomes

    if (!incomeTable) {
        incomeTable = [];
    }

    incomeTable.push(incomeSubmission);

    /* Dialog function */
    const dialog = document.getElementById("incomeDialog");
    const cancelButton = document.getElementById("cancel");

    if (!incomeSubmission.date || !incomeSubmission.source || !incomeSubmission.amount) {
        dialog.showModal();
    } else {
        localStorage.setItem('incomes', JSON.stringify(incomeTable));
        location.reload();
    }

    cancelButton.addEventListener("click", () => {
        dialog.close("formNotSubmitted");
    });
});

/* Store data from submit form expense */
const expense = document.getElementById('expense');

expense.addEventListener('click', function (event) {
    event.preventDefault();

    const expenseDate = document.getElementById('expenseDate');
    const expenseSource = document.getElementById('expenseSource');
    const expenseAmount = document.getElementById('expenseAmount');
    const optionselectExpense = document.getElementById('optionselectExpense');

    const expenseSubmission = {
        date: expenseDate.value,
        source: expenseSource.value,
        amount: expenseAmount.value,
        account: optionselectExpense.value,
    };

    let expenseTable = JSON.parse(localStorage.getItem('expenses')); // Check if there are any previously stored expenses

    if (!expenseTable) {
        expenseTable = [];
    }

    expenseTable.push(expenseSubmission);

    /* Dialog function */
    const dialog = document.getElementById("expenseDialog");
    const cancelButton = document.getElementById("cancel");

    if (!expenseSubmission.date || !expenseSubmission.source || !expenseSubmission.amount) {
        dialog.showModal();
    } else {
        localStorage.setItem('expenses', JSON.stringify(expenseTable));
        location.reload();
    }

    cancelButton.addEventListener("click", () => {
        dialog.close("formNotSubmitted");
    });
});

/* Take information from incomes array and send it to income table */
const incomePosts = document.querySelector('#income-elements');

function renderIncome() {
    let storedIncomes = JSON.parse(localStorage.getItem('incomes'));
    if (storedIncomes) {
        storedIncomes.forEach(storedIncome => {
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
        });
    }
}

document.addEventListener('DOMContentLoaded', renderIncome);

/* Take information from expenses array and send it to expense table */
const expensePosts = document.querySelector('#expense-elements');

function renderExpense() {
    let storedExpenses = JSON.parse(localStorage.getItem('expenses'));
    if (storedExpenses) {
        storedExpenses.forEach(storedExpense => {
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
        });
    }
}

document.addEventListener('DOMContentLoaded', renderExpense);

/* Add Event listeners for dropdowns */
typeSelect.addEventListener('change', function () {
    if (typeSelect.value === 'income') {
        sourceInput.setAttribute('placeholder', 'Income Source');
        amountInput.setAttribute('placeholder', 'Income Amount');
    } else {
        sourceInput.setAttribute('placeholder', 'Expense Source');
        amountInput.setAttribute('placeholder', 'Expense Amount');
    }
});

optionSelect.addEventListener('change', function () {
    if (optionSelect.value === 'choose') {
        sourceInput.setAttribute('readonly', 'readonly');
        amountInput.setAttribute('readonly', 'readonly');
    } else {
        sourceInput.removeAttribute('readonly');
        amountInput.removeAttribute('readonly');
    }
});
