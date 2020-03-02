import React from "react";
import logo from "./logo.svg";
import "./App.css";
// import "./assets/css/bootstrap.min.css";
import Navbar from "./component/navbar";
import Mainarea from "./component/mainarea";
import Aboutarea from "./component/aboutarea";
import "../src/assets/css/style.css";
// import "../src/assets/css/style2.css";
import LOGIN from "./component/login/login.js";
// import "../src/component/login/main";

import HOME from "./component/home";

function App() {
  return (
    <div>
      <HOME />

      {/* <Navbar />
      <LOGIN /> */}
      {/* <main class="site-main">
        <Mainarea />
        <Aboutarea />
      </main> */}
    </div>
  );
}

export default App;
