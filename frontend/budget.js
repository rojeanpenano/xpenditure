// Base URL configuration
const BASE_URL = "https://xpenditure-1krq.onrender.com/api";

// Retrieve token from localStorage
const token = localStorage.getItem('token');
if (!token) {
    alert('You must log in to access this page.');
    window.location.href = 'Log.html'; // Redirect to login page if not authenticated
}

// Event listener for setting a new budget
document.getElementById('addBudgetForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form default behavior

    const category = document.getElementById('budgetCategory').value; // Get category input
    const amount = document.getElementById('budgetAmount').value;   // Get amount input

    try {
        // POST request to add a new budget with hardcoded PHP currency
        const response = await fetch(`${BASE_URL}/budgets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Include JWT token in headers
            },
            body: JSON.stringify({ category, amount, currency: 'PHP' }),
        });

        if (!response.ok) throw new Error('Failed to set budget.');

        alert('Budget set successfully!');
        fetchBudgets(); // Refresh the budget list
    } catch (error) {
        console.error('Error while setting budget:', error); // Log error
        alert('Error setting budget.');
    }
});

// Function to fetch and display budgets
const fetchBudgets = async () => {
    try {
        console.log('Fetching budgets...'); // Log when fetching starts
        const response = await fetch(`${BASE_URL}/budgets`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`, // Include JWT token
            },
        });

        console.log('Response status:', response.status); // Log response status
        if (!response.ok) throw new Error('Failed to fetch budgets.');

        const budgets = await response.json();
        console.log('Fetched budgets:', budgets); // Log the data fetched

        // Render budgets in the table
        const budgetTableBody = document.getElementById('budgetTableBody');
        budgetTableBody.innerHTML = '';
        budgets.forEach((budget) => {
            const row = document.createElement('tr');
            const categoryCell = document.createElement('td');
            const amountCell = document.createElement('td');
            categoryCell.textContent = budget.category;
            amountCell.textContent = `₱ ${budget.amount.toFixed(2)}`;
            row.appendChild(categoryCell);
            row.appendChild(amountCell);
            budgetTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching budgets:', error); // Log the error
        alert('Error fetching budgets.');
    }
};


// Fetch budgets when the page loads
fetchBudgets();
