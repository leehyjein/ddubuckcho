import React, { useState } from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import "./Signup.css";

const Signup = (props) => {

  

  const [id, setId] = React.useState("");

  const [values, setValues] = useState({
    loginId: "",
    password: "",
    passwordConfirm: "",
    name: "",
    specificCharacter: "/[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi",
  });
 
 

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if(values.loginId && values.password && values.passwordConfirm && values.name){
      setValid(true);
    } 

    if(values.loginId ==='' || values.password === '' || values.passwordConfirm === '' || values.name === ''){
      window.alert("아이디, 패스워드, 닉네임을 모두 입력해주세요!😅");
      return;
    }

    if(values.password !== values.passwordConfirm){
    window.alert("앗! 비밀먼호가 일치하지 않아요! 😅");
    return;
    }

    if( values.loginId === values.specificCharacter){
      window.alert("특수 문자는 안돼요!😅");
      return;
    }
    setSubmitted(true);
  }

  



  return (
    
    <div className="form-container">
      
      <div className="input-container">
      <form className="register-form" onSubmit={handleSubmit}>
       {submitted && valid ? <div className="Success-message"><span style = {{color:"white"}}>회원가입에 성공했어요😊🎉</span> </div>: null}
          <input
          onChange={handleId}
          value={values.loginId}
          className="form-field"
          placeholder="Id (6글자 이상)"
          name="loginId"
          minlength="6"
        />
        <p/>
        {submitted && !values.loginId ? <span style = {{color:"red"}}>6글자 이상 입력해주세요😅❕</span> :null}
          <p/>
          <input
          onChange={handlePassword}
          value={values.password}
          className="form-field"
          placeholder="Pw (6글자 이상)"
          name="password"
          minlength="6"
        />
        <p/>
         {submitted && !values.password ? <span style = {{color:"red"}}>6글자 이상 입력해주세요😅❕</span> :null}
         <p/>
        <input
          onChange={handlePasswordConfirm}
          value={values.passwordConfirm}
          className="form-field"
          placeholder="Pw Check (6글자 이상)"
          name="passwordConfirm"
          minlength="6"
        />
        <p/>
         {submitted && !values.passwordConfirm ? <span style = {{color:"red"}}>6글자 이상 입력해주세요😅❕</span> :null}
         <p/>
        <input
          onChange={handleName}
          value={values.name}
          className="form-filed"
          placeholder="Name"
          name="name"
          minlength="1"
        />
        <p/>
        {submitted && !values.passwordConfirm ? <span style = {{color:"red"}}>빈칸이에요😅❕</span> :null}
        <p/>
        <button className="button" type="submit" onClick={()=>{}}>
        <span style = {{color:"#0054FF"}}>회원가입 하기!</span>
        </button>
      </form>
      </div>
    </div>
  );
}

export default Signup;
