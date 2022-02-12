import React from "react";
import "../App.css"
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../redux/modules/post";


const PostWrite = (props) => {
    const dispatch = useDispatch()
    const { history } = props;
    const preview = useSelector((state) => state.post.preview);
    //const is_token = localStorage.getItem("token")?true:false;
    const [contents, setContents] = React.useState("");
    const [title, setTitle] = React.useState("");
    const is_login = useSelector((state) => state.user.is_login);
    
    const post_id = useSelector((state) => state.post);
    const is_edit = post_id ? true : false;


    const uploading = useSelector((state) => state.post.uploading);
    const fileInput = React.useRef();

    const selectFile = (e) => {

        const reader = new FileReader();
        const file = fileInput.current.files[0];
        console.log(file)
        reader.readAsDataURL(file);

        reader.onloadend = () => {

            dispatch(actionCreators.setPreview(reader.result))

        }
    }
    
    // console.log(preview)
    // const count =0;
    //const _is_token = count?true:false;
    const changeTitle = (e) => {
        setTitle(e.target.value);
    }
    const changeContents = (e) => {
        setContents(e.target.value);
    }
    const addPost = () => {
        console.log("안녕 난 추가야")
        if(title == '' || contents == '' ){
            // console.log(fileInput)
            window.alert("게시물을 다 넣어주세요!")

            return;
        }
        dispatch(actionCreators.addPostDB({ 
            title: title,
            contents: contents,
            thumbnail:fileInput.current.files[0] 
        }))
    }
    const editPost = () => {
        console.log("안녕 난 수정이야")
        dispatch(actionCreators.editPostDB(post_id, {
                                    contents: contents,
                                    title: title ,
                                    thumbnail: fileInput.current.files[0]
                                        }));
    };
    const delPost = () => {
        console.log("안녕 난 삭제야")
         dispatch(actionCreators.deletePostDB(post_id));
        //history.replace("/")
    };
    const onRemove = () => {
        if (window.confirm("정말 삭제합니까?")) {

            delPost();
        } else {
            alert("취소합니다.");
        }
    };

    const nuler = () => {
        dispatch(actionCreators.nori())
    }
    if (!is_login) {
        return (
            <div margin="100px 0px" padding="16px"
            //center
            >
                <p size="32px"
                //bold
                >앗 잠깐!</p>
                <p size="16px"> 로그인 후에만 글을 쓸 수 있어요!</p>
                <button onClick={() => { history.replace("/"); }}>로그인 하러가기</button>
            </div>
        )
    }
    return (
        <div className="writePage">
            나는 글 작성 페이지야

            <div>
                <React.Fragment>
                    <input
                        type="file"
                        ref={fileInput}
                        onChange={selectFile}
                        disabled={uploading}
                    />
                    {/* <Button _onClick={uploadFB}>업로드하기</Button> */}
                </React.Fragment>
            </div>
            <div className="contents">
                <div className="writeImageOutter">
                    <div className="writeImageInner" >
                        <img
                            className="writeImage"
                            src={preview ? preview : "http://via.placeholder.com/400x300"}
                        />
                    </div>
                </div>
                <div className="writeContent">
                    <div>
                        <input
                            value={title}
                            onChange={changeTitle}
                            placeholder="제목 입력.." />
                    </div>
                    <div>
                        <textarea
                            className="writetrip"
                            value={contents}
                            onChange={changeContents}
                            type="text"
                            placeholder="문구 입력..."
                        />
                    </div>
                    {is_edit ? (
                        <div>
                            <button onClick={addPost}>글 추가</button>
                        </div>
                    ) : (<div>
                        <button onClick={editPost}>수정</button>
                        <button onClick={onRemove}>삭제</button>
                    </div>)}
                </div>
            </div>
            <button onClick={nuler}>눌러줘</button>
        </div>
    )
}

export default PostWrite;