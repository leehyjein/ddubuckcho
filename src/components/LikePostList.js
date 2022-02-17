import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import Carousel from 'react-elastic-carousel';

import { actionCreators as postActions } from '../redux/modules/post';
import LikePost from './LikePost';
import '../App.css'
import Spinner from "../elements/Spinner";

function LikePostList(props) {
    const dispatch = useDispatch();
    // window.onload (dispatch(postActions.getLikePostDB()))
     const post_list = useSelector((state) => state.post.list);

    //  const [loading, setLoading]= useState(true);
    //const test = useSelector((state)=>state.post.list)
    React.useEffect(() => {
    //    if (post_list.length < 2) {
            dispatch(postActions.getLikePostDB());
            // setLoading(false)
    //    }
    }, [])
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 }
    ];

    return (
        
        <>
        {/* {loading&&(<Spinner type={'page'} is_dim={true}/>)} */}
        <>
        <div className="listName">
             <h4 >💗뚜벅이족들을 위한 여행지 BEST순위💕</h4>
             </div>
        <Carousel breakPoints={breakPoints} itemsToScroll={2} className="postLikeContainer">
           
                {post_list.map((p, idx) => {
                    return (
                        <LikePost key={idx} {...p} />
                    )
                })}
            
            </Carousel>
        </>
        </>
    )
}
export default LikePostList;