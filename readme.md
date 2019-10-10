# The Step Project Notes
---

### Motivation
---

Our team would like to practise within building tool similar to Google Keep at FrontEnd and BackEnd as well.

### Installation
---

Run `npm run start` for running development environment.


### Technologies/framework were used
---

- Bootstrap
- Vanilla Java Script
- EJS HTML-template
- Node JS (Express JS)
- Task Runner (npm) and node modules
- MongoDB
- Github
- Heroku


### Location
---

Project is located at Heroku server: https://notes-lists.herokuapp.com/


### Tasks for each member of team
---

1.  Anton Degnera @antilik

- Front End:
  - Basic architecture of application.
  - BackEnd HTML template of main page for showing all Notes with possibility to click and look at some particular Note.
- BackEnd:
  - Basic architecture of application and connection all necessary modules.
  - Route `GET '/'`, which will return main HTML page with all Notes on it.

2. Artem Kysil @tyomakysil

- Front End:
  - BackEnd HTML template of page for creating a Note.
  - Sending POST request to the server for creating a Note. The server has to redirect to the main page after response.
  - BackEnd HTML template with detail information of a Note. It has to be possibility to edit/delete a Note.
  - Sending PUT request to the server with edited Note. A User has to be redirected to the main page by server after response.
  - Sending DELETE request to the server for deleting a Note. A User has to be redirected to the main page by the server after response.
- BackEnd:
  - The route GET `/notes`, which will return HTML page with the form for creating a Note.
  - The route GET `/notes/${id}`, which will return HTML page of a Note with details.
  - The route POST `/api/notes` for creating a Note.
  - The route PUT `/api/notes/${id}` for editing a Note.
  - The route DELETE `/api/notes/${id}` for deleting a Note.

3. Kate Petrova @sve4a

- Front End:
  - BackEnd HTML template of a page for creating a List.
  - Sending POST request to the server for creating a List. The server has to redirect to the main page after response.
  - BackEnd HTML template with detail information of a List. It has to be possibility to edit/delete a List.
  - Sending PUT request to the server with edited List. A User has to be redirected to the main page by server after response.
  - Sending DELETE request to the server for deleting a List. A User has to be redirected to the main page by the server after response.
- BackEnd:
  - The route GET `/lists`, which will return HTML page with the form for creating a List.
  - The route GET `/lists/${id}`, which will return HTML page of a List with details.
  - The route POST `/api/lists` for creating new List with tasks and taking into account the fact that quantity of position in the List is unlimited and undefined.
  - The route PUT `/api/lists/${id}` for editing a List.
  - The route DELETE `/api/lists/${id}` for deleting a List.


### Credits
---

Anton Degnera (@antilik), Artem Kysil (@tyomakysil), Kate Petrova (@sve4a)

Link: <https://github.com/antilik/step-project-notes>
