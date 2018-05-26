import React from 'react';
import { NavLink } from 'react-router-dom'

import jss from 'jss';
import preset from 'jss-preset-default';

// One time setup with default plugins and settings.
jss.setup(preset());

const styles = {
  brand: {
    color: "white",
    fontFamily: "Oswald, sans-serif",
    fontSize: "1.2em",
    "&:hover": {
      textDecoration: "none",
      color: "#d52a2a",
    }
  },
  icons: {
    color: "white",
    fontSize: "1.3rem",
    marginRight: "0.65rem",
    "&:hover": {
      color: "#d52a2a",
    }
  },
  brandContainer: {
    padding: "0.5rem 1rem"
  },
  navContainer: {
    backgroundColor: '#232833',
  },
  navLinksContainer: {
    backgroundColor: '#d52a2a',
    textAlign: "center"
  },
  navLink: {
    display: "block",
    padding: ".5rem 1rem",
    fontFamily: "Work Sans, sans-serif",
    color: "white",
    "&:hover": {
      textDecoration: "none",
      fontWeight: "bold",
      color: "white",
      backgroundColor: "#9c1f1f"
    }
  },
  navIcons: {
    fontSize: "1.15rem"
  },
  selected: {
    backgroundColor: "#9c1f1f",
    fontWeight: "bold",
    '&:after': {
      content: '"\\25BC"',
      height: "0",
      left: "auto",
      right: "50%",
      color: "#9c1f1f",
      display: "block"
    }
  },
  isMobile: {
    display: "none"
  },    
};



const { classes } = jss.createStyleSheet(styles).attach();

class NavBar extends React.Component {
	render() {
		return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink exact to="/" className={"navbar-brand"}>
          <span>PRCores</span>
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink exact to="/" className={"nav-link"}>
                <span>Home</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact to="/cores" className={"nav-link"}>
                <span>Cores</span>
              </NavLink>                            
            </li>
            <li className="nav-item">
              <NavLink exact to="/surveys" className={"nav-link"}>
                <span>Surveys</span>
              </NavLink>                            
            </li>            
          </ul>
        </div>
      </nav>      
		)
	}
}

export default NavBar;