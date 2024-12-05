# **XPENDITURE: A Web-Based Money Tracker and Budgeting System
**

## **Overview**
XPENDITURE is a web-based system designed to help users efficiently manage personal and shared expenses. With features like budget tracking, transaction management, and shared expense handling, XPENDITURE aims to simplify financial planning and promote transparency among users sharing expenses.

This document provides a detailed explanation of the system's features, technical architecture, and usage instructions.

---

## **Key Features**
### **1. User Management**
- **Registration and Login**: Users can create accounts and log in securely using a token-based authentication system.
- **Profile Management**: Each user has a unique profile for storing their budgets, transactions, and shared expenses.

### **2. Budget Management**
- Allows users to set and track budgets for various categories (e.g., Food, Utilities, Entertainment).
- Features:
  - Add a budget with a category and amount.
  - View all budgets in a table format.
  - Ensure design consistency with the rest of the system.

### **3. Transaction Management**
- Users can record their financial transactions, categorized as "income" or "expense."
- Features:
  - Add new transactions with details like date, description, category, amount, and type.
  - View a summary of all transactions in a table format.
  - Ensures transparency in personal finance tracking.

### **4. Shared Expense Management**
- Facilitates the tracking of shared expenses among multiple participants.
- Features:
  - Add shared expenses by specifying an expense name, total amount, and participants.
  - Automatically calculate the per-participant share and display in a table.
  - Enhances financial accountability and promotes fair expense sharing.

### **5. Security**
- Uses modern web security practices such as JWT-based authentication, CORS, and helmet headers.
- Protects sensitive user data by enforcing authentication for all user-specific operations.

---

## **System Design**
### **Frontend**
- Built using **HTML**, **CSS**, and **JavaScript**.
- Each page is designed for user-friendly navigation and consistency:
  - **Homepage**: Provides links to Budget Management, Transaction Management, and Shared Expense Management.
  - **Budget Management**: Allows users to set budgets and view them in a clean, tabular format.
  - **Transaction Management**: Enables users to log and track financial transactions.
  - **Shared Expense Management**: Manages shared expenses among multiple participants.

### **Backend**
- Developed using **Node.js** and **Express.js**.
- Key API endpoints:
  - `/api/users`: Handles user registration and login.
  - `/api/transactions`: Manages transaction records.
  - `/api/budgets`: Handles budget creation and retrieval.
  - `/api/shared-expenses`: Manages shared expenses.
- Secured with authentication middleware.

### **Database**
- Powered by **MongoDB**, a NoSQL database that stores:
  - User details
  - Budgets
  - Transactions
  - Shared expenses

---

## **Technical Details**
### **1. Folder Structure**
```
project-directory/
├── models/
│   ├── User.js
│   ├── Budget.js
│   ├── Transaction.js
│   ├── SharedExpense.js
├── controllers/
│   ├── userController.js
│   ├── budgetController.js
│   ├── transactionController.js
│   ├── sharedExpenseController.js
├── routes/
│   ├── userRoutes.js
│   ├── budgetRoutes.js
│   ├── transactionRoutes.js
│   ├── sharedExpenseRoutes.js
├── middleware/
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
├── public/
│   ├── index.html
│   ├── Budget.html
│   ├── Transaction.html
│   ├── SharedExpense.html
│   ├── style.css
├── config/
│   ├── db.js
├── server.js
```

### **2. Key Endpoints**
| HTTP Method | Endpoint                  | Description                              |
|-------------|---------------------------|------------------------------------------|
| POST        | `/api/users/register`     | Register a new user                     |
| POST        | `/api/users/login`        | Log in a user                           |
| GET         | `/api/budgets`            | Get all budgets                         |
| POST        | `/api/budgets`            | Add a new budget                        |
| GET         | `/api/transactions`       | Get all transactions                    |
| POST        | `/api/transactions`       | Add a new transaction                   |
| GET         | `/api/shared-expenses`    | Get all shared expenses                 |
| POST        | `/api/shared-expenses`    | Add a new shared expense                |

---

## **Usage Instructions**
### **1. Installation**
1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Navigate to the project directory:
   ```bash
   cd project-directory
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### **2. Environment Configuration**
- Create a `.env` file in the root directory and add the following:
  ```
  PORT=5000
  MONGO_URI=<your_mongo_db_connection_string>
  JWT_SECRET=<your_secret_key>
  ```

### **3. Running the Application**
- Start the backend server:
  ```bash
  npm start
  ```
- Open `index.html` in your browser to interact with the frontend.

---

## **Demo Walkthrough**
1. **Login/Registration**:
   - Register or log in as a new user.
2. **Budget Management**:
   - Navigate to the Budget Management page to add and view budgets.
3. **Transaction Management**:
   - Navigate to the Transaction Management page to log income and expenses.
4. **Shared Expense Management**:
   - Navigate to the Shared Expense Management page to add and view shared expenses.

---

## **Additional Notes**
- **Innovation**: Shared Expense Management simplifies expense division among groups, which is not commonly included in personal finance apps.
- **Scalability**: MongoDB and modular backend design allow for adding more features like expense analytics in the future.
- **Usability**: Intuitive design ensures a smooth user experience for both technical and non-technical users.
- **Security**: Token-based authentication, CORS, and encrypted connections ensure data privacy and integrity.