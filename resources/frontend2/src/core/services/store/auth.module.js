//import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";

import axios from 'axios';
// action types
export const VERIFY_AUTH = "verifyAuth";
export const LOGIN = "login";
export const LOGOUT = "logout";
export const REGISTER = "register";
export const UPDATE_PASSWORD = "updateUser";

// mutation types
export const PURGE_AUTH = "logOut";
export const SET_AUTH = "setUser";
export const SET_PASSWORD = "setPassword";
export const SET_ERROR = "setError";
export const SET_MESSAGE = "setMessage";
export const GET_MESSAGE = "getMessage";

const state = {
  errors: null,
  user: {},
  isAuthenticated: !!JwtService.getToken(),
  message : ""
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  getMessage(state) {
    return state.message;
  }
};

const actions = {
  [LOGIN](context, credentials) {
   return new Promise(resolve => {
     context.commit(SET_MESSAGE,'');
      axios.post('api/auth/login', credentials).then(res => {
        context.commit(SET_AUTH, res.data);
        resolve(res);
      }).catch(error => {
          console.log(error);
          context.commit(SET_MESSAGE, 'You have entered an incorrect username or password');
          context.commit(SET_ERROR, error);
          resolve(error);
      });
   });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  },

  [VERIFY_AUTH](context) {
    
    if (JwtService.getToken()) {
      axios.post("api/auth/me")
        .then(({ data }) => {
          
          var userData = {
            token : JwtService.getToken(),
            user  : data
          };
          context.commit(SET_AUTH, userData);
        })
        .catch(({ response }) => {
          context.commit(SET_MESSAGE, 'Your session has expired.');
          context.commit(SET_ERROR, response.data.errors);
        });
    } else {
      context.commit(PURGE_AUTH);
    }
  },
 
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state, payload) {
    state.isAuthenticated = true;
    state.user = payload.user;
    state.errors = {};
    JwtService.saveToken(payload.token);
  },
  [SET_PASSWORD](state, password) {
    state.user.password = password;
  },
  [SET_MESSAGE](state, message) {
    state.message = message;
  },
  [PURGE_AUTH](state) {
  //  console.log("purging now");
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyToken();
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
