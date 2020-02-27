import React, { Component } from "react";
import "../assets/css/bootstrap.min.css";
import "../assets/css/style.css";

export default class mainarea extends Component {
  render() {
    return (
      <section class="site-banner">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-md-12 site-title">
              <h3 class="title-text"> Hey</h3>
              <h1 class="title-text text-uppercase">I am Kinyot</h1>
              <h4 class="title-text text-uppercase">
                senior android developer
              </h4>
              <div class="site-buttons">
                <div class="d-flex flex-row flex-wrap">
                  <button
                    type="button"
                    class="btn button primary-button mr-4 text-uppercase"
                  >
                    Hire me
                  </button>
                  <button
                    type="button"
                    class="btn button secondary-button text-uppercase"
                  >
                    Get CV
                  </button>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-12 banner-image">
              <img
                src="./banner-image.png"
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
