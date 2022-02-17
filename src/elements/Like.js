import React from "react";

import styled from "styled-components";
import Heart from "../Assets/Heart.png";
import emptyHeart from "../Assets/emptyHeart.png";



const Like = ({ like, onClick })=>{
    //console.log(like)
    return (
        <HeartI
        src={like?Heart:emptyHeart} 
        
        onClick={onClick} />
    )
}



const HeartI = styled.img` 
width:32px;
height:32px;
`;


export default Like;