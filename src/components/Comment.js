import React from 'react';

import { useDispatch } from 'react-redux';
import { actionCreators as commentActions } from '../redux/modules/comment';

import '../App.css'

function Comment(props) {
    const dispatch = useDispatch();
    const { comment, commentId, date, loginId, name, id } = props;
    const userName = localStorage.getItem("name");

    const [newComment, setNewComment] = React.useState("");
    const [isEdit, setIsEdit] = React.useState(false);

    const is_me = (userName === loginId) ? true : false;

    const handleCommentDelete = () => {
        dispatch(commentActions.deleteCommentDB(id, commentId))
    }

   

    const handleCommentEdit = () => {
        if (isEdit) {
            setIsEdit(false)
        } else {
            setIsEdit(true)
        }
    }
    const changeNewComment = (e) => {
        setNewComment(e.target.value)
    }

    const submitNewComment = () => {
        dispatch(commentActions.editCommentDB(id, commentId, newComment))
            .then(() => {
                setIsEdit(false);
            })
    }
    React.useEffect(() => { dispatch(commentActions.getCommentDB(id)); }, [isEdit])

    return (
        <>
            <div className="commentContainer">
                <div>
            {isEdit
                    ?
                    <>
                       <div>작성자 : {name}</div>
                        <input defaultValue={comment} onChange={changeNewComment}></input>
                        <div>{date}</div>
                        <button onClick={submitNewComment}>수정완료</button>
                    </>
                    :
                    <>
                        <div>작성자 : {name}</div>
                        <div>내용 : {comment}</div>
                        <div>작성 날짜 : {date}</div>
                    </>
                }
                </div>
                {is_me &&
                    <div>
                        <button onClick={handleCommentDelete}>삭제</button>
                        <button onClick={handleCommentEdit}>수정하기</button>
                    </div>
                }
            </div>
        </>
    );
}


export default Comment;