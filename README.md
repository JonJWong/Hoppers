# Welcome to Hoppers!

Hoppers is an app where users can design their plan for the perfect night out with friends[^1].

Users will be able to design and customize their own story book event (could be anything from a pub crawl to a nice walk). After creating the perfect itinerary, other users can join in on the fun!
Once a user has joined an event, they can chat with each other to discuss any updates or plans on the event page.

<a href="https://gohoppers.herokuapp.com/#/" rel="noopener noreferrer" target="_blank">Live link!</a>

<h2 id="table-of-contents">Table of Contents</h2>

  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Future Plans](#future-plans)

<h2 id="features">Features</h2>

### Event Creation

Users can create events and select points of interest to include along their event-route.

These events are then saved to the database, along with all their points of interest.
These points of interest are then turned into a route on the map, where the general path is shown.

<p align="center">
  <img src="https://media.giphy.com/media/rb46Dl0AReltUxR5ED/giphy.gif"
  alt="event-create-gif"></img>
</p>

```javaScript
drawLines() {
  const hour = new Date().getHours();
  let color;
  if (hour < 7 || hour > 17) {
    color = "#eeeeee"
  } else {
    color = "black"
  }

  const path = this.markers.map(poi => poi.location)
  const line = new window.google.maps.Polyline({
    path: path,
    geodesic: true,
    strokeColor: color,
    strokeOpacity: 1.0,
    strokeWeight: 2
  })

  line.setMap(this.map)
}

placeMarkers() {
  this.markers.forEach((location, i) => {
    this.placeMarker(location, i);
  })
  this.drawLines();
}

placeMarker(location, i) {
  // ... code to adjust marker options

  const marker = new window.google.maps.Marker({
    position: position,
    map: map,
    label: {
      text: `#${i + 1}`,
      color: color
    },
    icon: icon
  })

  // ... code to save marker reference to component state for manipulation
}
```

### Event Editing, Point-of-Interest route

Within the route of points of interest, the event owner can create new points of interest in the route, and then submit the changes through a form.

Since the route and points of interest go in order, the route will be drawn according to the changes.

<p align="center">
  <img src="https://media.giphy.com/media/hJai6xoHx2C7KHFKic/giphy.gif"
  alt="event-poi-gif"></img>
</p>

```javaScript
// helper to take in markers from map
// within EventForm(s)
accept(key, value) {
  this.setState({ [key]: value })
}

// helper to pass points of interest between EventForm(s) and Map
// within FunctionalMap
sendPois(e) {
  e.preventDefault();
  const points = this.props.event.PointsOfInterest;

  Object.values(this.markers).forEach((marker, i) => {
    const pos = {};
    const newPoint = points[i] || {};
    pos["lat"] = marker.position.lat();
    pos["lng"] = marker.position.lng();
    newPoint["location"] = pos;
    points[i] = newPoint
  })

  this.props.accept("PointsOfInterest", points)
}
```

### Users can also browse all public events

The main page will display all events currently open to the public, where anyone can join in to make new social connections or just have a nice day with the other attendees.

<p align="center">
  <img src="https://media.giphy.com/media/xs3l47FQu2yrMSgEaI/giphy.gif"
  alt="event-index-gif"></img>
</p>

After finding an event that interests them, Users are able to RSVP to place themselves into the event's attendee list.

<p align="center">
  <img src="https://media.giphy.com/media/LS4zK20qBpOypG65Ub/giphy.gif"
  alt="event-join-gif"></img>
</p>

On their user profile, the user will be shown a list of all events they're currently hosting, and another list of events they're currently an attendee.

### Conversation Threads

Once a user joins an event, they can converse with other users through the threads at the bottom of the event page! Users can edit, and delete their own comments within a thread, but only the event owners can create new threads.

<p align="center">
  <img src="https://media.giphy.com/media/MZ1HdNkY0AIB2BSGBK/giphy.gif" 
  alt="comment-thread-gif"></img>
</p>

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

  - <a href="https://github.com/JonJWong" target="_blank" rel="noopener noreferrer">Jonathan</a>: Project Lead / Frontend developer (React.js, Google Maps API).
  - <a href="https://github.com/njpietrow" target="_blank" rel="noopener noreferrer">Nick</a>: Frontend designer, Styling Specialist (React.js).
  - <a href="https://github.com/CodyDegraffeNiles" target="_blank" rel="noopener noreferrer">Cody</a>: Backend engineer (MongoDB / Express integration).
  - <a href="https://github.com/KevinCh28" target="_blank" rel="noopener noreferrer">Kevin</a>: Backend engineer (MongoDB / Express integration).

[^1]: Please note all features subject to changes. Hoppers can not guarantee the perfect night out. Also if you have a substance abuse problem please seek assistance by dialing a the SAMHSA hotline. 1-800-662-HELP

[^2]: Although the roles are written here, we all actively helped and participated in all aspects of the app, coordinating workflow between front-end and back-end making sure things went smooth, and features were pushed out with efficiency.
