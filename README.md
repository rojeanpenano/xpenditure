# XPENDITURE Backend

XPENDITURE is a backend API designed for managing personal and shared finances. It focuses on privacy, offline functionality, and accessibility while offering features like expense tracking, shared expense management, and budgeting.

---

## **1. Key Features of XPENDITURE**

### **From Chapter 1: Project Context, Purpose, and Features**

**Planned Features:**
- **Income and Expense Tracking** (Completed):
  - Users can record transactions (income/expense) via API.
  - Transactions are categorized and associated with a user.

- **Shared Expenses** (Completed):
  - Features to split expenses among multiple users, with settlement calculations using a divide-and-conquer algorithm.

- **Personalized Budgeting** (Completed):
  - Users can set budgets, view their allocations, and optimize spending using dynamic programming.

- **Data Privacy** (Completed):
  - Local MongoDB storage is implemented; no cloud integration ensures data remains private.

- **Offline Functionality** (Framework Ready):
  - Backend design supports local storage, paving the way for offline-first features.

- **Export to Excel** (Pending):
  - No feature to export data yet.

---

## **2. Implemented Features in the Backend**

- **Backend Setup**:
  - Node.js, Express.js, and MongoDB are fully configured.
  - Environment variables used for secure MongoDB connection.

- **Endpoints**:
  - User registration and login.
  - Add and retrieve transactions.
  - Shared expenses and settlement calculations.
  - Budget creation, retrieval, and optimization.

- **Algorithms Implemented**:
  - **Divide-and-Conquer**:
    - Used for calculating shared expense settlements.
  - **Dynamic Programming**:
    - Applied to optimize spending against a defined budget.

- **Validation**:
  - Ensures valid user input for `userId`, `amount`, and `transactions`.

- **Testing**:
  - All implemented endpoints were tested via Postman.

---

## **3. Next Steps**

1. **Transaction Categorization**:
   - Implement logic to categorize transactions dynamically.
   - Use a greedy algorithm for prioritizing categories.

2. **Export to Excel**:
   - Add an endpoint to generate downloadable Excel reports for transactions.

3. **Visual Features**:
   - Implement APIs for generating data visualizations (e.g., cash flow charts).
   - Consider libraries like Chart.js for the frontend.

4. **Offline Functionality**:
   - Explore options to sync MongoDB changes for offline-first use cases.

5. **Future AI Integration**:
   - Implement algorithms for financial insights (dynamic programming or machine learning for predictions).

---

## **4. API Documentation**

### **User Endpoints**

1. **Register User**:
   - **POST** `/api/users/register`
   - **Body**:
     ```json
     {
       "name": "John Doe",
       "email": "john.doe@example.com",
       "password": "password123"
     }
     ```

2. **Login User**:
   - **POST** `/api/users/login`
   - **Body**:
     ```json
     {
       "email": "john.doe@example.com",
       "password": "password123"
     }
     ```

---

### **Transaction Endpoints**

1. **Add Transaction**:
   - **POST** `/api/transactions`
   - **Body**:
     ```json
     {
       "userId": "user_id_here",
       "amount": 200,
       "category": "Groceries",
       "type": "expense"
     }
     ```

2. **Get Transactions**:
   - **GET** `/api/transactions/:userId`

---

### **Budget Endpoints**

1. **Set Budget**:
   - **POST** `/api/budgets`
   - **Body**:
     ```json
     {
       "userId": "user_id_here",
       "amount": 1000,
       "categories": [
         { "category": "Food", "allocated": 400 },
         { "category": "Transport", "allocated": 200 }
       ]
     }
     ```

2. **View Budget**:
   - **GET** `/api/budgets/:userId`

3. **Optimize Budget**:
   - **POST** `/api/budgets/optimize`
   - **Body**:
     ```json
     {
       "budgetLimit": 500,
       "transactions": [
         { "amount": 150 },
         { "amount": 200 },
         { "amount": 100 }
       ]
     }
     ```
   - **Response**:
     ```json
     {
       "message": "Optimized budget usage calculated",
       "optimizedUsage": 450
     }
     ```