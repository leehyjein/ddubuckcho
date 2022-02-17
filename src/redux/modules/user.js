import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import api from "../../api/api"


//actions
const LOGIN = "LOGIN";
const GET_USER = "GET_USER";
const LOG_OUT = "LOG_OUT";
// const GET_USER = "GET_USER";
// const SET_USER = "SET_USER"


//action creators
const login = createAction(LOGIN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({user}));
const getUser = createAction(GET_USER, (user) => ({ user }));

//initialState
const initialState = {
    user: null,
    is_login: true,
    name: null,
    
      
}


//middleware actions
const loginDB = (loginId, password) => {
    return async function (dispatch, getState,{history}) {
        const data = {
            loginId: loginId,
            password: password,
        }
        //dispatch(login(data.loginId));
        await api.post('/api/login', data)
            .then((response) => {
                console.log(response);
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('name', response.data.loginId);
                    dispatch(login(response.data.name))
                    // history.push('/')
                    window.location.replace("/")
                    
                    console.log("로그인이 되었어요")
                }
            })
            .catch((err) => {
               console.log(err);
               window.alert("아이디와 비밀번호가 일치하지 않습니다.")
        })
    }
}
const signup = (loginId, password, passwordConfirm, name) => {
    return async function (dispatch, getState, { history }) {
      
      const userInfo = {
        loginId: loginId,
        password: password,
        confirmPassword: passwordConfirm,
        name: name,
      };
      console.log("회원가입중2")
      await api
        .post("/api/signup", userInfo)
        .then(function (response) {
            console.log(response)
          history.push("/login");
        })
        .catch((err) => {
          window.alert("회원가입에 실패했어요😥");
        });
    };
  };

//reducer
export default handleActions({
    [LOGIN]: (state, action) => produce(state, (draft) => {
        draft.name = action.payload.user
        console.log("action.payload.user",action.payload.user)
    }),
    [LOG_OUT]: (state, action) =>
    produce(state, (draft) => {
        localStorage.removeItem("name")
        localStorage.removeItem("token")
        window.location.replace("/")
        console.log("로그아웃합니다")
    }),
},
    initialState
);

//action creator export
const actionCreators = {
    login,
    loginDB,
    getUser,
    signup,
    logOut
};

export { actionCreators }