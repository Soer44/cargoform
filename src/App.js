// App.js
import React from "react";
import "./App.scss";
import "./styles/_base.scss";
import Header from "./components/Cargo/Header";
import SendCargo from "./components/Cargo/SendCargo";



function App() {
 

  return (
    <div className="App">
		<Header />
	<SendCargo />
    </div>
  );
}

export default App;
