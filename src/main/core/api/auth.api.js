/* global process */
import { openInPopup } from '../../utils/popupManager';
import server from '../server';

const apiUrl = process.env.SERVER_API_URL;

export const signUpViaLocal = (credentials) =>
  Promise.resolve(server.post('/accounts', credentials));

export const signInViaLocal = ({ login, password }) =>
  Promise.resolve(server.post('/auth/local', {
    login,
    password,
  })).then((response) => response.data.token);

export const bindAccountToLocal = () =>
  Promise.resolve(server.post('/auth/local/bind'))
    .then(response => response.json());

export const signInViaFacebook = () => openInPopup(`${apiUrl}/auth/facebook.authentication`);

export const bindAccountToFacebook = () => openInPopup(`${apiUrl}/auth/facebook.authorization`);

export const signInViaGoogle = () => openInPopup(`${apiUrl}/auth/google.authentication`);

export const bindAccountToGoogle = () => openInPopup(`${apiUrl}/auth/google.authorization`);

export const invalidateToken = () =>
  // invalidate token
  Promise.resolve(true);
