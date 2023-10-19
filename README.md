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
- [Testing with Postman](#testing-with-postman)
- [Notes](#notes)

## Project Overview

- **Language:** TypeScript
- **Framework:** Node.js and Express.js
- **Database:** AWS DynamoDB

## Project Structure

Project has been packaged by Feature.

## Getting Started

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

4. Deploy DynamoDB to your AWS account:

   ```bash
   npm install serverless --save-dev
   sls login
   sls deploy
   ```

5. Start the application:

   ```bash
   npm run build
   npm start
   ```

6. For development run:

   ```
   npm run dev
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
- `hash`: User's hashed password.

## User Entity

The "Book" entity represents user data with the following properties:

- `id`: Book ID (UUID).
- `name`: Book's title.
- `pages`: Books's pages count.

## API Endpoints

The project includes the following API endpoints:

- `POST /api/v1/auth/signup`: Signup a new user.
- `POST /api/v1/auth/login`: Login and obtain an access token.
- `POST /api/v1/auth/reset-password`: Request a password reset.
- `GET /api/v1/users`: Get a list of all users.
- `GET /api/v1/users/:id`: Get a user by ID.
- `GET /api/v1/users/`: Get all users.
- `POST /api/v1/users`: Create a new user.
- `PUT /api/v1/users/:id`: Update a user by ID.
- `DELETE /api/v1/users/:id`: Delete a user by ID.
- `GET /api/v1/books/:id`: Get a book by ID.
- `GET /api/v1/books/` Get all books.
- `POST /api/v1/books`: Create a new book.
- `PUT /api/v1/books/:id`: Update a book by ID.
- `DELETE /api/v1/books/:id`: Delete a book by ID.

## Security Considerations

## Testing with Postman

The project includes Postman collections (`postman/`) to test all API endpoints, including positive and negative test cases.

1. Import the Postman collections into Postman.

2. Use the collections to send requests and test the API endpoints.

# Notes

Special security concerns were ommited on puropus, like token invalidation after password change.
Search endpoint was ommited as dynamoDB specificity. There is no search option, you can querry only on certain index.
There is very little of input validation as it was not a requirment of the task, so to recieve desired results, input correct data. Also there is no check if id mach

# Notes to the project

In my honest opinion using DB hosten on docker container would also be a intersting opion and allow for usage of ORM likes, and aslo enabling search endopint.
