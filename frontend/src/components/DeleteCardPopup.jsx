import PopupWithForm from "./PopupWithForm.jsx";

function DeleteCardPopup({isOpen, onClose, onDeleteCard, isLoading}) {
  function handleSubmitDeleteCard(evt) {
    evt.preventDefault();

    onDeleteCard();
  }

  return (
    <PopupWithForm
    name="popupDeleteCard"
    title="Вы уверены?"
    buttonText={isLoading? "Удаление..." : "Да"}
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmitDeleteCard} />
  )
}

export default DeleteCardPopup;