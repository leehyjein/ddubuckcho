import React from 'react';

import LikePostList from '../components/LikePostList';
import DatePostList from '../components/DatePostList';

function MainPage(props) {
    return (
        <>
            <LikePostList />
            <DatePostList />
        </>
    );
}

export default MainPage;