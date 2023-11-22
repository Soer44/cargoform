// ContactForm.js

import React, { useState, useEffect } from 'react';
import validator from 'validator';
import '../../styles/ContactForm.scss';
import uncheckedImage from '../../images/uncheckedBox.svg';
import checkedImage from '../../images/checkedBox.svg';

// Подкомпонент для текстового поля
const InputField = ({ label, type, id, name, value, placeholder, onChange, error }) => (
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

// Подкомпонент для чекбокса
const CheckboxField = ({ label, checked, onChange, name, error }) => (
  <div className="checkbox">
    <label className="custom-checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        name={name}
        style={{ display: 'none' }}
      />
      <img src={checked ? checkedImage : uncheckedImage} alt="Checkbox" className="checkbox-image" />
    </label>
    <span className="checkboxtext">{label}</span>
    {error && <span className="error">{error}</span>}
  </div>
);

const ContactForm = ({ onContactFormChange }) => {

	
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    phone: '',
    email: '',
    agree: false,
  });

  const [errors, setErrors] = useState({
    lastName: '',
    firstName: '',
    phone: '',
    email: '',
    agree: '',
  });

  useEffect(() => {
    onContactFormChange(formData);
  }, [formData, onContactFormChange]);


  const handleChange = (e) => {


    const { name, value, type, checked } = e.target;
    let error = '';

    if (name === 'lastName' || name === 'firstName') {
      if (!validator.isAlpha(value, 'ru-RU', { ignore: ' ' })) {
        error = 'Введите корректное имя или фамилию';
      }
    } else if (name === 'phone') {
      if (!validator.isMobilePhone(value, 'ru-RU')) {
        error = 'Введите корректный номер телефона';
      }
    } else if (name === 'email') {
      if (!validator.isEmail(value)) {
        error = 'Введите корректный email';
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formIsValid = validateForm();
    if (formIsValid) {
      console.log('Form submitted:', formData);
    } else {
      console.log('Form is invalid. Please correct errors.');
    }
  };

  const validateForm = () => {
    let formIsValid = true;

    for (const key in errors) {
      if (errors[key]) {
        formIsValid = false;
        break;
      }
    }

    return formIsValid;
  };

  return (
    <form onSubmit={handleSubmit} className="contact__form container-form">
      <div className="wrapper">
        <span className="title">Контакты</span>
        <div className="contacts__wrapper">
          <div className="column">
            <InputField
              label="Фамилия"
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              placeholder="Укажите фамилию"
              onChange={handleChange}
              error={errors.lastName}
            />
            <InputField
              label="Имя"
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              placeholder="Укажите имя"
              onChange={handleChange}
              error={errors.firstName}
            />
          </div>
          <div className="column">
            <InputField
              label="Телефон"
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              placeholder="+7 (___) ___-__-__"
              onChange={handleChange}
              error={errors.phone}
            />
            <InputField
              label="Email"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
          </div>
        </div>
        <CheckboxField
          label="Соглашаюсь на обработку своих персональных данных"
          checked={formData.agree}
          onChange={handleChange}
          name="agree"
          error={errors.agree}
        />
      </div>
    </form>
  );
};

export default ContactForm;
