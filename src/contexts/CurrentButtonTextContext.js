import { createContext } from 'react';

export const buttonText = {
  noLoading: {
    formPopup: 'Сохранить',
    confirmDeletePopup: 'Да',
    isLoading: false,
  },
  loading: {
    formPopup: 'Сохранение...',
    confirmDeletePopup: 'Удаление...',
    isLoading: true,
  },
}

export const CurrentButtonTextContext = createContext(buttonText);

