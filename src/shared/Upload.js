import React from "react";
import { useDispatch, useSelector } from "react-redux";


import { actionCreators } from "../redux/modules/post";

const Upload = (props) => {
  const dispatch = useDispatch();
 const uploading = useSelector((state) => state.post.uploading);
  const fileInput = React.useRef();

  const selectFile = (e) => {

    const reader = new FileReader();
    const file = fileInput.current.files[0];
    console.log(file)
    reader.readAsDataURL(file);

    reader.onloadend = ()=>{

        dispatch(actionCreators.setPreview(reader.result))
    
    }

  };


  return (
    <React.Fragment>
      <input
        type="file"
        ref={fileInput}
        onChange={selectFile}
       disabled={uploading}
      />
      {/* <Button _onClick={uploadFB}>업로드하기</Button> */}
    </React.Fragment>
  );
};

export default Upload;