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
import USERLIST from "./component/admin/userlist";
import DASHBOARD from "./component/user/dashboard";
import MAKEARTIKEL from "./component/user/buatartikel";
import USERCONTENT from "./component/user/usercontent";
import LISTARTIKEL from "./component/admin/listartikel";
import VIEWARTIKEL from "./component/user/liatartikel";
import ARTIKEL from "./component/user/allartikel";
import GUESTARTIKEL from "./component/user/guestartikel";

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
                  <Route path="/artikel" component={ARTIKEL} />
                  <Route path="/viewartikel/:id" component={GUESTARTIKEL} />
                  <Route component={Notfound} />
                </Switch>
              </>
            );
          } else if (token.token.admin === false) {
            return (
              <>
                <Switch>
                  <Route exact path="/" component={App} />
                  <Route path="/dashboard" component={DASHBOARD} />
                  <Route path="/buatartikel" component={MAKEARTIKEL} />
                  <Route path="/listcontent" component={USERCONTENT} />
                  <Route path="/artikel" component={ARTIKEL} />
                  <Route path="/viewartikel/:id" component={VIEWARTIKEL} />
                  <Route component={Notfound} />
                </Switch>
              </>
            );
          } else if (token.token.admin === true) {
            return (
              <Switch>
                <Route exact path="/adminpage" component={ADMINPAGE} />
                <Route path="/userlist" component={USERLIST} />
                <Route path="/listartikel" component={LISTARTIKEL} />
                <Route path="/viewartikel/:id" component={VIEWARTIKEL} />
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
