import React from "react";
import "../App.css"

import { history } from "../redux/configureStore";

import Post from "../components/Post";
import LikePostList from "../components/LikePostList";
import DatePostList from "../components/DatePostList";
const MainPage = ()=>{
    const count = 1;
    //const is_token = localStorage.getItem("token")?true:false;
    const _is_token = count?true:false;
    return(
        <div>
            안녕 난 MainPage야
            <LikePostList />
            <DatePostList />
            {_is_token?
            <button className="writeButton" onClick={()=>{history.push("/write")}}>글 작성</button>
        :""}
        </div>
    )
}
export default MainPage;