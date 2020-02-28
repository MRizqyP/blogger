import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./assets/css/bootstrap.min.css";
import Navbar from "./component/navbar";
import Mainarea from "./component/mainarea";
import Aboutarea from "./component/aboutarea";

function App() {
  return (
    <div>
      <Navbar />
      <main class="site-main">
        <Mainarea />
        <Aboutarea />
      </main>
    </div>
  );
}

export default App;
