import React from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Button from "@material-ui/core/Button";

import '../App.css';

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
        
    }



    return (
        <>
        <div className="loginImage">
        <div className="login">
        <div className="loginContainer">
        <div className="login_Title"><h2>Login!</h2></div>
                <input
                    type="text"
                    className="loginIdInput"
                    onChange={handleIdInput}
                    placeholder="ID"
                />
       
                <input
                    type="password"
                    className="loginPasswordInput"
                    onChange={handlePasswordInput}
                    placeholder="Password"
                />
           
            <div className="loginBtn">
                <Button
                 variant="contained"
                 color="primary"
                 box-shadow="0px 7px 3px rgba(0, 0, 0, 0.2)"
                 type="submit"
                 onClick={handleLogin}
                >
                Submit✉
                </Button>
            </div>
        </div>
        </div>
        </div>
    </>
    );
}

export default Login;