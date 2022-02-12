import React from "react";
import { useDispatch,useSelector} from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Like from "../elements/Like";

import '../App.css';

import { actionCreators } from "../redux/modules/post";

const Post =(props)=>{
    const history = useHistory();
    const dispatch = useDispatch();
    const user_id = useSelector((state) => state.user.user);
    const post_id= useSelector((state)=>state.post)
    const post_like_id_list = useSelector((state)=>state)
    const [like, setLike] = useState(false)
    const [Heart,setHeart]= useState(post_like_id_list.length)
    const token = localStorage.getItem("token");
    
    
    const {
        title,
        thumbnail,
        // like,
        // like_count,
        is_like,
        postId,
    } = props;



    //useEffect(() => {
       // setHeart(post_like_id_list.length)
  //      let is_like =false
   // post_like_id_list.map((c,idx)=>{
      // if(c===user_id.uid){
    //    is_like =true;
      //     return
     //  }
 //  })
     //   setLike(is_like?is_like:false)
  //  }, [post_like_id_list.length])

    
    const toggleLike = () => {
    //     if (!is_login&&!is_login2) {
    //         window.alert("로그인 해주세욥!")
    //       return;
    //    }
       setLike(!like)
       console.log(post_id)
       dispatch(actionCreators.LikeDB(post_id, token));    
   }
    return(
        <React.Fragment>
            <div className="postCard">
                <div className="postImage"
                    onClick={() => {
                        history.push(`/detail/${postId}`);
                    }}>
                    <img src={thumbnail} alt="썸네일" />
                </div>
                <div className="postFooter">
                    <p className="postTitle">{title}</p>
            <Like like={like} onClick={toggleLike} />
            </div>
            </div>
        </React.Fragment>
    )
};

export default Post;