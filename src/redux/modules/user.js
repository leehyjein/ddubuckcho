import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import api from "../../api/api";


// actions
const LOGIN = "LOGIN";


// action creator
const login = createAction(LOGIN, (user) => ({ user }));


const initialState = {
    user: null,
    is_login: false,
}


// middleware actions
const loginDB = (id, password) => {
    return function (dispatch, getState) {
        const data = {
            loginId: id,
            password: password,
        }
        dispatch(login(data.name));
        api.post('/login', data)
            .then((response) => {
                console.log(response);
                if (response.token) {
                    localStorage.setItem('token', response.token);
                    dispatch(login(response.name))
                }
            }).catch((err) => {
                console.log(err);
            })
    }
}


// reducer
export default handleActions({
    [LOGIN]: (state, action) => produce(state, (draft) => {
        draft.name = action.payload.user
    }),
}, initialState)


// action creator export
const actionCreators = {
    login,
    loginDB,
};

export { actionCreators };