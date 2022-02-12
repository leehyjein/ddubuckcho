import React from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';

import './Login.css';

import { actionCreators as userActions } from '../redux/modules/user';


function Login(props) {
    const history = useHistory();
    const dispatch = useDispatch();

    const [id, setId] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleIdInput = (e) => {
        setId(e.target.value)
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = () => {
        if (id === "" || password === "") {
            window.alert("아이디 혹은 비밀번호가 공란입니다.")
            return;
        }
        dispatch(userActions.loginDB(id, password));
        history.push('/')
        console.log("로그인이 되었어요")
    }



    return (
        <>
            <h1 className="loginTitle">로그인</h1>
            <div className="loginContainer">
                <label> 아이디
                    <input
                        type="text"
                        className="loginIdInput"
                        onChange={handleIdInput}
                        placeholder="아이디를 입력해주세요."
                    />
                </label>
                <label> 비밀번호
                    <input
                        type="password"
                        className="loginPasswordInput"
                        onChange={handlePasswordInput}
                        placeholder="비밀번호를 입력해주세요."
                    />
                </label>
                <div
                    className="loginBtn"
                    onClick={handleLogin}
                >
                    로그인 하기
                </div>
            </div>
        </>
    );
}

export default Login;