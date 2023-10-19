# Skeleton Challenge

Welcome to the Skeleton Challenge project. This is a simple skills evaluation project that demonstrates how to build a Node.js backend application with TypeScript and AWS DynamoDB. The project includes user authentication, CRUD operations for a "User" entity, and Postman collections for testing.

## Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Authentication Flow](#authentication-flow)
- [User Entity](#user-entity)
- [API Endpoints](#api-endpoints)
- [Testing with Postman](#testing-with-postman)
- [Contributing](#contributing)

## Project Overview

- **Language:** TypeScript
- **Framework:** Node.js and Express.js
- **Database:** AWS DynamoDB

## Project Structure

The project follows a structured directory layout:

- `src/`: Contains the application source code.
  - `controllers/`: Contains controllers for handling HTTP requests.
  - `models/`: Contains the data models for the application.
  - `routes/`: Defines API routes.
  - `services/`: Implements business logic.
- `dist/`: Output directory for compiled TypeScript code.
- `postman/`: Includes Postman collections for testing endpoints.
- `tsconfig.json`: TypeScript configuration file.
- `package.json`: Project dependencies and scripts.
- `README.md`: This documentation file.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/DominikIlski/skeleton
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up AWS credentials in your environment or AWS CLI configuration.

4. Deploy dynamoDB to your AWS account

   ```bash
   npm install serverless --save-dev
   sls login
   sls deploy
   ```

5. Start the application:
   ```bash
   npm start
   ```

## Authentication Flow

The project includes an authentication flow with the following features:

- Signup: Register a new user.
- Login: Authenticate a user and issue an access token.
- Password Reset: Reset a user's password with a secure token.

## User Entity

The "User" entity represents user data with the following properties:

- `id`: User ID (UUID).
- `username`: User's username.
- `email`: User's email address.
- `password`: User's hashed password.

## API Endpoints

The project includes the following API endpoints:

- `POST /api/v1/auth/signup`: Signup a new user.
- `POST /api/v1/auth/login`: Login and obtain an access token.
- `POST /api/v1/auth/reset-password`: Request a password reset.
- `POST /api/v1/auth/reset-password/:token`: Reset the password with a valid token.
- `GET /api/v1/users`: Get a list of all users.
- `GET /api/v1/users/:id`: Get a user by ID.
- `POST /api/v1/users`: Create a new user.
- `PUT /api/v1/users/:id`: Update a user by ID.
- `DELETE /api/v1/users/:id`: Delete a user by ID.

## Testing with Postman

The project includes Postman collections (`postman/`) to test all API endpoints, including positive and negative test cases.

1. Import the Postman collections into Postman.

2. Use the collections to send requests and test the API endpoints.

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.

2. Create a new branch for your feature or bug fix.

3. Make your changes and commit them.

4. Push your changes to your fork.

5. Create a pull request with a clear description of your changes.

Thank you for contributing to the project!


# Notes
Special security concerns were ommited on puropus, like token invalidation after password change.