import React from "react";
import { 
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';
  
import Login from "./Login";
import Category from "./Category";
import Home from "./Home";
import Categories from "./Categories";
import 'semantic-ui-css/semantic.min.css';
import "./App.css";

class App extends React.Component {
  render() {

    return (
          <HashRouter>
            <Switch>
              <Route exact path="/" render={() => { 
                return (
                  <Login />
                );
              }} />
              <Route exact path="/:userId/categories/:category/:id" render={(props) => {
                return (
                  <Category 
                    category={ props }
                    home={ props }
                  />
                );
              }} />               
              <Route exact path="/:userId/home" render={(props) => {
                    return (
                        <Home 
                          home={ props }
                        />
                    );
              }} />
             <Route exact path="/:userId/categories" render={(props) => {
                return (
                  <Categories
                    home={ props }
                  />
                );
              }} />
            </Switch>
          </HashRouter>
          );

  }
}

export default App;