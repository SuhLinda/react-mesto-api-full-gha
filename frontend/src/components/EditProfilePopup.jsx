import React from 'react';
import PopupWithForm from './PopupWithForm.jsx';
import useFormAndValidationProfileEdit from '../hooks/useFormAndValidationProfileEdit.js';

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading, onValidate, errorMessage, toggleButtonState, toggleOfTheInputText}) {
  const {
    currentUser,
    name,
    setName,
    description,
    setDescription,
    nameDirty,
    setNameDirty,
    descriptionDirty,
    setDescriptionDirty,
    nameError,
    setNameError,
    descriptionError,
    setDescriptionError,
    handleChangeName,
    handleChangeDescription,
    blurHandler
  } = useFormAndValidationProfileEdit();


  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setNameDirty(false);
    setDescriptionDirty(false);
    setNameError("");
    setDescriptionError("");
  }, [currentUser, isOpen]);


  function handleSubmitUserInfo(evt) {
    evt.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="popUpEditProfile"
      title="Редактировать профиль"
      buttonText={isLoading? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitUserInfo}
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
          id="name-input"
          name="name"
          placeholder="Имя"
          required/>
        <span className={`name-input-error popup__fieldset-error ${errorMessage && 'popup__fieldset-error_active'}`}>
          {nameDirty && nameError}
        </span>
        <input
          onBlur={blurHandler}
          className={`popup__fieldset-input ${toggleOfTheInputText && 'popup__fieldset-input_inactive'} ${toggleOfTheInputText && 'popup__fieldset-input_type_error '}`}
          value={description || ""}
          onChange={handleChangeDescription}
          type="text"
          id="description-input"
          name="about"
          placeholder="О себе"
          required/>
        <span className={`description-input-error popup__fieldset-error ${errorMessage && 'popup__fieldset-error_active'}`}>
          {descriptionDirty && descriptionError}
        </span>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditProfilePopup;