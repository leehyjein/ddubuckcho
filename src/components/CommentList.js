import React from 'react';
import Comment from './Comment';

import { useDispatch, useSelector } from 'react-redux';

import { actionCreators as commentActions } from '../redux/modules/comment';


function CommentList(props) {
    const dispatch = useDispatch();
    const { postId, name } = props;
    const comment_list = useSelector(state => state.comment.list);

    // React.useEffect(() => {
    //     if (!comment_list[postId]) {
    //         dispatch(commentActions.getCommentDB(postId))
    //     }
    // }, []);

    if (!comment_list[postId] || !postId) {
        return null;
    }

    return (
        <>
            {comment_list &&
                comment_list[postId].map((comment, idx) => {
                    return (
                        <div key={comment.id} className="commentListContainer">
                            <Comment  {...comment} />
                        </div>
                    )
                })
            }
        </>
    );
}

CommentList.defaultProps = {
    postId: null
};

export default CommentList;