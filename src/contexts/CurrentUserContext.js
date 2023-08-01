import { createContext } from 'react';
import loading from '../images/profile-ava-load.png'

export const loadingUser = {
  avatar: `${loading}`,
  name: 'Загрузка...',
  about: 'Загрузка...',
}

export const CurrentUserContext = createContext(loadingUser);

