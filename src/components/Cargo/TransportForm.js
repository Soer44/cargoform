import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import { components } from "react-select";
import "../../styles/TransportForm.scss";

const TransportForm = ({ onTransportFormChange }) => {
  const initialFormData = {
    isLoaderEnabled: true,
    numberOfLoaders: 1,
    isPassengerEnabled: true,
    numberOfPassenger: 1,
    selectedTransport: null,
  };

  const MAX_PASSENGERS = 4;
  const MAX_LOADERS = 4;

  const [activeForms, setActiveForms] = useState(() => {
    const storedForms = JSON.parse(localStorage.getItem("transportForms"));
    return storedForms || [{ id: 1, ...initialFormData }];
  });

  const options = [
    { value: "option1", label: "Любая газель1", id: 1 },
    { value: "option2", label: "Любая газель2", id: 2 },
    { value: "option3", label: "Любая газель3", id: 3 },
  ];

  useEffect(() => {
    localStorage.setItem("transportForms", JSON.stringify(activeForms));
  }, [activeForms]);

  useEffect(() => {
    onTransportFormChange(activeForms);
  }, [activeForms, onTransportFormChange]);

  const handleToggleLoader = (formId) => {
    setActiveForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? { ...form, isLoaderEnabled: !form.isLoaderEnabled }
          : form
      )
    );
  };

  const handleTogglePassenger = (formId) => {
    setActiveForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? { ...form, isPassengerEnabled: !form.isPassengerEnabled }
          : form
      )
    );
  };

  // Инкрименты_______________________________________
  const handleIncrement = (formId) => {
    setActiveForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId &&
        form.isLoaderEnabled &&
        form.numberOfLoaders < MAX_LOADERS
          ? { ...form, numberOfLoaders: form.numberOfLoaders + 1 }
          : form
      )
    );
  };

  const handleIncr = (formId) => {
    setActiveForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId && form.numberOfPassenger < MAX_PASSENGERS
          ? { ...form, numberOfPassenger: form.numberOfPassenger + 1 }
          : form
      )
    );
  };

  // Декрименты ____________________________________________________

  const handleDecrement = (formId) => {
    setActiveForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId && form.isLoaderEnabled && form.numberOfLoaders > 1
          ? { ...form, numberOfLoaders: form.numberOfLoaders - 1 }
          : form
      )
    );
  };

  const handleDecr = (formId) => {
    setActiveForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId && form.numberOfPassenger > 1
          ? { ...form, numberOfPassenger: form.numberOfPassenger - 1 }
          : form
      )
    );
  };

  //_________________________________________________________________

  const handleSelectChange = (formId, selectedOption) => {
    setActiveForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? { ...form, selectedTransport: selectedOption }
          : form
      )
    );
  };

  //_________________________________________________________________

  const addForm = () => {
    if (removedForms.length > 0) {
      const formToAdd = removedForms[0];
      setActiveForms((prevForms) => [
        ...prevForms,
        { id: formToAdd, ...initialFormData },
      ]);
      setRemovedForms((prevRemovedForms) =>
        prevRemovedForms.slice(1, prevRemovedForms.length)
      );
    } else {
      const newId = activeForms.length + 1;
      setActiveForms((prevForms) => [
        ...prevForms,
        { id: newId, ...initialFormData },
      ]);
    }
  };

  //   _______________Удаление форм__________________
  const [removedForms, setRemovedForms] = useState([]);

  const removeForm = (formId) => {
    setActiveForms((prevForms) => {
      const updatedForms = prevForms
        .filter((form) => form.id !== formId)
        .map((form, index) => ({ ...form, id: index + 1 }));

     
      if (updatedForms.length === 0) {
        return [{ id: 1, ...initialFormData }];
      }

      return updatedForms;
    });

    setRemovedForms((prevRemovedForms) => [...prevRemovedForms, formId]);
  };

  //_________________________________________________________________

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="54"
          height="32"
          viewBox="0 0 54 32"
          fill="none"
        >
          <path
            d="M18.5 14L26.5 19.4172L35 14"
            stroke="#4C73E3"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="round"
          />
        </svg>
      </components.DropdownIndicator>
    );
  };

  const customStyles = {
    control: (provided, state) => ({
		...provided,
		borderWidth: "1px", // Начальная толщина границы
		borderColor: "#DEE4F0", // Начальный цвет границы
		borderStyle: "solid", // Начальный стиль границы
		borderRadius: "1rem",
		paddingLeft: "1rem",
		cursor: "pointer",
		transition: "none",
	  
		"&:focus-within": {
		  borderWidth: "1px", // Толщина границы при фокусе внутри
		  borderColor: "#4C73E3", // Цвет границы при фокусе внутри
		},
	  
		"&:not(:focus-within):hover": {
		  borderWidth: "1px", // Толщина границы при ховере без фокуса внутри
		  borderColor: "#DEE4F0", // Цвет границы при ховере без фокуса внутри
		  boxShadow: "0px 0px 3px 1px rgba(53, 165, 0, 0.70)",
		},
	  }),
    valueContainer: (provided) => ({
      ...provided,
      padding: 0,
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      paddingRight: 0,
      position: "relative",
    }),
    menu: (provided) => ({
      ...provided,
      minHeight: "7rem",
      borderRadius: "1rem",
      background: "#FFF",
      boxShadow: "0px 4px 10px 0px rgba(151, 151, 151, 0.25)",
      padding: "0.94rem 1.25rem 1rem 1.25rem",
      overflow: "hidden",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#4C73E3" : "",
      color: state.isSelected ? "#fff" : "#000",
      "&:hover": {
        backgroundColor: state.isSelected ? "#DEE4F0" : "#DEE4F0",
      },
      cursor: "pointer",
      fontFamily: "Inter",
      fontSize: "0.875rem",
      fontStyle: "normal",
      fontWeight: 300,
      lineHeight: "normal",
    }),
  };

  const [errors, setErrors] = useState(activeForms.map(() => ''));

  // Функция валидации
  const validateForm = useCallback(() => {
	const transportErrors = activeForms.map((form) => (
	  form.selectedTransport ? '' : 'Выберите транспорт'
	));
  
	setErrors(transportErrors);
  
	// Возвращаем true, если нет ошибок
	return transportErrors.every(error => !error);
  }, [activeForms, setErrors]);

  useEffect(() => {
    onTransportFormChange(activeForms);

    // Вызываем функцию валидации при изменении форм
    validateForm();
  }, [activeForms, onTransportFormChange, validateForm]);



  return (
    <div>
      {activeForms.map((form, index) => (
        <form
          className={`transportform container-form ${
            removedForms.includes(form.id) ? "remove" : ""
          }`}
          key={form.id}
        >
          <div className="wrapper">
            <div className="title">Транспорт {index + 1}</div>

            <div className="transport__wrapper">
              <div className="column input__wrapper">
                <div className="loaders__wrapper">
                  <p
                    className="gray__title"
                    htmlFor={`${form.id}-loaderSwitch`}
                  >
                    Грузчики
                  </p>

                  <input
                    type="checkbox"
                    id={`${form.id}-loaderSwitch`}
                    checked={form.isLoaderEnabled}
                    onChange={() => handleToggleLoader(form.id)}
                  />
                  <label htmlFor={`${form.id}-loaderSwitch`}></label>
                </div>
                {form.isLoaderEnabled && (
                  <div className="loaders__wrapper" id="loaders">
                    <p className="gray__title">Кол-во грузчиков</p>

                    <div className="block__button loadspas__btn">
                      <div
                        className="block__button--minus"
                        onClick={() => handleDecrement(form.id)}
                      >
                        <p>-</p>
                      </div>
                      <p id={`${form.id}-numberOfLoaders`}>
                        {form.numberOfLoaders}
                      </p>
                      <div
                        className="block__button--plus"
                        onClick={() => handleIncrement(form.id)}
                      >
                        <p>+</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="loaders__wrapper">
                  <p
                    className="gray__title"
                    htmlFor={`${form.id}-passengerSwitch-`}
                  >
                    Пассажиры
                  </p>

                  <input
                    type="checkbox"
                    id={`${form.id}-passengerSwitch`}
                    checked={form.isPassengerEnabled}
                    onChange={() => handleTogglePassenger(form.id)}
                  />
                  <label htmlFor={`${form.id}-passengerSwitch`}></label>
                </div>
                {form.isPassengerEnabled && (
                  <div className="loaders__wrapper">
                    <p className="gray__title">Кол-во пассажиров</p>

                    <div className="block__button loadspas__btn">
                      <div
                        className="block__button--minus"
                        onClick={() => handleDecr(form.id)}
                      >
                        <p>-</p>
                      </div>
                      <p id="numberOfPassenger">{form.numberOfPassenger}</p>
                      <div
                        className="block__button--plus"
                        onClick={() => handleIncr(form.id)}
                      >
                        <p>+</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="column__container">
                <div className="column input__wrapper choose__transport">
                  <Select
                    id={`${form.id}-transportSelect`}
                    options={options.map((option) => ({
                      ...option,
                      id: `${form.id}-${option.id}`,
                    }))}
                    placeholder="Выберите транспорт"
                    components={{ DropdownIndicator }}
                    styles={customStyles}
                    onChange={(selectedOption) =>
                      handleSelectChange(form.id, selectedOption)
                    }
                  />
				   {errors[index] && <span className="error"></span>}
                </div>
                <div className="icon-container">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="52"
                    viewBox="0 0 21 52"
                    fill="none"
                  >
                    <path
                      d="M10.6939 35.3483C13.2352 35.3483 15.5165 34.3375 17.1626 32.6626C18.8375 31.0166 19.8482 28.7352 19.8482 26.1939C19.8482 23.6527 18.8375 21.3713 17.1626 19.6964C15.5165 18.0503 13.2352 17.0107 10.6939 17.0107C8.15265 17.0107 5.87129 18.0503 4.19637 19.6964C2.55033 21.3713 1.51073 23.6527 1.51073 26.1939C1.51073 28.7352 2.55033 31.0166 4.19637 32.6626C5.87129 34.3375 8.15265 35.3483 10.6939 35.3483ZM8.0949 24.1329C8.0949 24.4216 7.86387 24.6527 7.60397 24.6527C7.31519 24.6527 7.08417 24.4216 7.08417 24.1329C7.08417 23.382 7.08417 22.6023 7.6906 21.7938C8.00826 21.3606 8.49919 20.9563 9.10562 20.6386C9.59655 20.4076 10.203 20.2343 10.8094 20.2343C11.5025 20.2343 12.2244 20.4365 12.8598 20.7541C13.4951 21.1007 14.0149 21.5627 14.3325 22.1114C14.6213 22.6601 14.6791 23.2665 14.5924 23.8152C14.5058 24.4505 14.217 25.057 13.8416 25.4901C13.3507 26.0099 12.802 26.2698 12.3111 26.5009C12.1089 26.5875 11.9068 26.6741 11.7913 26.7608C11.5891 26.8763 11.4736 27.0495 11.387 27.1939C11.2715 27.3961 11.2137 27.6271 11.1271 27.8581C11.0404 28.118 10.7517 28.2624 10.4918 28.1758C10.2319 28.0892 10.0875 27.8004 10.1741 27.5405C10.2607 27.2517 10.3474 26.9918 10.4918 26.703C10.665 26.4142 10.8961 26.1255 11.2137 25.9233C11.4159 25.7789 11.6469 25.6634 11.9068 25.5768C12.3111 25.3746 12.7442 25.1725 13.0619 24.8259C13.3218 24.5372 13.5239 24.104 13.5817 23.6708C13.6395 23.2954 13.6106 22.92 13.4373 22.6023C13.2352 22.2269 12.8309 21.9093 12.3977 21.6494C11.9068 21.3895 11.3292 21.2451 10.8094 21.2451C10.3474 21.2451 9.9142 21.3606 9.53879 21.5627C9.10562 21.7938 8.73021 22.0825 8.49919 22.4002C8.0949 22.9489 8.0949 23.5264 8.0949 24.1329ZM17.8845 33.3846C16.0652 35.2328 13.4951 36.3879 10.6939 36.3879C7.86387 36.3879 5.32261 35.2328 3.47443 33.3846C1.65512 31.5653 0.5 28.9951 0.5 26.1939C0.5 23.3639 1.65512 20.8226 3.47443 18.9744C5.32261 17.1551 7.86387 16 10.6939 16C13.4951 16 16.0652 17.1551 17.8845 18.9744C19.7327 20.8226 20.8878 23.3639 20.8878 26.1939C20.8878 28.9951 19.7327 31.5653 17.8845 33.3846Z"
                      fill="#4C73E3"
                    />
                    <circle cx="10.5" cy="31" r="1" fill="#4C73E3" />
                  </svg>
                  <div className="data-title">
                    <p>
                      Выберите транспорт, если необходимо несколько машин для
                      перевозки, нажмите
                      <br />
                      <span>+ Добавить ещё транспорт</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {index > 0 && (
            <button className="removebtn" onClick={() => removeForm(form.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
              >
                <path
                  d="M13.4369 12.4963L20.4719 5.4544C20.596 5.32968 20.6656 5.16085 20.6655 4.9849C20.6654 4.80894 20.5955 4.64021 20.4712 4.51565C20.2225 4.26815 19.7844 4.2669 19.5331 4.5169L12.5 11.5588L5.46437 4.51502C5.21437 4.26815 4.77624 4.2694 4.52749 4.51627C4.46575 4.57777 4.41687 4.65095 4.38371 4.73154C4.35056 4.81212 4.33378 4.89851 4.33437 4.98565C4.33437 5.16315 4.40312 5.3294 4.52749 5.45252L11.5625 12.4956L4.52812 19.5394C4.40398 19.6643 4.33446 19.8334 4.33482 20.0095C4.33517 20.1856 4.40536 20.3544 4.52999 20.4788C4.65062 20.5981 4.82124 20.6669 4.99749 20.6669H5.00124C5.17812 20.6663 5.34874 20.5969 5.46687 20.4763L12.5 13.4344L19.5356 20.4781C19.66 20.6019 19.8262 20.6707 20.0025 20.6707C20.0896 20.6709 20.176 20.6539 20.2565 20.6207C20.3371 20.5874 20.4103 20.5386 20.4719 20.477C20.5336 20.4153 20.5824 20.3421 20.6156 20.2616C20.6489 20.181 20.6659 20.0947 20.6656 20.0075C20.6656 19.8307 20.5969 19.6638 20.4719 19.5406L13.4369 12.4963Z"
                  fill="#FF0404"
                />
              </svg>
            </button>
          )}
        </form>
      ))}

      <button className="transportaddbtn" onClick={addForm}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          stroke="14"
          height="15"
          viewBox="0 0 14 15"
          fill="none"
        >
          <path d="M7 0.5L7 14.5" stroke="#4C73E3" strokeWidth="2" />
          <path d="M14 7.5L2.38419e-07 7.5" stroke="#4C73E3" strokeWidth="2" />
        </svg>
        Добавить еще транспорт
      </button>
    </div>
  );
};

export default TransportForm;
