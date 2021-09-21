import React from "react";

import "./App.css";
import Header from "./Coponents/Header/Header";
import Post from "./Coponents/Post/Post";

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <Post />
      </main>
    </div>
  );
}

export default App;
