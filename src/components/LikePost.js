import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Like from "../elements/Like";

import { actionCreators } from "../redux/modules/post";

function LikePost(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    //const user_id = useSelector((state) => state.user);
   // const post_id = useSelector((state) => state.post)
    // const post_list = useSelector((state)=>state.post.list)
    // const post_like_id_list = useSelector((state)=>state.post.list)
    const [like, setLike] = useState(false)
    const [Heart, setHeart] = useState(props.like_id.length)
    const name = localStorage.getItem("name");
    const is_token = localStorage.getItem("token")?true:false;
    //  const idx = post_list.findIndex((p)=> p.id ===props.id);
    //  const post= post_list[idx]
    //  const count =post.like?post.like:props.like_id.length
       
      

    const {
        title,
        // thumbnail,
        // like,
        like_count,
        is_like,
        postId,
        thumbnail
    } = props;
   
       useEffect(() => {
       setHeart(props.like_id.length)
       let is_like =false
       props.like_id.map((c,idx)=>{
      if(c===name){
       is_like =true;
          return
      }
  }) 
       setLike(is_like?is_like:false)
   }, [props.like_id.length])


    const toggleLike = () => {
            if (!is_token) {
                window.alert("로그인 해주세욥!")
              return;
           }
        setLike(!like)
        //console.log(post_id)
        dispatch(actionCreators.LikeDB(props.id, name));
    }

    return (
        <>
            <div className="likePostCard">
                <div className="postImage"
                    onClick={() => {
                        history.push(`/detail/${props.id}`);
                    }}>
                    <img src={"http://3.35.233.188/"+thumbnail} alt="썸네일" />
                </div>
                <div className="postFooter">
                    <p className="postTitle">{title}</p>
                    <Like like={like} onClick={toggleLike} />
                    <div className="likePostHeart">
                    <p>{Heart}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LikePost;