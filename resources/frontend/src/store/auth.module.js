import axios from 'axios';
import tokenService from '@/services/token.service';

// actions
export const LOGIN = "login";
export const LOGOUT = "logout";
export const VERIFY_AUTH = "verifyAuth";
// mutations
export const SET_AUTH = "setAuth";
export const SET_MESSAGE = "setMessage";
export const SET_ERROR = "setError";
export const SET_USER = "setUser";
export const PURGE_AUTH = "purgeAuth";

const state = {
    isAuthenticated : !!tokenService.getToken(),
    user : {},
    token: '',
    message : '',
    error : {}
};

const getters = {
    isAuthenticated(state) {
        return state.isAuthenticated
    },
    getUser(state) {
        return state.user;
    }
};

const actions = {
    [LOGIN](context, credentials){
        return new Promise(resolve => {
            axios.post('api/auth/login', credentials).then(res => {
                context.commit(SET_AUTH, res.data.access_token);
                resolve(res);
            }).catch(err => {
                context.commit(SET_MESSAGE, 'You have entered an incorrect username or password');
                context.commit(SET_ERROR, err);
                resolve(err);
            });
        });
    },
    [LOGOUT](context) {
        context.commit(PURGE_AUTH);
    },
    [VERIFY_AUTH](context) {
        var token = tokenService.getToken();
        if (token) {
            axios.post('api/auth/me').then(res => {
                context.commit(SET_AUTH, tokenService.getToken());
                context.commit(SET_USER, res.data);
            }).catch(() => {
                context.commit(PURGE_AUTH);
                context.commit(SET_MESSAGE, 'Your session has expired.');
            });
        }
        else {
            context.commit(PURGE_AUTH);
        }  
    }
};

const mutations = {
    [SET_AUTH](state, token){
        state.isAuthenticated = true;
        tokenService.saveToken(token);
    }, 
    [SET_ERROR](state, error) {
        state.error = error;
    },
    [SET_USER](state, user) {
        state.user = user;
    },
    [SET_MESSAGE](state, message) {
        state.message = message
    },
    [PURGE_AUTH](state) {
        state.isAuthenticated = false;
        state.user = {};
        state.error = {};
        tokenService.destroyToken();
    }
};

export default {
  state,
  actions,
  mutations,
  getters
};