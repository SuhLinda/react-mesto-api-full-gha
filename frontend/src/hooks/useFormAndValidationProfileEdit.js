import React  from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function useFormAndValidationProfileEdit() {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);
  const [nameDirty, setNameDirty] = React.useState(false);
  const [descriptionDirty, setDescriptionDirty] = React.useState(false);
  const [nameError, setNameError] = React.useState("Заполните это поле.");
  const [descriptionError, setDescriptionError] = React.useState("Заполните это поле.");

  function handleChangeName(evt) {
    setName(evt.target.value);
    if(evt.target.value.length < 2 || evt.target.value.length > 200) {
      setNameError('Текст должен быть не короче 2 символов');
      if(!evt.target.value) {
        setNameError('Текст должен быть не короче 2 символов');
      }
    } else {
      setNameError("");
    }
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
    if(evt.target.value.length < 2 || evt.target.value.length > 40) {
      setDescriptionError('Текст должен быть не короче 2 символов');
      if(!evt.target.value) {
        setDescriptionError('Текст должен быть не короче 2 символов');
      }
    } else {
      setDescriptionError("");
    }
  }

  const blurHandler = (evt) => {
    switch (evt.target.name) {
      case 'name':
        setNameDirty(true);
        break
      case 'about':
        setDescriptionDirty(true);
        break
    }
  }

  return {
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
  }
}

export default useFormAndValidationProfileEdit;