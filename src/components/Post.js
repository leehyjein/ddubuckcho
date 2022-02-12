import React from 'react';
import { useHistory } from "react-router-dom";

import './Post.css';


function Post(props) {
    const history = useHistory();


    const {
        title,
        thumbnail,
        // like,
        // like_count,
        is_like,
        postId,
    } = props;

    return (
        <>
            <div className="postCard">
                <div className="postImage"
                    onClick={() => {
                        history.push(`/detail/${postId}`);
                    }}>
                    <img src={thumbnail} alt="썸네일" />
                </div>
                <div className="postFooter">
                    <p className="postTitle">{title}</p>
                    {is_like
                        ?
                        <div className="likeBtn">
                            빨간 하트
                        </div>
                        :
                        <div className="dislikeBtn">
                            회색 하트
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default Post;