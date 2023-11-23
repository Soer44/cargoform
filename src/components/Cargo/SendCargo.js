
import React, { useState, useEffect } from "react";
import "../../App.scss";
import CargoForm from "./CargoForm";
import TransportForm from "./TransportForm";
import ResultForm from "./ResultForm";
import ContactForm from "./ContactForm";

function SendCargo() {
  //_______________________Доставка адреса_______
  const [cargoFormValues, setCargoFormValues] = useState({});
  const isCargoFormValid = !!cargoFormValues.startAddress && !!cargoFormValues.finishAddress;

  const handleCargoFormChange = (newValues) => {
    setCargoFormValues(newValues);
  };
  //____________________________________

  //_____________________Транспорт__________
  const [transportFormValues, setTransportFormValues] = useState([]);
  const isTransportFormValid = transportFormValues.every((form) => form.selectedTransport !== null);

  const handleTransportFormChange = (newValues) => {
    setTransportFormValues(newValues);
  };
  //____________________________________

  //_____________________Контакты__________
  const [contactFormValues, setContactFormValues] = useState([]);
  const [isContactFormValid, setIsContactFormValid] = useState(false);


  const handleContactFormChange = (newValues, isValid) => {
    setContactFormValues(newValues);
    setIsContactFormValid(isValid);
  };
  const handleContactFormValidityChange = (isValid) => {
    setIsContactFormValid(isValid);
  };
  //____________________________________
  const [isAnyFormInvalid, setIsFormValid] = useState(false);
// Валидация форм перед отправкой_______________________________________
useEffect(() => {
	console.log("Contact form is valid:", isContactFormValid);

	const isAnyFormInvalid = !isCargoFormValid || !isTransportFormValid || !isContactFormValid;
	setIsFormValid(isAnyFormInvalid);
  }, [cargoFormValues, transportFormValues, isContactFormValid, isCargoFormValid, isTransportFormValid]);
//______________________________________________________________________

  //_______________________________Закрыть открыть
  const [showInputComponent, setShowInputComponent] = useState(false);
  const handleButtonClick = () => {
    setShowInputComponent(true);
  };
  const handleButtonClose = () => {
    setShowInputComponent(false);
	localStorage.clear();
    window.location.reload();
  };
  const handleClearButtonClick = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    const handleBodyScroll = () => {
      document.body.style.overflow = showInputComponent ? "hidden" : "auto";
    };

    handleBodyScroll(); // Изначальная установка при загрузке

    window.addEventListener("scroll", handleBodyScroll);

    return () => {
      window.removeEventListener("scroll", handleBodyScroll);
    };
  }, [showInputComponent]);

  //____________________________________

  return (
    <div className="main container">
      <h1>Заявка на отправку груза</h1>

      <CargoForm onCargoFormChange={handleCargoFormChange} />
      <TransportForm onTransportFormChange={handleTransportFormChange} />
      <ContactForm onContactFormChange={handleContactFormChange}
	  onContactFormValidityChange={handleContactFormValidityChange} />

      <div className="btn">
        <button className="sendbtn" onClick={handleButtonClick} disabled={isAnyFormInvalid}>
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

export default SendCargo;
