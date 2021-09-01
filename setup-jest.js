
import $ from 'jquery';
global.$ = global.jQuery = $;

import {localStorageMock} from "./src/__mocks__/localStorage"

export const setupLocaleStorage = (userType) => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock })
    window.localStorage.setItem('user', JSON.stringify({ type: userType }))
}