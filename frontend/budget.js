import { BASE_URL } from './apiConfig.js';

const token = localStorage.getItem('token'); // Retrieve token from localStorage

if (!token) {
    alert('You must log in to access this page.');
    window.location.href = 'Login.html';
}

// Set budget
document.getElementById('addBudgetForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const category = document.getElementById('budgetCategory').value;
    const amount = document.getElementById('budgetAmount').value;

    try {
        const response = await fetch(`${BASE_URL}/budgets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ category, amount })
        });

        if (!response.ok) throw new Error('Failed to set budget.');

        alert('Budget set successfully!');
        fetchBudgets(); // Refresh budget list
    } catch (error) {
        console.error(error);
        alert('Error setting budget.');
    }
});

// Fetch budgets
const fetchBudgets = async () => {
    try {
        const response = await fetch(`${BASE_URL}/budgets`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error('Failed to fetch budgets.');

        const budgets = await response.json();
        const budgetList = document.getElementById('budgetList');
        budgetList.innerHTML = '';

        budgets.forEach((budget) => {
            const div = document.createElement('div');
            div.innerText = `${budget.category}: $${budget.amount}`;
            budgetList.appendChild(div);
        });
    } catch (error) {
        console.error(error);
        alert('Error fetching budgets.');
    }
};

// Initial fetch
fetchBudgets();
