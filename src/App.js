import React from "react";
import "./App.css";

import Header from "./Coponents/Header/Header";
import HomePage from "./Containers/HomePage/HomePage";
import Footer from "./Coponents/Footer/Footer";

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <HomePage />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
