import { applyMiddleware } from "redux";
import { createAction, handleActions } from "redux-actions";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
import { produce } from "immer";
import api from "../../api/posts";

// actions
const GET_USER = "GET_USER";
// const SET_USER = "SET_USER";

// action creators
const getUser = createAction(GET_USER, (user) => ({ user }));
// const setUser = createAction(SET_USER, (user) => ({ user }));

//initialState
const initialState = {
  name: null,
  is_login: false,
  id_check: null,
  nick_check: null,
};

//middleware
const signup = (loginId, password, passwordConfirm, name) => {
  return async function (dispatch, getState, { history }) {
    console.log(history);
    const userInfo = {
      id: loginId,
      pwd: password,
      pwdconfirm: passwordConfirm,
      nickname: name,
    };

    await api
      .post("/api/signup", userInfo)
      .then(function (response) {
        history.push("/login");
      })
      .catch((err) => {
        window.alert("회원가입에 실패했어요😥");
      });
  };
};

export default handleActions(
  {
    //[SET_USER]: (state, action) =>
     // produce(state, (draft) => {
        //setCookie("is_login", "success");
       // draft.user = action.payload.user;
       // draft.is_login = true;
     // }),

    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

const actionCreators = {
  getUser,
  //setUser,
};

export { actionCreators };
