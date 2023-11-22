// Cargoform.js
import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import { format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/CargoForm.scss";

// Подкомпонент для текстового поля
const InputField = ({
  label,
  type,
  id,
  name,
  value,
  placeholder,
  onChange,
  error,
}) => (
  <div className="input__wrapper hoverbox">
    <label htmlFor={id}>{label}:</label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
    {error && <span className="error">{error}</span>}
  </div>
);
//_________________________

//______________________________________________________
const CargoForm = ({ onCargoFormChange }) => {
  const [formData, setCargoFormData] = useState({
    startAddress: '',
    finishAddress: '',
    selectedDate: new Date(),
	duration: 1,
  });


  //________передача даты________________________________
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  //_______________________________________

  //_______________________ Функции +- duration_____________
  const [duration, setDuration] = useState(1); // Устанавливаем начальное значение
  const handleIncrement = () => {
    setDuration((prevDuration) => prevDuration + 1);
  };
  const handleDecrement = () => {
    if (duration > 1) {
      setDuration((prevDuration) => prevDuration - 1);
    }
  };
  //_____________________________________________________

  const prevFormData = useRef(formData);
  const prevDuration = useRef(duration);

  useEffect(() => {
	const formattedDate = format(formData.selectedDate, 'dd.MM.yyyy');
    if (
      prevFormData.current !== formData ||
      prevDuration.current !== duration
    ) {
      onCargoFormChange({
        ...formData,
        duration,
		selectedDate: formattedDate,
      });

      prevFormData.current = formData;
      prevDuration.current = duration;
    }
  }, [formData, duration, onCargoFormChange]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCargoFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setCargoFormData((prevData) => ({
      ...prevData,
      selectedDate: date,
    }));
	setSelectedDate(date);
  };

  return (
    <div>
      <form className="wherefrom container-form">
        <div className="wherefrom wrapper">
          <span className="title">Откуда</span>

          <InputField
            label="Адрес"
            type="text"
            id="startAddress"
            name="startAddress"
			value={formData.startAddress}
            placeholder="Введите адрес"
            onChange={handleChange}
			// error={errors.startAddress}
          />

          <div className="input__wrapper hoverbox">
            <label htmlFor="dateCargo">Дата отправки</label>

            <DatePicker
              id="selectedDate"
              name="selectedDate"
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd.MM.yyyy"
              placeholderText="Выберите дату"
              minDate={today}
            />
          </div>

          <div className="duration__wrapper">
            <p className="gray__title">Длительность</p>

            <div className="block__button">
              <div className="block__button--minus" onClick={handleDecrement}>
                <p>-</p>
              </div>
              <p id='duration'>{duration} ч.</p>
              <div className="block__button--plus" onClick={handleIncrement}>
                <p>+</p>
              </div>
            </div>
          </div>
        </div>

        <div className="fromform wrapper">
          <span className="title">Куда</span>
          <InputField
            label="Адрес"
            type="text"
            id="finishAddress"
            name="finishAddress"
			value={formData.finishAddress}
            placeholder="Введите адрес"
            onChange={handleChange}
			// error={errors.finishAddress}
          />
        </div>
      </form>
    </div>
  );
};

export default CargoForm;
