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

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const type = typeSelect.value;
        const date = dateInput.value;
        const source = sourceInput.value;
        const amount = amountInput.value;
        const account = optionSelect.value;

        // Create a new table row
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${date}</td>
            <td>${source}</td>
            <td>${amount}</td>
            <td>${account}</td>
        `;

        // Append the new row to the appropriate table
        if (type === 'income') {
            document.querySelector('#income-page .styled-table tbody').appendChild(newRow);
        } else if (type === 'expense') {
            document.querySelector('#expense-page .styled-table tbody').appendChild(newRow);
        }

        // Clear the form fields
        form.reset();
    });

    // Display the home page initially
    document.getElementById('home-page').style.display = 'block';
});
