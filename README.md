# DemoCredit API Readme

Welcome to the DemoCredit API documentation! 🚀 This API serves as the backend for a versatile and user-friendly financial platform, allowing you to create, manage, and interact with user accounts, wallets, and transactions seamlessly. Whether you're a developer integrating our API into your application or a curious user wanting to understand the technical aspects, this readme will guide you through the process.

## Table of Contents

- [Introduction](#introduction)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Setting Up Locally](#setting-up-locally)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
  - [Auth](#auth)
  - [Wallet](#wallet)
  - [Transaction](#transaction)
- [Database Schema](#database-schema)
- [Responses](#responses)
- [Error Handling](#error-handling)
- [Examples](#examples)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [Contact Us](#contact-us)

## Introduction

Demo Credit is a mobile lending app that requires wallet functionality. This is needed as borrowers need a wallet to receive the loans they have been granted and also send the money for repayments.

## Key Features

- **User Authentication**: Securely register and log in users with hashed passwords and JWT token authentication. 🔐
- **Wallet Management**: Automatically create wallets for users upon registration with an initial balance, and manage wallet operations such as funding, withdrawals, and transfers. 💼
- **Transaction Management**: Record and retrieve transaction details, ensuring data integrity with transaction management using Knex.js transactions. 💸

## Getting Started

To start using the DemoCredit API, follow these steps:

1. **Sign Up**: Create an account on our platform to obtain API credentials.
2. **Authentication**: Acquire an API key to authenticate your requests.
3. **Explore Endpoints**: Review the available API endpoints and their functionalities.
4. **Make Requests**: Make HTTP requests to interact with the API and manage user accounts, wallets, and transactions.
5. **Handle Responses**: Process the API responses according to your application's requirements.

## Setting Up Locally

To set up the DemoCredit API locally on your machine, follow these steps:

### Prerequisites

- MySQL
- Node.js (LTS version)
- TypeScript
- npm

### Installation

1. **Clone the repository**:
    Clone the repo after forking and replace `yourusername` with your actual github username
   ```bash
   git clone https://github.com/yourusername/democredit-api.git
   cd democredit-api
   ```

2. **Install dependencies**:
   Using npm:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory by running the code below in your root directory.
   ```env
    cp .sample.env .env
   ```

4. **Run database migrations**:
   ```bash
   npm run migrate
   ```

5. **Seed the database** (optional, for mock data):
   ```bash
   npm run seed
   ```

6. **Start the server**:
   ```bash
   npm start
   ```

   The API should now be running on `http://localhost:3000`. 🚀

## Authentication

To authenticate your requests, include your API key in the headers of your HTTP requests:

```http
GET /api/v1/some-endpoint
Authorization: Bearer TOKEN
```

The API also uses the [Karma Blacklist API](https://api.adjutor.io/) to check if a user is blacklisted before allowing registration. This ensures the security and integrity of the platform. 🛡️

## Endpoints

You can test the the API live using the postman collection [<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/22998842-8f75ca4a-103a-4a38-8aa6-e44a262ece59?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D22998842-8f75ca4a-103a-4a38-8aa6-e44a262ece59%26entityType%3Dcollection%26workspaceId%3D7f67fa21-44c5-42ad-b175-a774189ac995)

### Auth

**Description**: The `Auth` endpoints handle user authentication and management. This includes registering new users and logging in existing users, with password hashing and JWT token generation.

- **Register User**
  - **Endpoint**: `/api/v1/auth/register`
  - **Method**: `POST`
  - **Description**: Register a new user.
  - **Request Body**:
    ```json
    {
      "name": "John Doe",
      "username": "johndoe",
      "email": "john.doe@example.com",
      "password": "securepassword123"
    }
    ```
  - **Response**:
    ```json
    {
    "statusCode": 201,
    "message": "User succesfully created",
    "data": {
        "user_id": 4,
        "name": "John Doe",
        "username": "johndoe",
        "email": "john.doe@example.com",
        "created_at": "2024-06-17T08:05:19.000Z",
        "deleted_at": null
     }
    }
    ```

- **Login User**
  - **Endpoint**: `/api/v1/auth/login`
  - **Method**: `POST`
  - **Description**: Log in an existing user.
  - **Request Body**:
    ```json
    {
      "identifier": "john.doe@example.com",
      "password": "securepassword123"
    }
    ```
  - **Response**:
    ```json
    {
    "statusCode": 200,
    "message": "User logged in succesfully",
    "data": {
        "user_id": 1,
        "name": "John Doe",
        "username": "johndoe",
        "email": "john.doe@example.com",
        "created_at": "2024-06-17T00:00:00Z"
      },
    "token": "jwt_token"
    }
    ```

### Wallet

**Description**: The `Wallet` endpoints manage user wallets. This includes creating wallets upon user registration, updating wallet balances, and handling wallet-related transactions like funding, withdrawals, and transfers.

- **Get Wallet**
  - **Endpoint**: `/api/v1/wallet/:walletId`
  - **Method**: `GET`
  - **Description**: Retrieve wallet details by wallet ID.
  - **Response**:
    ```json
    {
    "statusCode": 200,
    "message": "Wallet retrieved successfully",
    "data": {
        "wallet_id": "1561536322",
        "user_id": 3,
        "balance": 0,
        "created_at": "2024-06-16T15:04:43.000Z"
     }
    }
    ```

- **Fund Wallet**
  - **Endpoint**: `/api/v1/wallet/fund`
  - **Method**: `POST`
  - **Description**: Fund a wallet.
  - **Request Body**:
    ```json
    {
      "amount": 500.00
    }
    ```
  - **Response**:
    ```json
    "statusCode": 200,
    "message": "Wallet funded successfully",
    "data": {
        "message": "100 has been deposited into your wallet"
    }
    ```

- **Withdraw from Wallet**
  - **Endpoint**: `/api/v1/wallet/withdraw`
  - **Method**: `POST`
  - **Description**: Withdraw funds from a wallet.
  - **Request Body**:
    ```json
    {
      "wallet_id": "1234567890",
      "amount": 200.00
    }
    ```
  - **Response**:
    ```json
    {
    "statusCode": 200,
    "message": "Withdrawal successful",
    "data": {
        "message": "Withdrawal of 100 successful"
     }
    }
    ```

- **Transfer Funds**
  - **Endpoint**: `/api/v1/wallet/transfer`
  - **Method**: `POST`
  - **Description**: Transfer funds between wallets.
  - **Request Body**:
    ```json
    {
        "toWalletId": "4970159032",
        "amount": 200
    }
    ```
  - **Response**:
    ```json
    {
    "statusCode": 200,
    "message": "Transfer successful",
    "data": {
        "message": "Transfer of 200 successful"
     }
    }
    ```

### Transaction

**Description**: The `Transaction` endpoints handle operations related to transactions. This includes creating transactions, retrieving individual transactions, and listing all transactions for a user's wallet. All transaction operations ensure data consistency and integrity.

- **Get Transaction by ID**
  - **Endpoint**: `/api/v1/transactions/:transactionId`
  - **Method**: `GET`
  - **Description**: Retrieve a single transaction by its ID.
  - **Response**:
    ```json
    {
    "statusCode": 200,
    "message": "Transaction retrieved",
    "data": {
        "transaction_id": 8,
        "wallet_id": "6366247650",
        "type": "transfer",
        "amount": 300,
        "recipient_account_id": "4970159032",
        "created_at": "2024-06-17T16:08:20.000Z"
     }
    }
    ```

- **Get Transactions by Wallet ID**
  - **Endpoint**: `/api/v1/transactions/wallet/:walletId`
  - **Method**: `GET`
  - **Description**: Retrieve all transactions for a specific wallet.
  - **Response**:
    ```json
    "statusCode": 200,
    "message": "Transactions retrieved",
    "data": [
        {
            "transaction_id": 9,
            "wallet_id": "6366247650",
            "type": "transfer",
            "amount": 200,
            "recipient_account_id": "4970159032",
            "created_at": "2024-06-17T16:09:55.000Z"
        },
        {
            "transaction_id": 10,
            "wallet_id": "6366247650",
            "type": "withdraw",
            "amount": 100,
            "recipient_account_id": "6366247650",
            "created_at": "2024-06-17T16:27:47.000Z"
        }
    ]
    ```

## Database Schema

![Database Schema](./Demo_Credit%20Schema.png)

### Entity Relationship Description

- **Users**: Represent individual users in the system. Each user has a unique `user_id`, `name`, `username`, `email`, and `password`.
- **Wallets**: Represent wallets associated with users. Each wallet has a unique `wallet_id`, belongs to a `user_id`, and has a `balance`.
- **Transactions**: Represent financial transactions involving wallets. Each transaction has a unique `transaction_id`, is linked to a `wallet_id`, and includes details such as `type` (fund, withdraw, transfer), `amount`, `recipient_account_id`, and `created_at`.

### Folder Structure

```plaintext
Demo-Credit/
├─ dist/
├─ node_modules/
├─ src/
│  ├─ config/
│  │  ├─ db/
│  │  │  ├─ db.ts
│  │  │  ├─ index.ts
│  │  │  ├─ knexfile.ts
│  │  ├─ env/
│  │  │  ├─ development.ts
│  │  │  ├─ index.ts
│  │  │  ├─ production.ts
│  │  ├─ index.ts
│  ├─ controllers/
│  │  ├─ AuthController.ts
│  │  ├─ index.ts
│  │  ├─ TransactionController.ts
│  │  ├─ WalletController.ts
│  ├─ database/
│  │  ├─ migrations/
│  │  ├─ seeders/
│  ├─ middlewares/
│  │  ├─ authMiddleware.ts
│  │  ├─ blacklistMiddleware.ts
│  │  ├─ index.ts
│  │  ├─ validationMiddleware
│  ├─ models/
│  │  ├─ index.ts
│  │  ├─ TransactionModel.ts
│  │  ├─ User.ts
│  │  ├─ WalletModel.ts
│  ├─ routes/
│  │  ├─ apiRouter.ts
│  │  ├─ AuthRoutes.ts
│  │  ├─ index.ts
│  │  ├─ TransactionRoutes.ts
│  │  ├─ WalletRoutes.ts
│  ├─ services/
│  │  ├─ AuthService.ts
│  │  ├─ index.ts
│  │  ├─ TransactionService.ts
│  │  ├─ WalletService.ts
│  ├─ utils/
│  │  ├─ blacklistChecker.ts
│  │  ├─ customError.ts
│  │  ├─ errHandler.ts
│  │  ├─ generateWalletId.ts
│  │  ├─ hashPassword.ts
│  │  ├─ interfaces.ts
│  │  ├─ omitPassword.ts
│  │  ├─ responseHandler.ts
│  │  ├─ validateSchema.ts
│  │  ├─ validator.ts
│  ├─ app.ts
│  ├─ index.ts
├─ .gitignore
├─ .prettierignore
├─ .prettierrc
├─ .sample.env
├─ LICENSE
├─ package-lock.json
├─ package.json
├─ README.md
├─ tsconfig.json

```

## Responses

The API responses are structured in JSON format. A typical successful response includes:

- **Status Code**: `200 OK`
- **Body**:
  ```json
  {
    "statusCode": 200,
    "message": "success",
    "data": {

    }
  }
  ```

A typical error response includes:

- **Status Code**: `4xx` or `5xx`
- **Body**:
  ```json
  {
    "statusCode": "error",
    "message": "Error message",
    "error": "Error type"
  }
  ```

## Error Handling

The API handles errors using standardized HTTP status codes and descriptive error messages. Common error responses include:

- **400 Bad Request**: Invalid request parameters.
- **401 Unauthorized**: Missing or invalid authentication token.
- **404 Not Found**: Resource not found.
- **500 Internal Server Error**: Unexpected server error.

## Examples

Here's an example of how to use the DemoCredit API to register a new user, fund their wallet, and retrieve transaction history.

### Register User

```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "John Doe",
    "username": "johndoe",
    "email": "john.doe@example.com",
    "password": "securepassword123"
  }'
```

### Fund Wallet

```bash
curl -X POST http://localhost:3000/api/v1/wallet/fund \
  -H 'Content-Type: application/json, Authorization: Bearer TOKEN' \
  -d '{
    "amount": 500.00
  }'
```

### Retrieve Transactions

```bash
curl -X GET http://localhost:3000/api/v1/transactions/wallet/1234567890 \
  -H 'Authorization: Bearer TOKEN'
```

## Contributing

We welcome contributions to the DemoCredit API! To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your fork.
5. Submit a pull request to the dev repository.

## Contact Us

For questions, support, or feedback, please contact us at [jhhornn](https://twitter.com/jhhornn).

---

Thank you for using the DemoCredit API! We hope this documentation helps you integrate and interact with our platform effortlessly. 🚀