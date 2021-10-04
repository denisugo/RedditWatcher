import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import Header from "./Coponents/Header/Header";
import HomePage from "./Containers/HomePage/HomePage";
import Footer from "./Coponents/Footer/Footer";
import PostPage from "./Containers/PostPage/PostPage";

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            path="/:prefix/:subreddit/:selector/:id/:title"
            component={PostPage}
          />
        </Switch>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
