import { connect } from "react-redux";
import React from "react";

const CREATORS = [
  {
    name: "Jonathan",
    role: "Project Lead, Frontend Developer",
    git: "https://github.com/JonJWong/",
    linked: "https://www.linkedin.com/in/jonjwong/",
    angel: "https://angel.co/u/jonathan-wong-75",
    img: "https://avatars.githubusercontent.com/u/96433015",
    desc: "As leader of the team, Jonathan coordinated efforts throughout the team, and designated roles and daily work for the team members, while also advising the team on what direction to continue their efforts in. His primary focus was integrating the Google Maps API, and ensuring the desired functionality was provided in the event forms. He was also involved with styling the site, and guided the team on how the site should look and feel overall."
  },
  {
    name: "Nick",
    role: "Frontend Developer, Styling Specialist",
    git: "https://github.com/njpietrow/",
    linked: "https://www.linkedin.com/in/nickpietrow/",
    angel: "https://angel.co/u/nick-pietrow",
    img: "https://avatars.githubusercontent.com/u/25106777",
    desc: "Nick was in charge of most of the styling across the site, and his primary focus was on the Events and their show pages. He also integrated threads and comments within those pages, and coordinated with the back-end team to structure the databases and responses according to the team's needs. Thanks to his efforts, the site looks beautiful and the interface is smooth and intuitive.",
  },
  {
    name: "Cody",
    role: "Backend Developer, Database Manager",
    git: "https://github.com/CodyDegraffeNiles",
    linked: "",
    angel: "",
    img: "https://avatars.githubusercontent.com/u/79245580",
    desc: "Cody took the lead on the back-end development and worked with Kevin to create a robust database with proper validations, and helped the API in which the front end would interact with the database. He played a crucial role in making sure that everything ran smoothly, and coordinated with the front-end team to make sure that information was structured appropriately, and that the server and database would accept requests and respond accordingly.",
  },
  {
    name: "Kevin",
    role: "Backend Developer, Database Manager",
    git: "https://github.com/KevinCh28",
    linked: "",
    angel: "",
    img: "https://avatars.githubusercontent.com/u/61332776",
    desc: "Kevin set his sights on the back-end data validations, and played a critical part in making sure the database does not get corrupted with erroneous information that a user might send back. He worked closely with Cody to make sure that the database and it's information were robust. With his thorough approach, he also helped Cody with the site's error handling, making sure that the user receives proper feedback if any errors occured with their inputs.",
  }
]

class Creators extends React.Component {
  renderCreators() {
    return (
      <div id="creator-tile-wrapper">
        {CREATORS.map(creator => {
          return (
            <div className="creator-tile" key={creator.desc}>
              <div>
                <div className="creator-head">
                  <h3>{creator.name}</h3>
                  <h4>{creator.role}</h4>
                </div>
                <div className="creator-photo-wrapper">
                  <img src={creator.img} alt={creator.name + "image"} />
                </div>
              </div>
              <p className="creator-desc">{creator.desc}</p>
              <div className="creator-links">
                <a href={creator.git} className="creator-git" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-github"></i>
                </a>
                <a href={creator.angel} className="creator-angel" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-angellist"></i>
                </a>
                <a href={creator.linked} className="creator-linked" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    const name = this.props.currentUser.username;

    return (
      <div id="creator-wrapper">
        <div id="creator-container">

          <div id="creator-content">
            <h3 id="creator-content-header">
              Hoppers was a collaboration between four extremely talented developers
            </h3>

            <div id="creator-content-body">
              {this.renderCreators()}
              <div id="creator-content-footer">
                This team worked extremely hard over the course of a week to create Hoppers! We all had to overcome the challenge of learning the MERN (MongoDB, Express, React.js, Node.js) Stack, while developing this site. None of us had any exposure to Express, or MongoDB prior to developing this, and although the roles are listed here, we all helped each other across the board. Every team member contributed to every component in some way.
              </div>
            </div>
          </div>
        </div>
        <div id="thankyou">Thank you for checking out Hoppers, {name}!</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Creators);