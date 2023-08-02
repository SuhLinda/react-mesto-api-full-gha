import React from 'react';
import PopupWithForm from './PopupWithForm.jsx';
import useFormAndValidationAddPlace from '../hooks/useFormAndValidationAddPlace.js';

function AddPlacePopup({isOpen, onClose, onUpdateCards, isLoading, onValidate, errorMessage, toggleButtonState, toggleOfTheInputText}) {
  const {
    name,
    setName,
    link,
    setLink,
    nameDirty,
    setNameDirty,
    linkDirty,
    setLinkDirty,
    nameError,
    setNameError,
    linkError,
    setLinkError,
    handleChangeName,
    handleChangeLink,
    blurHandler
  } = useFormAndValidationAddPlace();

  React.useEffect(() => {
    setName("");
    setLink("");
    setNameDirty(false);
    setLinkDirty(false);
    setNameError("");
    setLinkError("");
  }, [isOpen]);

  function handleAddPlaceSubmit(evt) {
    evt.preventDefault();

    onUpdateCards({
      name: name,
      link: link
    });
  }

  return (
    <PopupWithForm
      name="popUpAddPlace"
      title="Новое место"
      buttonText={isLoading? "Создание..." : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}
      onValidate={onValidate}
      toggleButtonState={toggleButtonState}
      errorMessage={errorMessage}
      toggleOfTheInputText={toggleOfTheInputText}>
      <fieldset className="popup__fieldset">
        <input
          onBlur={blurHandler}
          className={`popup__fieldset-input ${toggleOfTheInputText && 'popup__fieldset-input_inactive'} ${toggleOfTheInputText && 'popup__fieldset-input_type_error '}`}
          value={name || ""}
          onChange={handleChangeName}
          type="text"
          id="title-input"
          name="name"
          placeholder="Название"
          required/>
        <span className={`name-input-error popup__fieldset-error ${errorMessage && 'popup__fieldset-error_active'}`}>
          {nameDirty && nameError}
        </span>
        <input
          onBlur={blurHandler}
          className={`popup__fieldset-input ${toggleOfTheInputText && 'popup__fieldset-input_inactive'} ${toggleOfTheInputText && 'popup__fieldset-input_type_error '}`}
          value={link || ""}
          onChange={handleChangeLink}
          type="url"
          id="image-input"
          name="link"
          placeholder="Ссылка на картинку"
          required/>
        <span className={`name-input-error popup__fieldset-error ${errorMessage && 'popup__fieldset-error_active'}`}>
          {linkDirty && linkError}
        </span>
      </fieldset>
    </PopupWithForm>
  )
}

export default AddPlacePopup;