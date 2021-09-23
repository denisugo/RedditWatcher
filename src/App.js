import React from "react";

import "./App.css";
import Header from "./Coponents/Header/Header";
import Posts from "./Coponents/Posts/Posts";

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <Posts />
      </main>
    </div>
  );
}

export default App;
