# Xpenditure Backend

Xpenditure is a comprehensive expense management application backend. It provides features for tracking expenses, sharing costs, and generating summaries, all powered by Node.js, Express, and MongoDB.

---

## Features

1. **User Management**:
   - Register a new user.
   - Login with JWT authentication.
   - Password reset via email.

2. **Transaction Management**:
   - Add new transactions.
   - View all transactions.
   - Categorized and monthly expense summaries.

3. **Expense Sharing**:
   - Shared expense settlements.

4. **Analytics**:
   - Summary of categorized expenses.
   - Monthly financial breakdown.

---

## Deployment

The backend is deployed on [Render](https://render.com).  
**Live URL**: [https://xpenditure-1krq.onrender.com](https://xpenditure-1krq.onrender.com)

---

## API Endpoints

### **Authentication**
- **Register**: `POST /api/users/register`
- **Login**: `POST /api/users/login`
- **Password Reset**:
  - Request: `POST /api/users/request-password-reset`
  - Reset: `POST /api/users/reset-password/:token`

### **Transactions**
- **Add Transaction**: `POST /api/transactions`
- **View Transactions**: `GET /api/transactions`
- **Categorized Summary**: `GET /api/transactions/summary/categories`
- **Monthly Summary**: `GET /api/transactions/summary/month`

### **Expense Sharing**
- **Shared Expense Settlements**: `POST /api/transactions/settle-expenses`

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Atlas or local setup)
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: Nodemailer (Gmail SMTP)
- **Testing**: Jest, Supertest

---

## Local Development

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/rojeanpenano/xpenditure.git
   cd xpenditure
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure `.env`:
   - `PORT=5000`
   - `MONGO_URI=<your_mongodb_connection_string>`
   - `JWT_SECRET=<your_secret_key>`
   - `EMAIL_USER=<your_email>`
   - `EMAIL_PASS=<your_app_password>`

4. Run the server:
   ```bash
   npm start
   ```

---

## Testing

Run the tests using Jest:
```bash
npm test
```

---

## Deployment

1. **Live Backend**: Hosted on Render [here](https://xpenditure-1krq.onrender.com).
2. Environment variables configured in the Render dashboard.

---

## Next Steps

- Add role-based access control (e.g., admin).
- Enhance analytics with daily/weekly tracking.
- Integrate with frontend (HTML/React).
