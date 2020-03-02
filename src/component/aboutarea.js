import React from "react";
import "../assets/css/bootstrap.min.css";
// import "../assets/css/style.css";
export default function aboutarea() {
  return (
    <section class="about-area">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-6 col-md-12">
            <img
              src="./img/about-us.png"
              alt="About us"
              class="img-fluid"
            ></img>
          </div>
          <div class="col-lg-6 col-md-12 about-title">
            <h2 class="text-uppercase pt-5">
              <span>Let me</span>
              <span> introduce</span>
              <span> myself</span>
            </h2>
            <div class="paragraph py-4 w-75">
              <p class="para">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
                aperiam quo nemo. Provident nam et necessitatibus iusto fugit
                voluptas eius!
              </p>
              <p class="para">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
                aperiam quo nemo. Provident nam et necessitatibus iusto fugit
                voluptas eius! karena sesuatu yang terjadi pada dalam dirimu itu
                nya mamam olangan wkwkwk teu ngurusan urang mah ,, semangatt beb
              </p>
            </div>
            <button
              type="button"
              class="btn button primary-button text-uppercase"
            >
              {" "}
              Download CV
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
