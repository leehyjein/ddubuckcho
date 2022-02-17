import React, { useState } from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import "../App.css";
import { actionCreators as userActions } from "../redux/modules/user";
import Button from "@material-ui/core/Button";

const Signup = (props) => {
const dispatch=useDispatch()
  const [values, setValues] = useState({
    loginId: "",
    password: "",
    passwordConfirm: "",
    name: "",
  });
 
 

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);


  const specialLetter = values.loginId.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

  const handleId = (e) => {
    setValues({ ...values, loginId: e.target.value });
  };

  const handlePassword = (e) => {
    setValues({ ...values, password: e.target.value });
  };

  const handlePasswordConfirm = (e) => {
    setValues({ ...values, passwordConfirm: e.target.value });
  };

  const handleName = (e) => {
    setValues({ ...values, name: e.target.value });
  };
  const handleSpecialLetter = (e) => {
    setValues({...values, specialLetter: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(
      values.loginId && 
      values.password &&
       values.passwordConfirm && 
       values.name
       ){
      setValid(true);
    } 

    if(values.loginId ==='' || 
        values.password === '' || 
        values.passwordConfirm === '' || 
        values.name === ''
        ){
      window.alert("아이디, 패스워드, 닉네임을 모두 입력해주세요!😅");
      return;
    }

    if(values.password !== values.passwordConfirm){
    window.alert("앗! 비밀먼호가 일치하지 않아요! 😅");
    return;
    }

    if (values.loginId.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi) !== -1) {
      window.alert("ID에 특수 문자는 안돼요!😅");
      return;
    }
    
    setSubmitted(true);
    dispatch(userActions.signup(values.loginId, values.password, values.passwordConfirm, values.name ));
  }


  return (
    
    <div className="SignupImage">
      {/*<img src= "https://community12345.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20220214_061437575.jpg"></img>*/}
      <div className="Signup_Container">
      <div className="Signup_Title">
          <h2>Join Us!</h2>
        </div>
        <form className="register-form" onSubmit={handleSubmit}>
          
        <div className="placeholder-list">
          <input 
            onChange={handleId}
            value={values.loginId}
          placeholder="ID" 
          className="form-field"
          name="loginId"
            minLength="6"
          />
          {submitted && !values.loginId ? (
          <p>   <span style={{ color: "#ff2667" }}>6글자 이상 입력해주세요😅❕</span></p> ) : null}


          <input 
          onChange={handlePassword}
          value={values.password}
          type="Password"
          placeholder="Password" 
          className="form-field"
          name="password"
          minLength="6"
          />
          {submitted && !values.password ? (
           <p>  <span style={{ color: "#ff2667" }}>6글자 이상 입력해주세요😅❕</span></p>
          ) : null}

          <input 
          onChange={handlePasswordConfirm}
          value={values.passwordConfirm}

          placeholder="Password Check" 
          type="Password"
          className="form-field"
          name="passwordConfirm"
          minLength="6"
          />
           {submitted && !values.passwordConfirm ? (
           <p> <span style={{ color: "#ff2667" }}>6글자 이상 입력해주세요😅❕</span></p>
          ) : null}

          <input 
          onChange={handleName}
          value={values.name}
          placeholder="Name" 
          className="form-field"
          name="name"
          minLength="1"
          />
          {submitted && !values.passwordConfirm ? (
            <p><span style={{ color: "#ff2667" }}>빈칸이에요😅❕</span></p>
          ) : null}
          <p />

        </div>
        <div className="Signup_btn">
          <Button
            variant="contained"
            color="primary"
            box-shadow="0px 7px 3px rgba(0, 0, 0, 0.2)"
            type="submit"
            onClick={() => {}}
          >
           Submit✉
          </Button>
        </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;