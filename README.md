# Project 2 - Autoescuela
Proyecto 2 de Reboot Academy- Bloque Backend

## API Endpoints

All API Request must be prepended with `/api/`


### Authentication Endpoints

The Authentication flow for the application is:

- Step 1. User Signup/Login

METHOD | ENDPOINT         | TOKEN | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|--------------------------|-------------------------------------------------|--------------------
POST   | /auth/signup     | YES    |User Signup              | `name`, `lastName`, `email`, `password`, `address`, `dni`, `expireDate`,`birthDate`, `phone`  | `token`
POST   | /auth/login      | -     | User Login               | `email`, `password`                             | `token`

### Student Endpoints
METHOD | ENDPOINT         | TOKEN | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|--------------------------|-------------------------------------------------|--------------------
GET   | /student/     | YES     | Get all students            | -  | `profile`
GET   | /student/:id     | YES     | Get one student            | -  | `profilet`
PUT   | /student/:id     | YES     | Update student            | -  | `profile`
DELETE  | /student/:id     | YES     | Delete student             | -  | `student deleted`
GET   | /student/:studentId/messages     | YES     | Check Messages            | - | messages
POST   | /student/:studentId/messages     | YES     | Send Message              | `text`, `toTeacher`  | Message sent to `toTeacher.email`
DELETE   | /student/:studentId/messages/:id     | YES     | Delete Message              |`messageId`   | Message deleted
GET   | /student/:studentId/practice   | YES     | Get practices by student        | query: search String  | `practice`
GET   | /student/:studentId/practice/:id   | YES     | Get one practice for a student        | query: search String  | `practice`
POST   | /student/:studentId/practice/     | YES     | Create a practice         | `student`, `startTime`, `finishTime`, `date` | `practice`

### Staff Endpoints
METHOD | ENDPOINT         | TOKEN | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|--------------------------|-------------------------------------------------|--------------------
GET   | /staff/     | YES     | Get all employees             | -  | `profile`
GET   | /staff/:id     | YES     | Get One employee             | -  | `profile`
PUT   | /staff/:id     | YES     | Update employee profile              | -  | `profile`
DELETE  | /staff/:id     | YES     | Delete employee              | -  | `Employee deleted`
GET   | /staff/:staffId/messages     | YES     | Check Messages            | - | messages
POST   | /staff/:staffId/messages     | YES     | Send Message              | `text`, `toStudent`  | Message sent to `toStudent.email`
DELETE   | /staff/:staffId/messages/:id     | YES     | Delete Message              |`messageId`   | Message deleted
GET  | /staff/:staffId/practice  | YES    | Get all practices for a teacher       | query: search String  | `practice`
GET  | /staff/:staffId/practice/:id  | YES    | Get one practice for a teacher       | query: search String  | `practice`

### Topic Endpoints
METHOD | ENDPOINT         | TOKEN | DESCRIPTION              | PARAMS                                     | RETURNS
-------|------------------|-------|--------------------------|-------------------------------------------------|--------------------
GET   | /topic/     | YES     | Get all topics           | -  | `topics`
GET   | /topic/:id     | YES     | Get One topic          | query: search String  | `topic`
POST   | /topic/     | YES     | Create a Topic         | `title`, `content`  | `topic`
PUT   | /topic/:id     | YES     | Update topic              | -  | `topic`
DELETE  | /topic/:id     | YES     | Delete topic              | -  | `Topic deleted`

### Practice Endpoints

METHOD | ENDPOINT         | TOKEN | DESCRIPTION              | PARAMS                                     | RETURNS
-------|------------------|-------|--------------------------|-------------------------------------------------|--------------------
GET   | /practice/:date    | YES     | Get practices by Date         | query: search Date  | `practice`
PUT   | /practice/:id     | YES     | Update practice              | -  | `practice updated`
DELETE   | /practice/:id     | YES     | Delete practice              | -  | `practice deleted`


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

