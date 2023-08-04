import React from 'react';

function useFormAndValidationAddPlace() {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  const [nameDirty, setNameDirty] = React.useState(false);
  const [linkDirty, setLinkDirty] = React.useState(false);
  const [nameError, setNameError] = React.useState('Заполните это поле.');
  const [linkError, setLinkError] = React.useState('Заполните это поле.');

  function handleChangeName(evt) {
    setName(evt.target.value);
    if (evt.target.value.length < 2 || evt.target.value.length > 30) {
      setNameError('Текст должен быть не короче 2 символов');
      if (!evt.target.value) {
        setNameError('Текст должен быть не короче 2 символов');
      }
    } else {
      setNameError('');
    }
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);

    const pattern = 'https://.*';
    if (pattern) {
      setLinkError('Введите URL.');
    } else {
      setLinkError('');
    }
  }

  const blurHandler = (evt) => {
    switch (evt.target.name) {
      case 'name':
        setNameDirty(true);
        break;
      case 'link':
        setLinkDirty(true);
        break;
    }
  };

  return {
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
    blurHandler,
  };
}

export default useFormAndValidationAddPlace;
