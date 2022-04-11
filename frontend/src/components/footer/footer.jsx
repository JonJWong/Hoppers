import React from "react";
import { Link } from "react-router-dom";

const CREATORS = {
  jonathan: {
    name: "Jonathan",
    handle: "JonJWong",
    git: "https://github.com/JonJWong/",
    angel: "https://angel.co/u/jonathan-wong-75/",
    linked: "https://www.linkedin.com/in/jonjwong/"
  },
  nick: {
    name: "Nick",
    handle: "njpietrow",
    git: "https://github.com/njpietrow/",
    angel: "https://angel.co/u/nick-pietrow",
    linked: "https://www.linkedin.com/in/nickpietrow/"
  },
  cody: {
    name: "Cody",
    handle: "CodyDegraffeNiles",
    git: "https://github.com/CodyDegraffeNiles",
    angel: "https://angel.co/u/cody-degraffe-niles",
    linked: "https://www.linkedin.com/in/cody-degraffe-niles-366310235/"
  },
  kevin: {
    name: "Kevin",
    handle: "KevinCh28",
    git: "https://github.com/KevinCh28",
    angel: "https://angel.co/u/kevin-chen-154",
    linked: "https://www.linkedin.com/in/kevin-chen-b6843213a/"
  }
}

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      user: null
    }

    this.closeModal = this.closeModal.bind(this);
    this.userOpen = this.userOpen.bind(this);
    this.renderModal = this.renderModal.bind(this);
  }

  closeModal() {
    this.setState({
      modal: false,
      user: null
    })
  }

  userOpen(user) {
    this.setState({
      modal: true,
      user: user
    })
  }

  renderModal() {
    const creator = CREATORS[this.state.user];

    if (this.state.modal) {
      return (
        <div id="footer-modal">
          <div id="footer-modal-content">
            <h3>{creator.name}
              <p>{creator.handle}</p>
            </h3>
            <ul>
              <li>
                <a href={creator.git} className="footer-git" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-github"></i><div>Github</div>
                </a>
              </li>
              <li>
                <a href={creator.angel} className="footer-angel" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-angellist"></i><div>AngelList</div>
                </a>
              </li>
              <li>
                <a href={creator.linked} className="footer-linked" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-linkedin"></i><div>LinkedIn</div>
                </a>
              </li>
            </ul>
          </div>
          <div id="footer-modal-block" onClick={() => this.closeModal()}></div>
        </div>
      )
    }
  }

  render() {
    return (
      <div id="footer-wrapper">
        <div id="footer-container">
          <div className="footer-list">
            <Link
              to="/creators">
              <h3>About Us</h3>
            </Link>
          </div>
          <div className="footer-list">
            <h3>Technologies Used</h3>
            <ul>
              <li>
                <a href="https://www.mongodb.com/atlas/database"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-mongo">
                    MongoDB Atlas
                  </a>
              </li>
              <li>
                <a href="https://expressjs.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-express">
                    Express
                  </a>
              </li>
              <li>
                <a href="https://reactjs.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-react">
                    <div>React</div> / <div>Redux</div>
                  </a>
              </li>
              <li>
                <a href="https://nodejs.org/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-node">
                    Node.js
                  </a>
              </li>
              <li>
                <a href="https://developers.google.com/maps/documentation/javascript/?_gl=1*ieznnv*_ga*MjA3Njk1NTYyNC4xNjQ5NTE2OTgw*_ga_NRWSTWS78N*MTY0OTUxNjk3OS4xLjEuMTY0OTUxNzAxMy4w"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-maps">
                    Google Maps JavaScript API
                  </a>
              </li>
            </ul>
          </div>
          <div className="footer-list">
            <h3>Contact Links</h3>
            {Object.keys(CREATORS).map(creator => {
              const person = CREATORS[creator]
              return (
                <div
                  className="footer-creator-link"
                  key={CREATORS[creator].name}
                  onClick={() => this.userOpen(creator)}>
                    {person.name}
                </div>
              )
            })}
          </div>
        </div>
          {this.renderModal()}
      </div>
    )
  }
}

export default Footer;