# Task Grading Hub

## Idea

The Task Grading Hub is a REST API designed to streamline the process of collecting, grading, and providing feedback on programming tasks submitted by students. Dr. Hossam, as the administrator, has exclusive access to add new tasks and assign grades. Students, on the other hand, can create accounts, log in, and submit their tasks in PDF format.

## Architecture

The backend services are responsible for handling authentication, task management, grading, and user management. These services are built using Node.js and Express.js, providing a RESTful API for communication with the frontend client.

MongoDB is used as the database management system to store user data, task submissions, grades, and feedback.

## Roles

There are two types of users who will have access to the API:

* **Student**: can submit tasks within their deadline and check the grades after a task is graded. doesn't have access to other students' grades.
* **Admin**: can publish new tasks for submission, view submitted tasks and grade them.

## Authentication and Authorization

* The API utilizes JSON Web Tokens to log users in and control their authorities. In case of login, the user receives a JWT access token. _(implementing refresh token is optional but recommended)_
* Passwords are not stored as plain text (hashed).
* If a client is not logged in, it only has access to login and register endpoints. If an unauthorized client tries to access any other endpoint, a `401 UNAUTHORIZED` status should be sent.
* If a user tried to access a resource which they don't have access to, a `403 FORBIDDEN` status should be sent.

## Validation

* Server-side validation should be performed to all the incoming requests, refusing any invalid requests with `400 BAD REQUEST` status.

* Make sure that the task files are submitted in `PDF` format only.

## Testing

Unit tests are required to be implemented and inclusive to cover the whole workflow of the application. They can be performed by `jest`, `mocha` or any relevant tool.


## Documentation

The API should be properly documented that developers are able to use it without having to explore the source code. You can use any tool for API documentation, but **Swagger UI** is recommended.

## Project Criteria

- [ ] The application runs without any crashes or errors.
- [ ] The application is built on a REST API architecture. All endpoints respond with JSON content.
- [ ] Server-side validation is implemented to all incoming requests.
- [ ] Authentication and protecting routes are implemented as described.
- [ ] All unit tests run without any failures.
- [ ] API endpoints are well-documented using Swagger or a similar tool.

