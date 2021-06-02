import React from 'react';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.showHamburgerMenu = this.showHamburgerMenu.bind(this);
  }

  handleClick() {
    if (!this.state.isClicked) {
      this.setState({
        isClicked: true
      });
    } else if (this.state.isClicked) {
      this.setState({
        isClicked: false
      });
    }
  }

  showHamburgerMenu() {
    if (this.state.isClicked) {
      return (
        <div className="hamburger-menu-nav">
          <ul>
            <li className="hamburger-nav-item">
              <a className="hamburger-nav-link" href="#categories">Categories</a>
            </li>
            <li className="hamburger-nav-item">
              <a className="hamburger-nav-link" href="#purchases">Purchases</a>
            </li>
            <li className="hamburger-nav-item">
              <a className="hamburger-nav-link" href="#analysis">Analysis</a>
            </li>
            <li className="hamburger-nav-item">
              <a className="hamburger-nav-link" href="#">Alerts</a>
            </li>
            <li className="hamburger-nav-item">
              <a className="hamburger-nav-link" href="#">Notes</a>
            </li>
          </ul>
        </div>
      );
    }
  }

  render() {
    return (

      <div className="row">

        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="col-1">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">Budget-Pal</a>
            </div>
          </div>

          <div className="col-2">
            <div className="nav-menu-container">

              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span onClick={this.handleClick} className="navbar-toggler-icon"></span>
                <div>
                  {this.showHamburgerMenu()}
                </div>
              </button>
            </div>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#categories">Categories</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#purchases">Purchases</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#analysis">Analysis</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Alerts</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Notes</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

      </div>
    );
  }
}

export default Navbar;
