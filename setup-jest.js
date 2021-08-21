import $ from 'jquery';
global.$ = global.jQuery = $;

/**
* @jest-environment jsdom
*/

import {localStorageMock} from "./src/__mocks__/localStorage";
export const setLocalStorage = (user) => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock })
    window.localStorage.setItem('user', JSON.stringify({ type: user, email: 'gautier@gmail.com' }))
}
