import React, { Component } from "react";
import "../assets/css/bootstrap.min.css";
import { LINK, Link } from "react-router-dom";
// import "../assets/css/style.css";

export default class mainarea extends Component {
  render() {
    return (
      <section class="site-banner">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-md-12 site-title">
              <h3 class="title-text"> Hey</h3>
              <h1 class="title-text text-uppercase mb-5">Blogger</h1>
              <h4 class="title-text text-uppercase"></h4>
              <div class="site-buttons">
                <div class="d-flex flex-row flex-wrap">
                  <Link to="/login">
                    <button
                      type="button"
                      class="button primary-button mr-4 text-uppercase"
                    >
                      LOGIN
                    </button>
                  </Link>
                  <Link to="/register">
                    <button
                      type="button"
                      class="button secondary-button text-uppercase"
                    >
                      REGISTER
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-12 banner-image">
              <img
                src="./blogging.png"
                class="img-fluid"
                alt="banner-img"
              ></img>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
