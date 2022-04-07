# Welcome to Hoppers!

Hoppers is an app where users can design their plan for the perfect night out with friends[^1].

Users will be able to design and customize their own story book event (could be anything from a pub crawl to a nice walk). After creating the perfect itinerary, those users can then invite other users to join their path of adventure and excitement.

Once a user has joined an event, they can chat with each other to discuss any updates or plans.

Additionally, event attendees can post about the night's events on the main event page, so they can have a history of their glorious deeds. Furthermore, event-owners can make their “plan’ public and have other users join their night out or they can join other “public” plans.

<h2 id="table-of-contents">Table of Contents</h2>

  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Future Plans](#future-plans)

<h2 id="features">Features</h2>

### Event Creation

Users can create events and select points of interest to include along their event-route.

IMAGE HERE

These events are then saved to the database, along with all their points of interest.
These points of interest are then turned into a route on the map, where the general path is shown.

CODE SNIPPET HERE?


### Event Editing, Point-of-Interest route

Within the route of points of interest, the event owner can create new points of interest in the route, and then submit the changes through a form.

IMAGE HERE

Since the route and points of interest go in order, the route will be drawn according to the changes.


### Users can also browse all public events

The main page will display all events currently open to the public, where anyone can join in to make new social connections or just have a nice day with the other attendees.

IMAGE HERE

<h2 id="technologies-used">Technologies Used</h2>

- __Front End__: React.js, Redux

- __Back End__: Express, MongoDB Atlas for database

- __Other__: Node.JS environment, Google Maps JavaScript API

- __Hosting__: Hoppers is hosted on heroku.

<h2 id="future-plans">Future Plans</h2>

Users would be able to privatize / create private events.
  - These events would be able to be shared via messages sent to another user's inbox.
  - Only Attendees would be able to see and access these events.

Users would be able to direct-message each other in real-time.
  - Web socket implementation, for individual and group-DMs (event participants)

<h2>Credit<h2>

### A team of four extremely talented and hard-working individuals put this together[^2]!

  - <a href="https://github.com/JonJWong" target="_blank" rel="noopener noreferrer">Jonathan</a>: Team leader, and project coordinator / front-end designer (React.js).
  - <a href="https://github.com/njpietrow" target="_blank" rel="noopener noreferrer">Nick</a>: Front-end designer, component manager / creator (React.js).
  - <a href="https://github.com/CodyDegraffeNiles" target="_blank" rel="noopener noreferrer">Cody</a>: Back-end engineer (MongoDB / Express integration).
  - <a href="https://github.com/KevinCh28" target="_blank" rel="noopener noreferrer">Kevin</a>: Back-end engineer (MongoDB / Express integration).

[^1]: Please note all features subject to changes. Hoppers can not guarantee the perfect night out. Also if you have a substance abuse problem please seek assistance by dialing a the SAMHSA hotline. 1-800-662-HELP

[^2]: Although the roles are written here, we all actively helped and participated in all aspects of the app, coordinating workflow between front-end and back-end making sure things went smooth, and features were pushed out with efficiency.
