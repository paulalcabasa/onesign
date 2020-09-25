const TOKEN_ID = 'os-token';

export const saveToken = token => {
    window.localStorage.setItem(TOKEN_ID, token);
};

export const getToken = () => {
    return window.localStorage.getItem(TOKEN_ID);
};

export const destroyToken = () => {
    window.localStorage.removeItem(TOKEN_ID);
};

export default {
    saveToken,
    getToken,
    destroyToken
}