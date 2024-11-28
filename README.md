# Xpenditure Backend

Xpenditure is a comprehensive expense management application backend. It provides features for tracking expenses, sharing costs, and generating summaries, all powered by Node.js, Express, and MongoDB.

---

## **Features**

### **1. User Management**
- **Registration**: Create new user accounts with hashed passwords for security.
- **Login**: Secure login with JWT authentication.
- **Password Reset**:
  - Request a reset token via email.
  - Reset the password securely using the token.

### **2. Transaction Management**
- **Add Transactions**: Record expenses and income with details like amount, category, and description.
- **View Transactions**: Retrieve a list of all transactions with filtering and sorting capabilities.

### **3. Budgeting**
- **Balance Tracking**:
  - Record and update cash and card balances.
  - Deduct expenses from the appropriate balance.
  - Get real-time updates on remaining balances.

### **4. Data Export**
- Export all transactions to an Excel file for offline use or analysis.

### **5. Deployment**
- Fully deployed on Render with a live URL for API access:
  - **Live URL**: [https://xpenditure-1krq.onrender.com](https://xpenditure-1krq.onrender.com)

---

## **Setup and Installation**

### **Prerequisites**
- Node.js v18+
- MongoDB (local or cloud-hosted)

### **Installation**
1. **Clone the repository**:
   ```bash
   git clone https://github.com/rojeanpenano/xpenditure.git
   cd xpenditure-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory with the following:
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://admin:AI-deLasalle2024@xpenditure.doky3.mongodb.net/
   JWT_SECRET="f7b069c3fe6c945d24a2c8db0021bf98dc6c7891824c95ecf38f4b25717082bf56159d12c8ee6e0efda84c41086656b2cc81b4038633d7f7008b844d01c48464"
   EMAIL_USER="xpenditure.aidelasalle@gmail.com"
   EMAIL_PASS="ycefs ytzd wlgs ejhj"
   ```

4. **Run the server**:
   ```bash
   npm start
   ```

---

## **API Endpoints**

### **Authentication**
- **Register**: `POST /api/users/register`
  - Request Body:
    ```json
    {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "password123"
    }
    ```
- **Login**: `POST /api/users/login`
  - Request Body:
    ```json
    {
        "email": "john@example.com",
        "password": "password123"
    }
    ```
  - Response:
    ```json
    {
        "message": "Login successful",
        "token": "<jwt_token>",
        "userId": "<user_id>"
    }
    ```

- **Password Reset**:
  - Request Reset: `POST /api/users/request-password-reset`
  - Reset Password: `POST /api/users/reset-password/:token`

---

### **User Balances**
- **Get Balances**: `GET /api/users/balances`
  - Requires Authorization Header:
    ```
    Authorization: Bearer <your_jwt_token>
    ```
  - Response:
    ```json
    {
        "balances": {
            "cash": 1000,
            "card": 2000
        }
    }
    ```

- **Update Balances**: `PUT /api/users/balances`
  - Requires Authorization Header:
    ```
    Authorization: Bearer <your_jwt_token>
    ```
  - Request Body:
    ```json
    {
        "cash": 1500,
        "card": 2500
    }
    ```

---

### **Transactions**
- **Add Transaction**: `POST /api/transactions`
  - Request Body:
    ```json
    {
        "amount": 100,
        "category": "Food",
        "description": "Lunch at restaurant",
        "date": "2024-01-01"
    }
    ```
  - Requires Authorization Header:
    ```
    Authorization: Bearer <your_jwt_token>
    ```

<<<<<<< HEAD
- Add role-based access control (e.g., admin).
- Enhance analytics with daily/weekly tracking.
- Integrate with frontend (HTML/React).

- **View Transactions**: `GET /api/transactions`
  - Response:
    ```json
    [
        {
            "id": "transaction_id",
            "amount": 100,
            "category": "Food",
            "description": "Lunch at restaurant",
            "date": "2024-01-01"
        }
    ]
    ```

---

### **Data Export**
- **Export Transactions to Excel**: `GET /api/transactions/export`
  - Downloads an Excel file with all transaction data.
  - Requires Authorization Header:
    ```
    Authorization: Bearer <your_jwt_token>
    ```

---

## **Testing**

### **Unit Tests**
- Run tests using Jest:
  ```bash
  npm test
  ```

### **Endpoints Covered**
- User registration and login.
- Transaction management (add, view, export).
- Balance tracking.