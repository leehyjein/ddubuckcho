import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import moment from "moment"
import api from "../../api/api"

// actions
const SET_PREVIEW = "SET_PREVIEW"
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const UPLOADING = "UPLOADING";

const EDIT_LIKE = "EDIT_LIKE"

const LOADING = "LOADING";
const ONE_POST = "ONE_ITEM";
const GET_POST = "GET_POST";
const GET_POST2="GET_POST2";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";

// action creators
const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({ image_url }))


const editLike =createAction(EDIT_LIKE, (post_id,post_like) => ({post_id,post_like}));
//const addPost = createAction(ADD_POST, (post) => ({ post }));
//const editPost = createAction(EDIT_POST, (post_id, post) => ({ post_id, post }));
const loading = createAction(LOADING, (is_loading) => ({is_loading}))
const onePost = createAction(ONE_POST, (post)=>({post}));
const getPost = createAction(GET_POST, (post_list) => ({ post_list }));
const getPost2 = createAction(GET_POST2, (post_list) => ({ post_list }));


// initial state

const initialState = {
    thumbnail: "http://via.placeholder.com/400x300",
    uploading: false,
    preview: null,
    title: "",
    contents: "",
    comment_cnt: 5,
    insert_dt: moment().format("YYYY-MM-DD HH:mm:ss"),
    list: [],
    list2:[],
    like: [],
    paging:{start:null,next: null,size:3},
    is_loading: false,
    
    
};


//미들웨어
const nori = () => {
    return async function (dispatch, getState, { history }) {
        
         const token = localStorage.getItem('token');
        //  const form = new FormData()
        //  form.append('hi', 40)
        await api.get("/api/post_list",)
        .then(function (response) {
            console.log(response)
            //dispatch(loadItem(response.data.result));

        })

    }

}
const getLikePostDB = () => {
    return async function (dispatch, getState) {
        //console.log("getLikePostDB")
        const token = localStorage.getItem('token');
        await api.get('/api/post_list',{
            headers: {
                Authorization:
                    `${token}`
            }
        }
        )
            .then((response) => {
                //console.log("LikePst",response.data.sortByLike);
                 dispatch(getPost(response.data.sortByLike));
                 
            }).catch((err) => {
                console.log(err);
            })
    }
}

const getDatePostDB = () => {
    return async function (dispatch, getState) {
       // console.log("getDatePostDB")
       const token = localStorage.getItem('token');
        dispatch(loading(true));
        await api.get('/api/post_list',{
            headers: {
                Authorization:
                    `${token}`
            }
        }
        )
            .then((response) => {
                console.log((response.data.sortByNew)) 
                dispatch(getPost2(response.data.sortByNew));
                 
            }).catch((err) => {
                console.log(err)
            })
    }
}
const getOnePost = (postid) => {
    return async function (dispatch, useState, {history}){
      await api.get(`/api/detail/${postid}`).then(function(response){
        console.log("하나 받아라",response.data.post);
        dispatch(onePost(response.data.post));
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
      const test =getState().post.list
      
      const _post = getState().post.list[_post_idx];
      
     const _post_like = _post.like_id
    
     _post_like.map((c,idx)=>{
        if(c === user_id){
            is_like= true;
            console.log("있니?")
        } 
    })
    if(is_like){
    const idx = _post_like.findIndex((p)=> p ===user_id);
    console.log("있니?")
    const post_like =_post_like.filter((l, i) => {return idx !== i;})
     api.put(`/api/deleteLike/${post_id}`, null,
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
        api.put(`/api/editLike/${post_id}`,null,
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
        form.append('thumbnail',post.thumbnail)
         console.log("post",post)
        // console.log("form",form)
        await api.post("/api/post",form,{                
                headers: {
                    Authorization:`Bearer ${token}`
                }
            }
        ).then(function (response) {
                console.log("안녕 나는 미들웨어 add",response)
                history.push('/')
                window.location.reload();
              }).catch(error => {
                window.alert("작성내용을 다시 확인해주세욥~!");
            });
    }
}

const editPostDB = (postId, post = {}) => {
    return async function (dispatch, getState, { history }) {
           const form = new FormData()
          const token = localStorage.getItem('token');
         form.append('title', post.title)
        form.append('contents', post.contents)
         //if(post.thumbnail){
        form.append('editThumbnail', post.thumbnail)
        //console.log("난 나오면 안돼")
    //}
        //form.append('images', file2)
        console.log(post.thumbnail)
        await api.put(`/api/update/${postId}`, form,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        ).then(function (response) {
            console.log("안녕 난 미들웨어 edit", response)
          history.push('/');
           // window.location.reload('/');
        }).catch(error => {
            window.alert("작성내용을 다시 확인해주세욥~!");
        });
    }
}

const deletePostDB = (postId) => {
    return async function (dispatch, getState, { history }) {
        const token = localStorage.getItem('token');
        await api.delete(`/api/delete/${postId}`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        ).then(function (response) {
            console.log("안녕 난 미들웨어 delete", response)
            //window.alert("삭제 완료되었습니다.");
            window.location.href = "/";
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
                console.log("action.payload.preview",action.payload.preview)
            }),
            [LOADING]: (state, action) => produce(state, (draft) => {
                draft.is_loading = action.payload.is_loading
               // console.log("로딩",action.payload.is_loading)
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
            let idx2 = draft.list2.findIndex((p)=> p.id===action.payload.post_id);
            console.log("idx",idx)
            console.log("idx2",idx2)
            
             draft.list[idx].like_id=action.payload.post_like
             draft.list2[idx2].like_id=action.payload.post_like
             console.log("action.payload.post_like",action.payload.post_like)
           }),
           [ONE_POST] : (state, action) => produce(state,(draft) => {
            
            console.log("액션에서 받아라",action.payload.post)
            draft.one_post = action.payload.post
          }),
           [GET_POST]: (state, action) => produce(state, (draft) => {
            draft.list = action.payload.post_list;
            //console.log("draft.list",draft.list)
        }),[GET_POST2]: (state, action) => produce(state, (draft) => {
            draft.list2 = action.payload.post_list;
            console.log("draft.list2", action.payload.post_list)
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
    getDatePostDB,
    getPost2,
    getOnePost
};

export { actionCreators };