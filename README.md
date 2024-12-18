# **XPENDITURE: A Web-Based Money Tracker and Budgeting System**

## **Overview**
XPENDITURE is a web-based platform that streamlines personal and shared expense management. Key features include budget tracking, transaction management, and shared expense handling, making financial planning easy and transparent.

---

## **Features**
### **1. User Management**
- **Secure Authentication**: Token-based user login and registration.
- **Personalized Profiles**: Each user has dedicated budgets, transactions, and shared expenses.

### **2. Budget Management**
- Track budgets by category (e.g., Food, Utilities, Entertainment).
- Features:
  - Add new budgets.
  - View budgets in a tabular format.

### **3. Transaction Management**
- Log financial transactions as "income" or "expense."
- Features:
  - Add and categorize transactions.
  - Summarize transactions in a user-friendly table.

### **4. Shared Expense Management**
- Track and split expenses among participants.
- Features:
  - Add and divide shared expenses automatically.
  - Ensure fair and transparent sharing.

### **5. Security**
- Token-based authentication and secure API endpoints.
- Enforces data integrity using modern web security standards.

---

## **System Architecture**
### **Frontend**
- **Built with**: HTML, CSS, JavaScript.
- **Key Pages**:
  - Homepage with navigation links.
  - Budget, Transaction, and Shared Expense Management pages.

### **Backend**
- **Built with**: Node.js, Express.js.
- **Core APIs**:
  - `/api/users`: User registration and authentication.
  - `/api/budgets`: Budget creation and retrieval.
  - `/api/transactions`: Transaction logging and management.
  - `/api/shared-expenses`: Shared expense tracking.

### **Database**
- **MongoDB** for storing:
  - User profiles, budgets, transactions, and shared expenses.

---

## **Technical Details**
### **Folder Structure**
```
xpenditure-backend/
├── models/
├── controllers/
├── routes/
├── middleware/
├── public/
├── config/
└── server.js
```

### **Key Endpoints**
| Method | Endpoint              | Description               |
|--------|------------------------|---------------------------|
| POST   | `/api/users/register` | Register a new user       |
| POST   | `/api/users/login`    | Authenticate user         |
| GET    | `/api/budgets`        | Retrieve all budgets      |
| POST   | `/api/budgets`        | Create a new budget       |
| GET    | `/api/transactions`   | Retrieve all transactions |
| POST   | `/api/transactions`   | Add a new transaction     |
| GET    | `/api/shared-expenses`| Retrieve shared expenses  |
| POST   | `/api/shared-expenses`| Add a new shared expense  |

---

## **Getting Started**
### **1. Installation**
1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Navigate to the project directory:
   ```bash
   cd xpenditure-backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### **2. Configuration**
Create a `.env` file in the root directory:
```bash
PORT=5000
MONGO_URI=mongodb+srv://admin:AI-deLasalle2024@xpenditure.doky3.mongodb.net/
JWT_SECRET="f7b069c3fe6c945d24a2c8db0021bf98dc6c7891824c95ecf38f4b25717082bf56159d12c8ee6e0efda84c41086656b2cc81b4038633d7f7008b844d01c48464"
```

### **3. Running the Application**
- Start the backend server:
  ```bash
  npm start
  ```
- Open `index.html` in your browser for the frontend.

---

## **User Guide**
1. **Login/Register**: Securely log in or create an account.
2. **Budget Management**: Set budgets and track progress.
3. **Transaction Management**: Log and categorize financial transactions.
4. **Shared Expense Management**: Split group expenses fairly.

---
## **Security Highlights**
- Secure data transactions with JWT.
- Enforce role-based access for APIs.