import React from "react";

import "./App.css";
import Header from "./Coponents/Header/Header";
import Posts from "./Coponents/Posts/Posts";
import Subreddit from "./Coponents/Subreddit/Subreddit";
import science from "./assets/subredditsIcons/science.png";
import Subreddits from "./Coponents/Subreddits/Subreddits";
import HomePage from "./Containers/HomePage/HomePage";

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <HomePage />
      </main>
    </div>
  );
}

export default App;
