import React from 'react';

class Navbar extends React.Component {
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
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Budget</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#purchases">Purchases</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Analysis</a>
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
