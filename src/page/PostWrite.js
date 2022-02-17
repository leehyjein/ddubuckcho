import React from "react";
import "../App.css"
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../redux/modules/post";
import Spinner from "../elements/Spinner";

const PostWrite = (props) => {
    const dispatch = useDispatch()
    const { history } = props;
    const preview = useSelector((state) => state.post.preview);
    const post_list = useSelector((state) => state.post.list);
    
    const is_token = localStorage.getItem("token")?true:false;
    
    const post_id = props.match.params.id
  
    const is_edit = post_id ? true : false;
    let _post = 
        is_edit &&post_list ? post_list.find((p) => p.id == post_id) : null;
   
    const [contents, setContents] = React.useState(_post ? _post.contents : "");
    const [title, setTitle] = React.useState(_post ? _post.title : "");
    const [loading, setLoading]= useState(true);
    // const is_me=(name === _post.loginId)?true:false;
    const uploading = useSelector((state) => state.post.uploading);
    const fileInput = React.useRef();
    const token = localStorage.getItem("token")
    //console.log("token",token)


    React.useEffect(() => {
        if (is_edit && !_post) {
            console.log("포스트 정보가 없어요");
            history.goBack();

            return;
        }

        if (is_edit) {
            dispatch(actionCreators.setPreview("http://3.35.233.188/"+_post.thumbnail));
           
            let timer= setTimeout(()=>{
                setLoading(false)
            },750)
        }else{
            dispatch(actionCreators.setPreview("http://via.placeholder.com/400x300"));
        let timer= setTimeout(()=>{
            setLoading(false)
        },750)
    }
    }, []);


    
    const selectFile = (e) => {
        //const file = is_edit? "http://3.35.233.188/"+_post.thumbnail:fileInput.current.files[0];
        const file = fileInput.current.files[0];
        const reader = new FileReader();
        
        console.log(file)
        reader.readAsDataURL(file);

        reader.onloadend = () => {

            dispatch(actionCreators.setPreview(reader.result))

        }
    }
    

    const changeTitle = (e) => {
        setTitle(e.target.value);
    }
    const changeContents = (e) => {
        setContents(e.target.value);
    }
    const addPost = () => {
        if(title == '' || contents == '' ){
            window.alert("게시물을 다 넣어주세요!")
            return;
        }
        dispatch(actionCreators.addPostDB({ 
            title: title,
            contents: contents,
            thumbnail:fileInput.current.files[0]
            //fileInput.current.files[0] 
        }))
    }
    const editPost = () => {
        dispatch(actionCreators.editPostDB(_post.id, {
                                    contents: contents,
                                    title: title ,
                                    thumbnail: fileInput.current.files[0]?fileInput.current.files[0]:null
                                        }));
    };
    const delPost = () => {
         dispatch(actionCreators.deletePostDB(_post.id));
        //history.replace("/")
    };
    const onRemove = () => {
        if (window.confirm("정말 삭제합니까?")) {

            delPost();
        } else {
            alert("취소합니다.");
        }
    };

  
    if (!is_token) {
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
        <div>
        {loading?(<Spinner type={'page'} is_dim={true}/>):
        <div className="writePage">
              <div>
                <React.Fragment>
                    <input
                         className="fileInput"
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
                        alt="미리보기"/>
                    </div>
                </div>
                <div className="writeContent">
                    <div>
                        <input
                        className="titlePlaceholder"
                            value={title}
                            onChange={changeTitle}
                            placeholder="여행지 장소" />
                    </div>
                    <div>
                        <textarea
                            className="writetrip"
                            value={contents}
                            onChange={changeContents}
                            type="text"
                            placeholder="내용 입력..."
                        />
                     </div>
                    </div>
                    {!is_edit ? (
                        <div>
                            <button className="addBtn" onClick={addPost}>글 추가</button>
                        </div>
                    ) : (<div className="editBtnContainer">
                        <button className="fixBtn" onClick={editPost}>수정</button>
                        <button  className="deleteBtn" onClick={onRemove}>삭제</button>
                    </div>
                    )}
                
            </div>
                 
        </div>}
        </div>
    )
}

export default PostWrite;