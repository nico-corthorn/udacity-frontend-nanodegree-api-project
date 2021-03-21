# Weather-Journal App Project

## Overview  

In this project I created an asynchronous web app that uses Web API and user data to dynamically update the UI.  

The final page runs with a node js server that receives and sends data from and to the client, while the client retrieves weather data from a public API.

## Instructions  

Installation setup is as follows:
- Clone the github repo into a local repository.
- Install node js.
- In the command line install the dependencies by running the following lines of code:
  * npm install express
  * npm install body-parser
  * npm install cors
  * node server.js
- In your browser (Google Chrome was tested only) go to: localhost:8000
- The interaction with the page should be more intuitive:
  * Type a U.S. zip code
  * Type your feelings :)
  * Click the Generate button
  * See how each new entry is shown in the Previous Entries table, including the temperature of that location at the moment.

## Code Structure  

- `server.js`: server-side Javascript code. Initializes server and sets up APIs to receive and send data from and to the client. The server stores the data sent from the client.
- `website/app.js`: client-side Javascript code. Initializes app in the browser of the user. Manages objects in the DOM and sends/receives data to/from the server.
- `website/index.html`: Only HTML file with the content shown to the user.
- `website/style.css`: Only CSS file for styling the previous HTML file.
