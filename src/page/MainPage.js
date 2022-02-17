import React,{ useState } from "react";
import "../App.css"
import { useSelector,useDispatch } from "react-redux";

import { history } from "../redux/configureStore";

import Post from "../components/Post";
import LikePostList from "../components/LikePostList";
import DatePostList from "../components/DatePostList";
import Spinner from "../elements/Spinner";

const MainPage = ()=>{
    const test = useSelector(state => state.user);
    const [loading, setLoading]= useState(true);
    const is_token = localStorage.getItem("token")?true:false;
    // const _is_token = count?true:false;
    // const is_loading =useSelector((state)=>state.post.is_loading)
    // const paging = useSelector((state)=>state.post.paging)
   
    React.useEffect(() => {
        let timer= setTimeout(()=>{
            setLoading(false)
        },1000)
                
        }, [])
    return(
        
        <div className="mainImage">
        <div className="mainContainer">
            {loading?(<Spinner type={'page'} is_dim={true}/>):
            <div>
             <div className="LikeList">
            <LikePostList />
            </div>
            <DatePostList />
            </div>}
            {is_token?
            <button className="writeButton" onClick={()=>{history.push("/write")}}>📝</button>
        :""}
        </div>
        </div>
    )
}
export default MainPage;