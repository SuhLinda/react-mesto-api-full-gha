import React from "react";

function useFormAndValidationAvatar() {
  const [avatar, setAvatar] = React.useState("");
  const [avatarDirty, setAvatarDirty] = React.useState(false);
  const [avatarError, setAvatarError] = React.useState("Заполните это поле.");


  function handleChangeAvatar(evt) {
    setAvatar(evt.target.value);

    let pattern = "https://.*";
    if(pattern) {
      setAvatarError('Введите URL.');
    } else {
      setAvatarError("");
    }
  }

  const blurHandler = (evt) => {
    switch (evt.target.name) {
      case 'avatar':
        setAvatarDirty(true);
        break
    }
  }

  return {
    avatar,
    setAvatar,
    avatarDirty,
    setAvatarDirty,
    avatarError,
    setAvatarError,
    handleChangeAvatar,
    blurHandler};
}

export default useFormAndValidationAvatar;