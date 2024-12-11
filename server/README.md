# Automated Expense and Budget Manager

## Overview

The **Automated Expense and Budget Manager** is a Node.js-based application designed to help users manage their finances efficiently. It provides functionalities such as account management, budget tracking, expense reporting, and alerts for due payments. The application ensures financial discipline by sending reminders via email or SMS and offering visual insights through expense category graphs.

### Key Features

1. **Account and Expense Management:**

   - Add, edit, and delete accounts and expenses.
   - Categorize expenses and track them effectively.

2. **Monthly Budget Tracking:**

   - Set monthly spending limits.
   - Get notifications when nearing budget limits.

3. **Payment Reminders:**

   - Receive alerts for due payments via email or SMS.

4. **Expense Reporting:**
   - Generate detailed monthly reports.
   - Visualize spending through category-based graphs.

---

## API Endpoints

### User Management

- **POST /users** - Register a new user.

  - Request Body:
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```

- **POST /login** - Authenticate a user and return a token.
  - Request Body:
    ```json
    {
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```

### Account Management

- **POST /accounts** - Create a new account.

  - Request Body:
    ```json
    {
      "name": "Electric Bill",
      "amount": 120.5,
      "dueDate": "2024-12-15",
      "category": "Utilities"
    }
    ```

- **GET /accounts** - Retrieve all accounts for the logged-in user.

- **DELETE /accounts/:id** - Delete an account by its ID.

### Budget Management

- **POST /budgets** - Create a monthly budget.

  - Request Body:
    ```json
    {
      "maxAmount": 2000.0
    }
    ```

- **GET /budgets/monthly-status** - Retrieve the current month’s budget status, including remaining balance and total expenses.

### Expense Reports

- **GET /reports/monthly** - Generate a detailed monthly expense report.
  - Response Example:
    ```json
    {
      "totalExpenses": 1500.75,
      "remainingBudget": 499.25,
      "expensesByCategory": {
        "Food": 500.0,
        "Utilities": 300.75,
        "Entertainment": 700.0
      }
    }
    ```

### Notifications

- **POST /notifications/send** - Trigger payment reminders for due accounts.
  - Request Body:
    ```json
    {
      "method": "email",
      "email": "john.doe@example.com"
    }
    ```

---

## Installation

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn package manager

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/expense-manager.git
   cd expense-manager
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables in a `.env` file:

   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/expense_manager
   SMTP_HOST=smtp.your-email-provider.com
   SMTP_PORT=587
   SMTP_USER=your-email@example.com
   SMTP_PASSWORD=your-email-password
   SMTP_FROM=YourApp <your-email@example.com>
   JWT_SECRET=your_jwt_secret
   ```

4. Run database migrations:

   ```bash
   npm run typeorm migration:run
   ```

5. Start the server:
   ```bash
   npm start
   ```

---

## Usage

- Use a tool like Postman or Insomnia to test the endpoints.
- Authenticate first to get a JWT token.
- Include the token in the `Authorization` header for all subsequent requests:
  ```
  Authorization: Bearer <your_token>
  ```

---

## Future Improvements

- Add recurring expense functionality.
- Introduce advanced analytics for spending trends.
- Support multi-currency accounts.

---

## License

This project is licensed under the MIT License.
