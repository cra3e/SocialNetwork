import React from "react";
import s from "./Post.module.css";

const Post = (props) => {

  return (
    <div className={s.item}>
      <img src="https://www.pngitem.com/pimgs/m/146-1468298_profile-icon-white-png-user-icon-ico-transparent.png" />
      <div> {props.message} </div>
      <div>Like {props.likes} </div>
    </div>
  );
};

export default Post;
