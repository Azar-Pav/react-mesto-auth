import React from 'react';
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({ onSubmit, isOpen, onClose, isLoading }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <PopupWithForm name="deleteConfirm" title="Вы уверены?"
      buttonText={"Да"}
      buttonTextLoad={"Удаление..."}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
    />
  );
}

export default ConfirmDeletePopup;
