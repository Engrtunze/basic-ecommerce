<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->



## ⚠️ Caution

The secret keys in this project were intentionally exposed because it's a test project. If this were a live or real project, sensitive information such as secret keys and database credentials would not be pushed with the code. Exposing such information is a bad security practice. However, for the sake of ease and to quickly test and move forward, some things were left intentionally exposed.

I always make sure to follow the best security practices and keep my sensitive information secure in real-world projects.



## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
# 🛒 Techinnover: Backend Take-Home Assessment - Basic E-Commerce System

## 📜 Summary

This assessment is designed  and developed, using NestJS. it's an e-commerce system with functionalities for managing users and products. The system will cater to three types of users: unauthenticated users, authenticated users, and admins.

## 📋 Table of Contents

- [Introduction](#-introduction)
- [Technologies Used](#-technologies-used)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Endpoints](#-api-endpoints)
  - [Authentication](#authentication)
  - [Task Management](#task-management)
- [WebSocket Integration](#-websocket-integration)
- [Data Models](#-data-models)
- [Error Handling](#-error-handling)
- [Conclusion](#-conclusion)

## 🌟 Introduction

This API provides a simple task management system with user authentication, task CRUD operations, and real-time updates via WebSockets. The application is built using NestJS and TypeORM.

## 🛠 Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **MIkroORM**: An ORM for TypeScript and JavaScript.
- **Postgres**: A relational database.
- **JWT**: JSON Web Tokens for secure user authentication.


## 🚀 Getting Started

### 📦 Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- A code editor (e.g., VSCode)
- postgres database
- mikroorm
- database explorer (pgAdmin, DBeaver, or similar)

### 🔧 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd basic-ecommerce

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

 **The application will be running at http://localhost:3000.**:

 ## 🔗 API Endpoints Documentation can be found http://localhost:3000/v1/docs#/
 ## to call an api endpoint http://localhost:3000/v1/{endpoints}
 
## 🗂 Data Models

### 👤 User Entity

- `id`: number (primary key)
- `email`: string (unique)
- `firstname`: string
- `lastname`: string
- `password`: string
- `lastlogin`: Date
- `role`: string [Admin, User]
- `isBanned`: boolean

### 🛍️ Product Entity

- `id`: number (primary key)
- `name`: string
- `price`: string
- `quantity`: string
- `description`: string
- `status`: string
- `deleted`: boolean (default: `false`)
- `user`: User (many-to-one relationship)


## 🗄️ Database Migration

To ensure the database schema is up-to-date, you need to run the database migrations. Follow these steps:

1. **Generate Migration**: If you make changes to the entities, generate a new migration.
   ```bash
   npx run mikro-orm migration:create
2. **Run Migration**: Apply the migrations to the database.
   ```bash
   npx run mikro-orm migration:up

By default, the project is configured to use PostgreSQL. Ensure your PostgreSQL server is running and the connection details in the .env file are correct.


## ❗ Error Handling

The API uses standard HTTP status codes to indicate the success or failure of an API request. Here are some common status codes you might encounter:

- **200 OK**: The request was successful.
- **201 Created**: The resource was successfully created.
- **400 Bad Request**: The request was invalid.
- **401 Unauthorized**: Authentication failed.
- **404 Not Found**: The requested resource was not found.
- **500 Internal Server Error**: An error occurred on the server.


## 🌟 Potential Improvements

While this project is a take home assessment also time limited and not phasing live users in large quantity the project follows the KISS (Keep It Simple, Stupid) principle to ensure clarity and simplicity, there are several enhancements that could be made to improve the functionality, scalability, and robustness of the system:

- **🛡️ Enhanced Security**: Implement additional security measures such as rate limiting.
- **📈 Scalability**: Use a more robust database management consider implementing database sharding or partitioning to handle larger datasets and high traffic.
- **⚡ Caching**: Integrating caching mechanisms using Redis or similar in-memory storage to optimize frequent API calls and reduce database load.
- **🔍 Advanced Filtering and Searching**:  Add more advanced filtering, searching, and sorting capabilities to the product management endpoints to improve usability, especially for users with many products.
- **🔍 Indexing**:  Adding database indexing on frequently queried fields such as email, name, and status to improve query performance.
- **📄 Pagination**:  Adding more advanced filtering, searching, and sorting capabilities to the product management endpoints to improve usability, especially for users with many products or spooling large number of data.
- **🐳 Dockerizing**: Containerize the application using Docker to simplify deployment and ensure consistency across different environments in other to ease time to run or even test the project.

These improvements could significantly enhance the functionality and user experience of a more robust ecommerce System. However, for the scope of this project, i have prioritized simplicity and core functionality to adhere to the KISS principle.

## 🧪 Testing and TDD
If there had been more time available, I would have written tests to ensure the code's reliability and maintainability. I believe in Test-Driven Development (TDD), which emphasizes writing tests before the code itself. This approach helps to identify issues early and ensures that the code meets the required specifications.

## 🚀 Conclusion

## ⚙️ environment variables
- DB_HOST=localhost
- DB_PORT=5432
- DB_USER=postgres
- DB_PASSWORD=server
- DB_NAME=basicecommerce
- API_VERSION=v1
- ADMIN_EMAIL=admin@test.com
- ADMIN_PASSWORD=admin123
- DATABASE_URL=postgresql://${DB_HOST}:${DB_PORT}/${DB_NAME}
- JWT_SECRET=ekw4jR34ARZJzDAbhP2speQVVbhK2Hun6wfHyERMRXmXcZey2hAqmpZz8Fjn5B8v

Thank you for using the Basic E-Commerce System API! I hope this documentation has provided you with all the information you need to get started and effectively use the API. If you have any questions or need further assistance, feel free to reach out.

Happy coding and testing! 🎉🚀
