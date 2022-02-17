import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import api from "../../api/api"


// actions
const GET_COMMENT = "GET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";
const EDIT_COMMENT = "EDIT_COMMENT";

// action creators
const getComment = createAction(GET_COMMENT, (postId, comment_list) => ({ postId, comment_list }));
const addComment = createAction(ADD_COMMENT, (postId, comment, name, date, is_me) => ({ postId, comment, name, date, is_me }));
const deleteComment = createAction(DELETE_COMMENT, (postId, commentId) => ({ postId, commentId }))
const editComment = createAction(EDIT_COMMENT, (postId, commentId, newComment) => ({ postId, commentId, newComment }))

//initialState
const initialState = {
    list: {},
}

//middleware actions
const getCommentDB = (postId) => {
    return async function (dispatch, getState) {
        if (!postId) {
            return;
        }

        await api.get(`/api/comments/${postId}`)
            .then((response) => {
                dispatch(getComment(postId, response.data.comments))
            }).catch((err) => {
                console.log("댓글 가져오기 실패", postId, err);
            })
    }
}

const addCommentDB = (postId, comment = {}) => {
    return async function (dispatch, getState) {
        const token = localStorage.getItem('token');

        await api.post(`/api/make_comment/${postId}`, { 'comment': comment.comment },
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        ).then(function (response) {
            const res = response.data.data;
            let is_me = true;
            dispatch(addComment(postId, res.comment, res.name, res.date, is_me))
        }).catch((err) => {
            console.log("댓글 추가하기 실패", postId, err);
        })
    }
}

const deleteCommentDB = (postId,commentId) => {
    return async function (dispatch, getState) {
        const token = localStorage.getItem('token');
        await api.delete(`/api/comment/delete/${commentId}`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        ).then(function (response) {
            dispatch(deleteComment(postId, commentId))
        }).catch((err) => {
            console.log("댓글 삭제가 실패했습니다.", err)
        })
    }
}
const editCommentDB = (postId, commentId, newComment) => {
    return async function (dispatch, getState) {
        const token = localStorage.getItem('token');
        await api.put(`/api/comment/update/${commentId}`, { 'comment': newComment },
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        ).then(function (response) {
            dispatch(editComment(postId, commentId, newComment));
        }).catch((err) => {
            console.log("댓글 수정에 실패했습니다.", err)
        })
    }
}

//reducer
export default handleActions({
    [GET_COMMENT]: (state, action) => produce(state, (draft) => {
        draft.list[action.payload.postId] = action.payload.comment_list;
    }),

    [ADD_COMMENT]: (state, action) => produce(state, (draft) => {
        draft.list[action.payload.postId].unshift(action.payload);
    }),

    [DELETE_COMMENT]: (state, action) => produce(state, (draft) => {
        const filter_comment = draft.list[action.payload.postId].filter((c) => c.commentId !== action.payload.commentId)
        draft.list[action.payload.postId] = filter_comment;
    }),

    [EDIT_COMMENT]: (state, action) => produce(state, (draft) => {
        const newComments = draft.list[action.payload.postId].find((c) => c.commentId === action.payload.commentId)
        newComments.comment = action.payload.newComment;
    })
},
    initialState
);


const actionCreators = {
    getCommentDB,
    getComment,
    addCommentDB,
    addComment,
    deleteCommentDB,
    deleteComment,
    editCommentDB,
    editComment,
};

export { actionCreators };