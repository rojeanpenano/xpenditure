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

- **Personalized Budgeting** (Partially Implemented):
  - Transaction storage allows for budgeting logic in the future.

- **Data Privacy** (Completed):
  - Local MongoDB storage is implemented; no cloud integration ensures data remains private.

- **Offline Functionality** (Framework Ready):
  - Backend design supports local storage, paving the way for offline-first features.

- **Export to Excel** (Pending):
  - No feature to export data yet.

---

### **From Chapter 1.5: Significance of the Study**

**Planned Significance to Users:**
- **Individual Users**:
  - A tool to track income and expenses. (Completed)
- **Small Business Owners**:
  - Can benefit from detailed transaction tracking. (Framework Ready)
- **Privacy-Conscious Users**:
  - Local data storage ensures privacy. (Completed)

---

### **From Chapter 1.6: Scope and Delimitations**

**Included Features:**
- **Core Functionalities**:
  - Income/expense recording. (Completed)
  - Data categorization and storage. (Completed)
  - Shared expenses with settlement logic. (Completed)

**Excluded Features:**
- **Advanced AI**:
  - No ML/AI models for personalized insights yet.
- **Complex Financial Features**:
  - Features like investment tracking and automation are out of scope.

---

## **2. Implemented Features in the Backend**

- **Backend Setup**:
  - Node.js, Express.js, and MongoDB are fully configured.
  - Environment variables used for secure MongoDB connection.

- **Endpoints**:
  - User registration and login.
  - Add and retrieve transactions.
  - Shared expenses and settlement calculations.

- **Validation**:
  - Ensures valid user input for `userId`, `amount`, `type`, etc.

- **Algorithms Implemented**:
  - **Divide-and-Conquer**:
    - Used for calculating shared expense settlements.

- **Testing**:
  - All implemented endpoints were tested via Postman.

- **Documentation**:
  - README is completed and uploaded to GitHub.

---

## **3. Next Steps**

1. **Budget Tracking**:
   - Design APIs for users to set and monitor budgets.
   - Use algorithms (e.g., dynamic programming) to calculate budget optimization.

2. **Transaction Categorization**:
   - Implement logic to categorize transactions dynamically.
   - Use a greedy algorithm for prioritizing categories.

3. **Export to Excel**:
   - Add an endpoint to generate downloadable Excel reports for transactions.

4. **Visual Features**:
   - Implement APIs for generating data visualizations (e.g., cash flow charts).
   - Consider libraries like Chart.js for the frontend.

5. **Offline Functionality**:
   - Explore options to sync MongoDB changes for offline-first use cases.

6. **Future AI Integration**:
   - Implement algorithms for financial insights (dynamic programming or machine learning for predictions).