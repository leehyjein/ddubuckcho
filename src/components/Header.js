import React from "react";
import "../App.css"

import {history} from "../redux/configureStore";
import { RESP } from "../response/response";

const Header =() =>{
    const count = 0;
    const _is_token = count?true:false;
    //const is_token = localStorage.getItem("token")?true:false;
    console.log(_is_token)
   if(_is_token){
       return(
           <div className="Header">
               <div >
                안녕 나는 사진이야
            <img src=""/>
            </div>
            <p>뚜벅초가 뚜벅뚜벅</p>
            <div>
                <button onClick={()=>{
                    history.push("/")
                }}>홈</button>
                <button>로그아웃</button>
            </div>
           </div>
       )
   }
    return(
        <div className="Header">
            <div>
            안녕나는 사진이야
            <img src=""/>
            </div>
            <p>뚜벅초가 뚜벅뚜벅</p>
            <div>
                <button onClick={()=>{
                    history.push("/")
                }}>홈</button>
                <button onClick={()=>{
                    history.push("/login")
                }}>로그인</button>
                <button onClick={()=>{
                    history.push("/signup")
                }}>회원가입</button>
            </div>
        </div>
    )
}

export default Header