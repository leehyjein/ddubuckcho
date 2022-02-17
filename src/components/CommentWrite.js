import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as commentActions } from '../redux/modules/comment';



function CommentWrite(props) {
    const { postId, name } = props;
    const dispatch = useDispatch();
    const inputRef = React.useRef(null);
    const is_token = localStorage.getItem("token") ? true : false;

    const [commentContents, setCommentContents] = React.useState("");


    const changeComments = (e) => {
        setCommentContents(e.target.value);
    }

    const commentWrite = () => {
        if (commentContents === "") {
            window.alert("댓글 입력해주세요.");
            return;
        }
        const comment = {
            name: name,
            comment: commentContents
        }
        // const comment = commentContents;
        dispatch(commentActions.addCommentDB(postId, comment))
        inputRef.current.value = "";
    }
    return (
        <>
            {is_token &&
                <div className="commentWriteContainer">
                    <input className="comment" defaultValue={commentContents} ref={inputRef} onChange={changeComments} placeholder="댓글을 입력해 주세요." />
                    <button  className="commentBtn" onClick={commentWrite}>comment 작성하기</button>
                </div>
            }
        </>
    );
}

export default CommentWrite;