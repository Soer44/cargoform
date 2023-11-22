// App.js
import React, { useState } from "react";
import "./App.scss";
import Header from "./components/Cargo/Header";
import CargoForm from "./components/Cargo/CargoForm";
import TransportForm from "./components/Cargo/TransportForm";
import ResultForm from "./components/Cargo/ResultForm";
import ContactForm from "./components/Cargo/ContactForm";

function App() {
  //_______________________Доставка адреса_______
  const [cargoFormValues, setCargoFormValues] = useState({});

  const handleCargoFormChange = (newValues) => {
    setCargoFormValues(newValues);
  };
  //____________________________________

  //_____________________Транспорт__________
  const [transportFormValues, setTransportFormValues] = useState([]);
  const handleTransportFormChange = (newValues) => {
    setTransportFormValues(newValues);
  };
  //____________________________________

  //_____________________Контакты__________
  const [contactFormValues, setContactFormValues] = useState({});
  const handleContactFormChange = (newValues) => {
    setContactFormValues(newValues);
  };
  //____________________________________

  //_______________________________Закрыть открыть
  const [showInputComponent, setShowInputComponent] = useState(false);
  const handleButtonClick = () => {
    setShowInputComponent(true);
  };
  const handleButtonClose = () => {
    setShowInputComponent(false);
  };
  const handleClearButtonClick = () => {
    localStorage.clear();
    window.location.reload();
  };
  //____________________________________

  return (
    <div className="App container">
		<Header />
      <h1>Заявка на отправку груза</h1>

      <CargoForm onCargoFormChange={handleCargoFormChange} />
      <TransportForm onTransportFormChange={handleTransportFormChange} />
      <ContactForm onContactFormChange={handleContactFormChange} />

      <div className="btn">
        <button className="sendbtn" onClick={handleButtonClick}>
          Отправить
        </button>
        <button className="clearbtn" onClick={handleClearButtonClick}>
          Сбросить
        </button>
      </div>

      {showInputComponent && (
        <ResultForm
          cargoFormData={cargoFormValues}
          transportFormData={transportFormValues}
          contactFormData={contactFormValues}
          onClose={handleButtonClose}
        />
      )}
    </div>
  );
}

export default App;
