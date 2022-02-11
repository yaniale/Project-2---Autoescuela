# Project 2 - Autoescuela
Proyecto 2 de Reboot Academy- Bloque Backend

## API Endpoints

All API Request must be prepended with `/api/`


### Authentication Endpoints

The Authentication flow for the application is:

- Step 1. User Signup/Login

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------
POST   | /auth/signup     | YES   | Admin| |User Signup              | `name`, `lastName`, `email`, `password`, `address`, `dni`, `expireDate`,`birthDate`, `phone`  | `token`
POST   | /auth/login      | -     | |User Login               | `email`, `password`                             | `token`

### User Endpoints
METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------
GET   | /user/     | YES     | Admin, Teacher |Get all users            | -  | `profile`
GET   | /user/:id     | YES     | Admin, Teacher | Get one user            | -  | `profilet`
PUT   | /user/:id     | YES     | |Update user            | -  | `profile`
DELETE  | /user/:id     | YES     | Admin |Delete user             | -  | `student deleted`
GET   | /user/:userId/messages     | YES     | | Check Messages            | - | messages
POST   | /user/:userId/messages     | YES    | | Send Message              | `text`, `toTeacher`  | Message sent to `toTeacher.email`
DELETE   | /usert/:userId/messages/:id     | YES    | | Delete Message              |`messageId`   | Message deleted
GET   | /user/:userId/practice   | YES    | | Get all practices by userId        | query: search String  | `practice`
GET   | /user/:userId/practice/:id   | YES   |  | Get one practice for a userId        | query: search String  | `practice`
POST   | /usert/:userId/practice/     | YES   | Student | Create a practice         | `student`, `startTime`, `finishTime`, `date` | `practice`

### Topic Endpoints
METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------
GET   | /topic/     | YES     | |Get all topics           | -  | `topics`
GET   | /topic/:id    | YES     | |Get One topic          |   | `topic`
POST   | /topic/     | YES     | Admin|Create a Topic         | `title`, `content`  | `topic`
PUT   | /topic/:id     | YES     | Admin |Update topic              | -  | `topic`
DELETE  | /topic/:id     | YES     | Admin |Delete topic              | -  | `Topic deleted`

### Practice Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------
GET   | /practice/    | YES   | Admin  | Get all practices         | query: search Date  | `practice`
PUT   | /practice/:id     | YES   | Admin / Teacher | Update practice              | -  | `practice updated`
DELETE   | /practice/:id     | YES     | | Delete practice              | -  | `practice deleted`


### Test Endpoints
METHOD | ENDPOINT         | TOKEN | ROLE| DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|-----|--------------------------|-------------------------------------------------|--------------------
GET   | /test/     | YES     | | Get all tests           | -  | `tests`
GET   | /test/:id     | YES     | | Get One test        | -  | `test`
POST   | /test/     | YES     | Admin |Create a test         | `questions`  | `test`
POST   | /test/:id     | YES     | | Submit answers        | `answers`  | `results`
PUT   | /test/:id     | YES     | Admin |Update test             | -  | `test`
DELETE  | /test/:id     | YES     | Admin |Delete test            | -  | `Test deleted`

### Question Endpoints
METHOD | ENDPOINT         | TOKEN |ROLE| DESCRIPTION              | PARAMS                                     | RETURNS
-------|------------------|-------|----|--------------------------|-------------------------------------------------|--------------------
GET   | /question/     | YES     | Admin | Get all questions           | -  | `questions`
GET   | /question/:id/     | YES     | Admin | Get one question           | -  | `question`
GET   | /question/      | YES | Admin | Get questions by topic      | query: search string  | `questions`
POST   | /question/     | YES     | Admin | Create a question        | `text`, `picture`, `answer`, `wrong`, `topic` | `question`
PUT   | /question/:id     | YES     | Admin |Update a question            | -  | `question`
DELETE  | /question/:id     | YES     | Admin |Delete a question            | -  | `Question deleted`
