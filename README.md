# Xpenditure Backend

## **Project Overview**
Xpenditure is a service designed to help users manage their finances efficiently. It provides features for user authentication, transaction management, budget planning, shared expense settlements, and exporting data. The backend is built using **Node.js**, **Express**, and **MongoDB**, and implements advanced algorithms for financial computations.

---

## **Features**
1. **User Management**:
   - Registration and login with secure password hashing using `bcrypt`.
   - Authentication using JSON Web Tokens (JWT).

2. **Transaction Management**:
   - Add, view, and categorize transactions.
   - Monthly spending summary using a Greedy Algorithm.

3. **Budget Management**:
   - Set and retrieve budgets.
   - Budget optimization using Dynamic Programming.

4. **Shared Expense Settlements**:
   - Divide and Conquer algorithm to calculate shared expenses between users.

5. **Export Data**:
   - Export transactions as an Excel file using the `exceljs` library.

---

## **Implemented Algorithms**
1. **Greedy Algorithm**: 
   - **Transaction Categorization**: Categorizes transactions based on predefined keywords in descriptions.
   - **Monthly Spending Summary**: Groups transactions by categories and calculates totals for a specific month.

2. **Dynamic Programming**: 
   - **Budget Optimization**: Allocates resources to maximize spending within a given budget limit.

3. **Divide and Conquer**: 
   - **Shared Expense Settlements**: Calculates how much each participant owes or is owed in shared expenses by splitting and merging expense data.

---

## **Project Progress**
### **Completed Features**
- User authentication and JWT-based security.
- Transaction management endpoints:
  - Adding transactions.
  - Viewing user-specific transactions.
  - Categorizing transactions.
  - Monthly spending summary.
- Budget management:
  - Setting and retrieving budgets.
  - Optimizing budget allocation using dynamic programming.
- Shared expense settlements using divide and conquer.
- Exporting transaction data to Excel.

### **Next Plans**
1. Enhance error handling with custom middleware.
2. Integrate APIs for data visualization and reporting.
3. Optimize performance for large transaction datasets.
4. Add more advanced financial algorithms.

---

## **Technology Stack**
- **Backend Framework**: Node.js with Express.js.
- **Database**: MongoDB with Mongoose.
- **Authentication**: JSON Web Tokens (JWT) and `bcrypt` for password hashing.
- **Excel Export**: `exceljs` library for generating Excel files.

---

## **How to Use**
### **Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/rojeanpenano/xpenditure.git
   ```
2. Navigate to the project directory:
   ```bash
   cd xpenditure-backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file with the following variables:
   ```plaintext
   PORT=5000
   MONGO_URI=<your_mongo_connection_string>
   JWT_SECRET=<your_secret_key>
   ```
5. Start the server:
   ```bash
   npm start
   ```

---

### **API Endpoints**
#### **User Management**
1. **Register**:
   - `POST /api/users/register`
   - Body:
     ```json
     {
         "name": "John Doe",
         "email": "john.doe@example.com",
         "password": "password123"
     }
     ```
2. **Login**:
   - `POST /api/users/login`
   - Body:
     ```json
     {
         "email": "john.doe@example.com",
         "password": "password123"
     }
     ```

#### **Transaction Management**
1. **Add Transaction**:
   - `POST /api/transactions`
   - Body:
     ```json
     {
         "userId": "<user_id>",
         "amount": 200,
         "category": "Groceries",
         "type": "expense",
         "description": "Weekly shopping"
     }
     ```
2. **View Transactions**:
   - `GET /api/transactions/:userId`

3. **Monthly Spending Summary**:
   - `GET /api/transactions/summary/:userId/:year/:month`

4. **Categorize Transactions**:
   - `POST /api/transactions/categorize`
   - Body:
     ```json
     {
         "transactions": [
             { "description": "Bought groceries", "amount": 50 },
             { "description": "Monthly rent payment", "amount": 500 }
         ]
     }
     ```

#### **Budget Management**
1. **Set Budget**:
   - `POST /api/budgets`
   - Body:
     ```json
     {
         "userId": "<user_id>",
         "amount": 1000,
         "categories": [
             { "category": "Food", "allocated": 400 },
             { "category": "Transport", "allocated": 200 }
         ]
     }
     ```

2. **View Budget**:
   - `GET /api/budgets/:userId`

3. **Optimize Budget**:
   - `POST /api/budgets/optimize`
   - Body:
     ```json
     {
         "budgetLimit": 800,
         "expenses": [
             { "name": "Groceries", "cost": 300 },
             { "name": "Transport", "cost": 150 }
         ]
     }
     ```

#### **Shared Expense Settlements**
1. **Calculate Settlements**:
   - `POST /api/shared-expenses/settlements`
   - Body:
     ```json
     {
         "expenses": [
             {
                 "description": "Dinner",
                 "amount": 100,
                 "paidBy": { "userId": "123", "amount": 100 },
                 "sharedAmong": [
                     { "userId": "123", "share": 50 },
                     { "userId": "456", "share": 50 }
                 ]
             }
         ]
     }
     ```

#### **Export Data**
1. **Export Transactions**:
   - `GET /api/export/transactions/:userId`

---

## **Contributing**
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

---

## **License**
This project is licensed under the MIT License.

---

## **Acknowledgments**
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [ExcelJS](https://github.com/exceljs/exceljs)
```