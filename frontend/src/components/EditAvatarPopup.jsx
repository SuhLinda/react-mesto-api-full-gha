import React from 'react';
import PopupWithForm from './PopupWithForm.jsx';
import useFormAndValidationAvatar from '../hooks/useFormAndValidationAvatar.js';

function EditAvatarPopup({isOpen, onClose, onUpdateUserAvatar, isLoading, onValidate, errorMessage, toggleButtonState, toggleOfTheInputText}) {
  const {
    avatar,
    setAvatar,
    avatarDirty,
    setAvatarDirty,
    avatarError,
    setAvatarError,
    handleChangeAvatar,
    blurHandler
  } = useFormAndValidationAvatar();

  React.useEffect(() => {
    setAvatar("");
    setAvatarDirty(false);
    setAvatarError("");
  }, [isOpen]);

  function handleSubmitUserAvatar(evt) {
    evt.preventDefault();

    onUpdateUserAvatar({
      avatar: avatar
    });
  }

  return (
    <PopupWithForm
      name="popUpAvatarProfile"
      title="Обновить аватар"
      buttonText={isLoading? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitUserAvatar}
      onValidate={onValidate}
      toggleButtonState={toggleButtonState}
      errorMessage={errorMessage}
      toggleOfTheInputText={toggleOfTheInputText}>
      <fieldset className="popup__fieldset">
        <span className={`name-input-error popup__fieldset-error ${errorMessage && 'popup__fieldset-error_active'}`}>
          {avatarDirty && avatarError}
        </span>
        <input
          onBlur={blurHandler}
          className={`popup__fieldset-input ${toggleOfTheInputText && 'popup__fieldset-input_inactive'} ${toggleOfTheInputText && 'popup__fieldset-input_type_error '}`}
          value={avatar || ""}
          onChange={handleChangeAvatar}
          type="url"
          id="avatar-input"
          name="avatar"
          placeholder="Ссылка на картинку"
          required/>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
