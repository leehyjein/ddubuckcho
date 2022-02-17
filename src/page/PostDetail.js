import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link,
//  useHistory
 } from "react-router-dom";

import "../App.css";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Button from "@material-ui/core/Button";
import { actionCreators } from "../redux/modules/post";
import { actionCreators as commentActions } from '../redux/modules/comment';

import CommentWrite from '../components/CommentWrite';
import Comment from '../components/Comment';
import Spinner from "../elements/Spinner";

const PostDetail = (props) => {
  const dispatch = useDispatch();

  const id = props.match.params.id;
  const post = useSelector(state => state.post.one_post);
  const comment_list = useSelector(state => state.comment.list);

  const [loading, setLoading]= useState(true);
  const name = localStorage.getItem("name");
  const is_me=(name === post?.loginId)?true:false;
 

  React.useEffect(() => {
    dispatch(actionCreators.getOnePost(id));
    dispatch(commentActions.getCommentDB(id));
    let timer= setTimeout(()=>{
      setLoading(false)
  },300)
}, []);


  //const history =useHistory()
// const test = useSelector((state)=>state.post)

if (!comment_list[id] || !id) {
  return null;
}
  
  return (
    <div className="container">
      {loading?(<Spinner type={'page'} is_dim={true}/>):
      <>
      <div className="postcontainer" width="auto">
        <div className="title_container">
        <h2 className="title">{post?.title}</h2>
        </div>
        <img 
        src={"http://3.35.233.188/"+post?.thumbnail} 
        className="img" alt="미리보기"/>
        <div className="description">
          <div className ="heart">
        {/* <FavoriteIcon 
        pull="right" 
        post_id={postId}
        color="pink">  
        </FavoriteIcon> */}
        </div>
        <p className="content">{post?.contents}</p>
        {is_me&&
        <div className="button">
     <Link to={`/write/${id}`}>
        <Button
            variant="contained"
            color="primary"
            box-shadow="0px 7px 3px rgba(0, 0, 0, 0.2)"
          >
            수정하기📝
          </Button>
        </Link>
        </div>}
        </div>
        <CommentWrite postId={post?.id} name={name} />
        <>
        {comment_list &&
            comment_list[id].map((comment, idx) => {
              return (
                <div key={idx} className="commentListContainer">
                  <Comment  {...comment} />
                </div>
              )
            })
          }
        </>
        </div>
        </>}
      </div>
  );
};

PostDetail.defaultProps = {
  title: "타이틀이에요",
  images: "https://community0374.s3.ap-northeast-2.amazonaws.com/catlove.jpg",
  thumbnail: "",
  content: "고양이 컨텐츠에요",
  like: "",
  like_count: "",
  is_like: "",
  useId: "",
};
export default PostDetail;