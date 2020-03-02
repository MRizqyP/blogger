import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import Notfound from "./component/notfound";
import Main from "./component/main";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LOGIN from "./component/login/login";
import REGISTER from "./component/register/register";
import ADMINPAGE from "./component/adminpage";

// console.log(token);

function getRole() {}
const token = JSON.parse(sessionStorage.getItem("persisted_state_hook:token"));

const routing = (
  <Router>
    <Switch>
      <Main>
        {(() => {
          if (!token) {
            return (
              <>
                <Switch>
                  <Route exact path="/" component={App} />
                  <Route path="/login" component={LOGIN} />
                  <Route path="/register" component={REGISTER} />
                  <Route component={Notfound} />
                </Switch>
              </>
            );
          } else if (token.token.admin === false) {
            return (
              <>
                <Switch>
                  <Route exact path="/" component={App} />
                  {/* <Route path="/buku" component={GETUSER} />
                  <Route path="/listorder" component={LISTORDER} /> */}
                  <Route component={Notfound} />
                </Switch>
              </>
            );
          } else if (token.token.admin === true) {
            return (
              <Switch>
                <Route exact path="/adminpage" component={ADMINPAGE} />
                {/* <Route path="/get" component={GET} />
                <Route path="/post" component={POST} />
                <Route path="/getbyid" component={GETBYID} />
                <Route path="/put/:id" component={PUT} />
                <Route path="/login" component={LOGIN} />
                <Route path="/listuser" component={LISTUSER} />
                <Route path="/listorder" component={LISTORDER} />
                <Route path="/nyoba" component={nyoba} />
                <Route path="/listorderadmin/:id" component={LISTORDERADMIN} /> */}
                <Route component={Notfound} />
              </Switch>
            );
          }
        })()}
      </Main>
    </Switch>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
