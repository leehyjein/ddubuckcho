import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../components/PostDetail.css";
import FavoriteIcon from "@material-ui/icons/Favorite";
//import {actionCreators as postActions} from "../redux/modules/post";

const Post = (props) => {
  const useId = props.match.params.useId;

  return (
    <div className="container" padding="16px">
      <div className="postcontainer" width="auto">
        <h2 className="title">{props.title}</h2>
        <img src={props.images} className="img" />
        <div className="description">
          <div className ="heart">
        <FavoriteIcon pull="right" post_id={useId}></FavoriteIcon>
        </div>
        <p classNmae="content">{props.content}</p>
        <Link to="./PostWrite">
          <button className="btn">수정</button>
        </Link>
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
