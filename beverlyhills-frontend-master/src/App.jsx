import React, { Component } from "react";
import "./App.css";
import { HashRouter as Router, Route } from "react-router-dom";
//import io from "socket.io-client";
import NavC from "./app/components/Nav";
import Home from "./app/screens/Home";
import IVDrip from "./app/screens/IVDrip";
import Therapies from "./app/screens/Therapies";
import Services from "./app/screens/Services";
import Team from "./app/screens/Team";
import Admin from "./app/screens/admin";
import axios from "axios";

const API_URL = "http://localhost:4040";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        ivdrips: [],
        therapies: [],
        services: [],
        teams: [],
      },
    };
  }

  fetchMenu = async () => {
    await axios
      .get(`${API_URL}/common/menu`)
      .then((result) => {
        const data = result.data.data;

        this.setState({
          data,
        });
      })
      .catch((err) => console.log(err.message));
  };

  render() {
    return (
      <Router>
        <div>
          <NavC fetchMenu={this.fetchMenu} {...this.state} />
          <div className="container">
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/admin"
              render={(props) => (
                <Admin {...props} fetchMenu={this.fetchMenu} {...this.state} />
              )}
            />
            <Route exact path="/ivdrip/:slug" component={IVDrip} />
            <Route exact path="/therapies/:slug" component={Therapies} />
            <Route exact path="/services/:slug" component={Services} />
            <Route exact path="/team/:slug" component={Team} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
