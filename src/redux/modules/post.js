import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import moment from "moment"
import api from "../../api/api"

// actions
const SET_PREVIEW = "SET_PREVIEW"
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const UPLOADING = "UPLOADING";

const EDIT_LIKE = "EDIT_LIKE"

const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";

// action creators
const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({ image_url }))


const editLike =createAction(EDIT_LIKE, (post_id,post_like) => ({post_id,post_like}));
//const addPost = createAction(ADD_POST, (post) => ({ post }));
//const editPost = createAction(EDIT_POST, (post_id, post) => ({ post_id, post }));
const getPost = createAction(GET_POST, (post_list) => ({ post_list }));


// initial state
const initialState = {
    image_url: "http://via.placeholder.com/400x300",
    uploading: false,
    preview: null,
    contents: "",
    comment_cnt: 5,
    insert_dt: moment().format("YYYY-MM-DD HH:mm:ss"),
    list: [],
    like: []
};


//미들웨어
const nori = () => {
    return async function (dispatch, useState, { history }) {
        await api.get("/").then(function (response) {
            console.log(response)
            //dispatch(loadItem(response.data.result));

        })

    }

}
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



const LikeDB = (post_id, user_id)=>{
    return  function(dispatch, getState, {history}){
        
      if(!post_id)
      {
        console.log("게시물 정보 앖음")
        return;
      }
      const token = localStorage.getItem('token');
      let is_like=false
      const _post_idx = getState().post.list.findIndex(p=>p.id ===post_id);
      const _post = getState().post.list[_post_idx];
     const _post_like = _post.like
     _post_like.map((c,idx)=>{
        if(c === user_id){
            is_like= true;
        } 
    })
    if(is_like){
    const idx = _post.like.findIndex((p)=> p ===user_id);
    const post_like =_post_like.filter((l, i) => {return idx !== i;})
    //await
     api.put(`/`, {like:post_like},
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        ).then(function (response) {
            console.log("안녕 난 미들웨어 like빼기이얌", response)
           //history.push('/');
           // window.location.reload('/');
        })
    dispatch(editLike(post_id,post_like));
    }else{
      const post_like = [..._post_like,user_id]
        api.post("/", user_id,
      {
          headers: {
              Authorization:`Bearer ${token}`
          }
      }
  ).then(function (response) {
          console.log("안녕 나는 미들웨어 like추가이얌",response)
         // history.push('/');
         // window.location.reload();
       // }).catch(error => {
         // console.log(error.message);
      });

      dispatch(editLike(post_id,post_like));
      }
    }
  }


const addPostDB = (post = {}) => {
    return async function (dispatch, useState, { history }) {
         const token = localStorage.getItem('token');
        const form = new FormData()
        form.append('title', post.title)
        form.append('contents', post.contents)
        console.log(post,form)
        await api.post("/", post,
            {
                headers: {
                    Authorization:`Bearer ${token}`
                }
            }
        ).then(function (response) {
                console.log("안녕 나는 미들웨어 add",response)
               // history.push('/');
               // window.location.reload();
             // }).catch(error => {
               // console.log(error.message);
            });
    }
}

const editPostDB = (postId, post = {}) => {
    return async function (dispatch, getState, { history }) {
        //   const form = new FormData()
          const token = localStorage.getItem('token');
       // form.append('title', title)
       // form.append('content', textarea)
        //form.append('thumbnail', file)
        //form.append('images', file2)
        await api.put(`/post/${postId}`, post,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        ).then(function (response) {
            console.log("안녕 난 미들웨어 edit", response)
           //history.push('/');
           // window.location.reload('/');
        })
    }
}

const deletePostDB = (postId) => {
    return async function (dispatch, getState, { history }) {
        const token = localStorage.getItem('token');
        await api.delete(`/api/post/${postId}`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        ).then(function (response) {
            console.log("안녕 난 미들웨어 delete", response)
            //window.alert("삭제 완료되었습니다.");
           // window.location.href = "/";
        })
    }
}

// reducer
export default handleActions(
    {
        [UPLOADING]: (state, action) =>
            produce(state, (draft) => {
                draft.uploading = action.payload.uploading;
            }),
        [SET_PREVIEW]: (state, action) =>
            produce(state, (draft) => {
                draft.preview = action.payload.preview;
                console.log(draft.preview)
            }),

        [ADD_POST]: (state, action) => produce(state, (draft) => {
            console.log("안녕 난 리듀서 추가얌 ")
            // draft.list.unshift(action.payload.post);
        }),
        [EDIT_POST]: (state, action) => produce(state, (draft) => {
            console.log("안녕 난 리듀서 편집이얌 ")
            // let idx = draft.list.findIndex((p)=> p.id===action.payload.post_id);
            // draft.list[idx]={...draft.list[idx], ...action.payload.post};
        }),
        [EDIT_LIKE]: (state, action) => produce(state, (draft) => {
            let idx = draft.list.findIndex((p)=> p.id===action.payload.post_id);
             draft.list[idx].like=action.payload.post_like
           }),
           [GET_POST]: (state, action) => produce(state, (draft) => {
            draft.list = action.payload.post_list;
        }),

    },
    initialState
);
const actionCreators = {
    setPreview,
    uploadImage,
    addPostDB,
    nori,
    deletePostDB,
    editPostDB,
    LikeDB,
    getPost,
    getLikePostDB,
    getDatePostDB
};

export { actionCreators };