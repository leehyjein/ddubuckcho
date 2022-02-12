import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import { actionCreators as postActions } from '../redux/modules/post';
import Post from './Post';
import '../App.css'

function LikePostList(props) {
    const dispatch = useDispatch();
//     const post_list = useSelector((state) => state.post);
// console.log(post_list)
    React.useEffect(() => {
        if (post_list.length === 0) {
            dispatch(postActions.getLikePostDB());
        }
    }, [])


    const post_list = [{
        title: "1번 사진",
        thumbnail: "url 들어감",
        like: "",
        like_count: 0,
        is_like: false,
        postId: 1
    },
    {
        title: "2번 사진",
        thumbnail: "url 들어감",
        like: "",
        like_count: 0,
        is_like: false,
        postId: 2
    },
    {
        title: "3번 사진",
        thumbnail: "url 들어감",
        like: "",
        like_count: 0,
        is_like: false,
        postId: 3
    },
    {
        title: "4번 사진",
        thumbnail: "url 들어감",
        like: "",
        like_count: 0,
        is_like: false,
        postId: 4
    }
    ]

    return (
        <>
            <div className="postContainer">
                {post_list.map((p, idx) => {
                    return (
                        <Post key={idx} {...p} />
                    )
                })}
            </div>
        </>
    )
}
export default LikePostList;