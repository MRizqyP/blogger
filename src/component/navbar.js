import React from "react";
import "../assets/css/bootstrap.min.css";

import { Link } from "react-router-dom";
// import "../assets/css/style.css";

function App() {
  const token = JSON.parse(
    sessionStorage.getItem("persisted_state_hook:token")
  );

  function logout() {
    window.location.replace("/");
    sessionStorage.setItem("persisted_state_hook:token", "");
    sessionStorage.clear();
  }

  // console.log(token.token.admin);

  if (!token) {
    return (
      <header class="header_area">
        <div className="main-menu">
          <nav class="navbar navbar-expand-lg navbar-light">
            <a class="navbar-brand" href="#">
              <img src="/logokinyot.png" alt="logo" width="60%" />
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <div class="mr-auto"></div>
              <ul class="navbar-nav">
                <Link to="/">
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      Home <span class="sr-only">(current)</span>
                    </a>
                  </li>
                </Link>
                <Link to="/login">
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      LOGIN
                    </a>
                  </li>
                </Link>
                <Link to="/register">
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      REGISTER
                    </a>
                  </li>
                </Link>
                <Link to="/artikel">
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      ARTICLE
                    </a>
                  </li>
                </Link>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    );
  } else if (token.token.admin === true) {
    return (
      <header class="header_area">
        <div className="main-menu">
          <nav class="navbar navbar-expand-lg navbar-light">
            <a class="navbar-brand" href="#">
              <img src="/logokinyot.png" alt="logo" width="60%" />
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <div class="mr-auto"></div>
              <ul class="navbar-nav">
                <Link to="/userlist">
                  <li class="nav-item">
                    <a class="nav-link">
                      Dashboard <span class="sr-only"></span>
                    </a>
                  </li>
                </Link>
                <Link to="/listartikel">
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      Article
                    </a>
                  </li>
                </Link>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Comment
                  </a>
                </li>
                <Link onClick={logout} to="/login">
                  <li class="nav-item">
                    <a class="nav-link">Logout</a>
                  </li>
                </Link>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    );
  } else if (token.token.admin === false) {
    return (
      <header class="header_area">
        <div className="main-menu">
          <nav class="navbar navbar-expand-lg navbar-light">
            <a class="navbar-brand" href="#">
              <img src="/logokinyot.png" alt="logo" width="60%" />
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <div class="mr-auto"></div>
              <ul class="navbar-nav">
                <Link to="/dashboard">
                  <li class="nav-item">
                    <a class="nav-link">
                      Dashboard <span class="sr-only"></span>
                    </a>
                  </li>
                </Link>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Search
                  </a>
                </li>
                <Link to="/artikel">
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      Artikel
                    </a>
                  </li>
                </Link>
                <Link onClick={logout} to="/login">
                  <li class="nav-item">
                    <a class="nav-link">Logout</a>
                  </li>
                </Link>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    );
  }

  // <header class="header_area">
  //   <div className="main-menu">
  //     <nav class="navbar navbar-expand-lg navbar-light">
  //       <a class="navbar-brand" href="#">
  //         <img src="./logokinyot.png" alt="logo" width="60%" />
  //       </a>
  //       <button
  //         class="navbar-toggler"
  //         type="button"
  //         data-toggle="collapse"
  //         data-target="#navbarNav"
  //         aria-controls="navbarNav"
  //         aria-expanded="false"
  //         aria-label="Toggle navigation"
  //       >
  //         <span class="navbar-toggler-icon"></span>
  //       </button>
  //       <div class="collapse navbar-collapse" id="navbarNav">
  //         <div class="mr-auto"></div>
  //         <ul class="navbar-nav">
  //           <li class="nav-item active">
  //             <a class="nav-link" href="#">
  //               Home <span class="sr-only">(current)</span>
  //             </a>
  //           </li>
  //           <li class="nav-item">
  //             <a class="nav-link" href="#">
  //               about
  //             </a>
  //           </li>
  //           <li class="nav-item">
  //             <a class="nav-link" href="#">
  //               services
  //             </a>
  //           </li>
  //           <li class="nav-item">
  //             <a class="nav-link" href="#">
  //               pages
  //             </a>
  //           </li>
  //           <li class="nav-item">
  //             <a class="nav-link" href="#">
  //               blog
  //             </a>
  //           </li>
  //           <li class="nav-item">
  //             <a class="nav-link" href="#">
  //               contact
  //             </a>
  //           </li>
  //         </ul>
  //       </div>
  //     </nav>
  //   </div>
  // </header>;
}

export default App;
