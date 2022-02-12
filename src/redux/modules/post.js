import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import api from "../../api/api";


// actions
const GET_POST = "GET_POST";


// action creator
const getPost = createAction(GET_POST, (post_list) => ({ post_list }));


const initialState = {
    list: [],
}


// middleware actions
const getLikePostDB = () => {
    return async function (dispatch, getState) {
        await api.get('/', {
            params: {
                _limit: 4
            }
        })
            .then((response) => {
                console.log(response);
                // dispatch(getPost(response.data.sortbyLike));
            }).catch((err) => {
                console.log(err);
            })
    }
}

const getDatePostDB = () => {
    return async function (dispatch, getState) {
        await api.get('/', {
            params: {
                _limit: 10
            }
        })
            .then((response) => {
                console.log(response);
                dispatch(getPost(response.data.sortbyDate));
            }).catch((err) => {
                console.log(err)
            })
    }
}


// reducer
export default handleActions({
    [GET_POST]: (state, action) => produce(state, (draft) => {
        draft.list = action.payload.post_list;
    }),
}, initialState)


// action creator export
const actionCreators = {
    getPost,
    getLikePostDB,
    getDatePostDB,
};

export { actionCreators };