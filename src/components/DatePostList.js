import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actionCreators as postActions } from '../redux/modules/post';
import Post from './Post';

function DatePostList(props) {
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list2);

    React.useEffect(() => {

        // if (post_list.length < 2) {
            dispatch(postActions.getDatePostDB());
            console.log("나는 보이니?")
        // }
     }, [])

    return (
        <>
           <div className="postDateWrap">
           <div className="DlistName">
             <h4 >☝️최신 리스트</h4>
             </div>
            <div className="postDateContainer">
           <div className="postListTitle">
            {/* <h3>최신 리스트</h3> */}
            </div>
                {post_list.map((p, idx) => {
                    return (
                        <Post key={idx} {...p} />
                    )
                })}
            </div>
            </div>
        </>
    );
}

export default DatePostList;