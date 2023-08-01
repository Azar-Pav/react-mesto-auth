import React, { useContext } from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentButtonTextContext } from '../contexts/CurrentButtonTextContext';

function ConfirmDeletePopup(props) {
  const currentButton = useContext(CurrentButtonTextContext);

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit();
  }

  return (
    <>
      <PopupWithForm name="deleteConfirm" title="Вы уверены?"
        buttonText={currentButton.confirmDeletePopup}
        onSubmit={handleSubmit}
        isOpen={props.isOpen._id}
        onClose={props.onClose}
        isLoading={currentButton.isLoading}
      />
    </>
  );
}

export default ConfirmDeletePopup;
