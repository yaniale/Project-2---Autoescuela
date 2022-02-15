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
GET   | /user/:id     | YES     | Admin, Teacher | Get one user            | -  | `profile`
GET   | /user/:id/statistics     | YES     | Admin, Teacher | Get User Statistics            | -  | `max score`, `tries`
GET   | /user/:id/certificate    | YES     | Admin | Get User Medical Certificate            | -  | `static file`
GET   | /user/:id/license    | YES     | Admin | Get User Driver License            | -  | `static file`
PUT   | /user/:id     | YES     | Admin |Update user            | -  | `message`, `profile`
PATCH | /user/:id     | YES     | Admin |Delete user             | -  | `student deleted`
DELETE| /user/:studentId/teacher/:teacherId   | YES     | Admin |Assignt teacher to student           | -  | `Teacher X assigned to Y`
<!-- GET   | /user/profile/messages     | YES     | | Check Messages            | - | messages
POST   | /user/profile/messages     | YES    | | Send Message              | `text`, `toTeacher`  | Message sent to `toTeacher.email`
DELETE   | /user/profile/messages/:id     | YES    | | Delete Message              |`messageId`   | Message deleted -->
GET   | /user/profile/:id    | YES     | | Get My Profile            | - | `profile`
PATCH   | /user/profile/:id    | YES     | | Update My Profile            | - | `profile`
GET   | /user/profile/:id/photo    | YES     | | Get my Profile Picture           | - | `static file`
GET   | /user/profile/:id/certificate    | YES     |student| Get My Medical Certificate            | - | `static file`
GET   | /user/profile/:id/license    | YES     |Teacher| Get My Driving License           | - | `static file`
POST   | /user/profile/:id/password    | YES     | | Change my password            | `current password`, `new password` | `password changed`
GET   | /user/profile/:id/practice   | YES    | student| Get all my practices       |  | `practice`
POST   | /user/profile/:id/practice     | YES   | Student | Create a practice         | `startTime`, `date` | `practice created`
GET   | /user/profile/:id/statistics   | YES   |  | Get my statistics       |   | `statistics`
DELETE |  /user/profile/:userId/practice/:id     | YES   | Student | Delete own practice         |  | `practice deleted`

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
GET   | /test/:id/statistics     | YES     | | Get test statistics       | -  | `test statistics`
POST   | /test/     | YES     | Admin |Create a test         | `questions`  | `test`
POST   | /test/:id     | YES     | | Submit answers        | `answers`  | `results`
PUT   | /test/:id     | YES     | Admin |Update test             | -  | `test updated`
DELETE  | /test/:id     | YES     | Admin |Delete test            | -  | `Test deleted`

### Question Endpoints
METHOD | ENDPOINT         | TOKEN |ROLE| DESCRIPTION              | PARAMS                                     | RETURNS
-------|------------------|-------|----|--------------------------|-------------------------------------------------|--------------------
GET   | /question/     | YES     | Admin | Get all questions           | -  | `questions`
GET   | /question/:id/     | YES     | Admin | Get one question           | -  | `question`
GET   | /question/      | YES | Admin | Get questions by topic      | query: search string  | `questions`
POST   | /question/     | YES     | Admin | Create a question        | `text`, `picture`, `options`, `wrong`, `topic` | `question`
PUT   | /question/:id     | YES     | Admin |Update a question            | -  | `question updated`
DELETE  | /question/:id     | YES     | Admin |Delete a question            | -  | `Question deleted`
