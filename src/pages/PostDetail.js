import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../pages/PostDetail.css";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Button from "@material-ui/core/Button";
//import {actionCreators as postActions} from "../redux/modules/post";

const Post = (props) => {
  const useId = props.match.params.useId;

  return (
    <div className="container" padding="16px">
      <div className="postcontainer" width="auto">
        <div className="title_container">
        <h2 className="title">{props.title}</h2>
        </div>
        <img src={props.images} className="img" />
        <div className="description">
          <div className ="heart">
        <FavoriteIcon 
        pull="right" 
        post_id={useId}
        color="pink">  
        </FavoriteIcon>
        </div>
        <p classNmae="content">{props.content}</p>
        <div className="button">
        <Link to="./PostWrite">
        <Button
            variant="contained"
            color="primary"
            box-shadow="0px 7px 3px rgba(0, 0, 0, 0.2)"
          >
            수정하기📝
          </Button>
        </Link>
        </div>
        </div>
        </div>
      </div>
  );
};

Post.defaultProps = {
  title: "타이틀이에요",
  images: "https://community0374.s3.ap-northeast-2.amazonaws.com/catlove.jpg",
  thumbnail: "",
  content: "고양이 컨텐츠에요",
  like: "",
  like_count: "",
  is_like: "",
  useId: "",
};
export default Post;
