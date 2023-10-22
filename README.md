# Skeleton Challenge

Welcome to the Skeleton Challenge project. This is a simple skills evaluation project that demonstrates how to build a Node.js backend application with TypeScript and AWS DynamoDB. The project includes user authentication, CRUD operations for a "Book" entity, and Postman collections for testing.

## Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Authentication Flow](#authentication-flow)
- [User Entity](#user-entity)
- [Book Entity](#book-entity)
- [API Endpoints](#api-endpoints)
- [Security Considerations](#security-considerations)
- [Testing with Postman](#testing-with-postman)
- [Notes](#notes)

## Project Overview

- **Language:** TypeScript
- **Framework:** Node.js and Express.js
- **Database:** AWS DynamoDB

## Project Structure

The project has been organized by feature.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/DominikIlski/skeleton
   ```

2. Install dependencies:

   ```bash
   npm install -g typescript
   npm install
   ```

3. Set up AWS credentials in your environment or AWS CLI configuration.

4. Deploy DynamoDB to your AWS account using the Serverless Framework:

   ```bash
   npm install serverless --save-dev
   sls login
   sls deploy
   ```

5. Copy `.env.example` file to `.env` file and populate it with required values.

6. Start the application:

   ```bash
   npm run build
   npm start
   ```

7. For development purposes, run:

   ```
   npm run dev
   ```

## Authentication Flow

The project includes an authentication flow with the following features:

- Signup: Register a new user.
- Login: Authenticate a user and issue an access token.
- Password Reset: Reset a user's password with a secure token.

To ensure security, make sure to configure the `JWT_SECRET` in your environment.

## User Entity

The "User" entity represents user data with the following properties:

- `id`: User ID (UUID).
- `username`: User's username.
- `email`: User's email address.
- `hash`: User's hashed password.

## Book Entity

The "Book" entity represents book data with the following properties:

- `id`: Book ID (UUID).
- `name`: Book's title.
- `pages`: Books' page count.

## API Endpoints

The project includes the following API endpoints for user and book management:

### User Management

- `POST /api/v1/auth/signup`: Signup a new user.
- `POST /api/v1/auth/login`: Login and obtain an access token.
- `POST /api/v1/auth/reset-password`: Request a password reset.
- `GET /api/v1/users`: Get a list of all users.
- `GET /api/v1/users/:id`: Get a user by ID.
- `POST /api/v1/users`: Create a new user.
- `PUT /api/v1/users/:id`: Update a user by ID.
- `DELETE /api/v1/users/:id`: Delete a user by ID.

### Book Management

- `GET /api/v1/books/:id`: Get a book by ID.
- `GET /api/v1/books/`: Get all books.
- `POST /api/v1/books`: Create a new book.
- `PUT /api/v1/books/:id`: Update a book by ID.
- `DELETE /api/v1/books/:id`: Delete a book by ID.

## Security Considerations

Please note that certain security considerations, such as token invalidation after password changes and robust input validation, have been omitted for the sake of simplicity. In a production environment, it's vital to address these concerns to enhance the security of the application.

## Testing with Postman

The project includes Postman collections (`postman/`) to test all API endpoints, including positive and negative test cases. To test the API endpoints:

1. Import the Postman collections into Postman.

2. Use the collections to send requests and test the API endpoints.

## Notes

A few additional points to consider:

- Search functionality is not provided in the project due to DynamoDB limitations.
- Input validation is minimal, so ensure that you provide correct data for desired results.
- Route protection may be adjusted based on your specific requirements.
- Classes like router / controller / service could be generic, the similar way as the DynamoDbTable is, but they are not to show the stucture of the code and the dependencies that could be made. 

## Environment Configuration

Before running the project, make sure to configure the environment variables. Copy `.env.example` a `.env` file and populate it with the following:

```env
accessKeyId=YOUR_AWS_ACCESS_KEY_ID
secretAccessKey=YOUR_AWS_SECRET_ACCESS_KEY
region=YOUR_AWS_REGION
JWT_SECRET=YOUR_JWT_SECRET
```

This configuration file contains sensitive information, so keep it secure and do not expose it in public repositories.
