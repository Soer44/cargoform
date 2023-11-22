// ResultForm.js
import React from "react";

import "../../styles/_base.scss";
import "../../styles/ResultForm.scss";

const ResultForm = ({
  onClose,
  cargoFormData,
  transportFormData,

  contactFormData,
}) => {
  return (
    <div className="resultform__background">
      <div className="resultform">
        <h2>Заявка отправлена</h2>

        <div className="result"> {/* скрытый блок для отслеживания результатов */}
          <p>Данные из компонента CargoForm:</p>
          <pre>{JSON.stringify(cargoFormData, null, 2)}</pre>
          <p>Данные из компонента TransportForm:</p>
          <pre>{JSON.stringify(transportFormData, null, 2)}</pre>
          <p>Данные из компонента ContactForm:</p>
          <pre>{JSON.stringify(contactFormData, null, 2)}</pre>
        </div>

        <div className="adresaidata">
          <div className="otkuda">
            <p className="gray__title semibold">Откуда забрать:</p>
            <span className="value gray__title">{cargoFormData.startAddress}</span>
          </div>
          <div className="kuda">
            <p className="gray__title semibold">Куда привезти:</p>
            <span className="value gray__title">{cargoFormData.finishAddress}</span>
          </div>
          <div className="dataotpravki">
            <p className="gray__title semibold">Дата отправки:</p>
            <span className="value gray__title">{cargoFormData.selectedDate}</span>
          </div>
        </div>

        <div className="transportinf">
          {transportFormData.map((transportForm, index) => (
            <div key={index} className="transportid">
              <div className="transportid__title">
                {`Транспорт ${index + 1}: `}
                <div className="selectid gray__title">
                  {transportForm.selectedTransport?.label || "Не выбран"}
                </div>
              </div>

              {/* Проверка наличия грузчиков */}
              {transportForm.isLoaderEnabled && (
                <div className="loaders">
                  <p className="gray__title semibold">Кол-во грузчиков:</p>
                  <span className="value gray__title">{transportForm.numberOfLoaders}</span>
                </div>
              )}

              {/* Проверка наличия пассажиров */}
              {transportForm.isPassengerEnabled && (
                <div className="passengers">
                  <p className="gray__title semibold">Кол-во пассажиров:</p>
                  <span className="value gray__title">
                    {transportForm.numberOfPassenger}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="zakazchikinf">
          <div className="zakazchik__fio">
            <p className="gray__title semibold">Заказчик:</p>
            <span className="value gray__title">
              {contactFormData.lastName} {contactFormData.firstName}
            </span>
          </div>
          <div className="zakazchik__tel">
            <p className="gray__title semibold">Телефон:</p>
            <span className="value gray__title">{contactFormData.phone}</span>
          </div>
          <div className="zakazchik__email">
            <p className="gray__title semibold">E-mail:</p>
            <span className="value gray__title">{contactFormData.email}</span>
          </div>
        </div>
        <p className="checkboxtext1">
          Информация продублирована на электронную почту
        </p>
        <div className="sendbtn__wrapper">
          <button className="sendbtn" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultForm;
