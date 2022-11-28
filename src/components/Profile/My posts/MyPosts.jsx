import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormControls/FormControls";

const NewPostForm = (props) => {
    const maxLength10 = maxLengthCreator(10);

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name="newPostText" placeholder="Чиркани пару строк, братишка!"
                        validate={[required, maxLength10]}/>
            </div>
            <div>
                <button>Отправить</button>
            </div>
        </form>
    )
}

const NewPostFormRedux = reduxForm({form: "profileAddPostForm"}) (NewPostForm)

const MyPosts = React.memo((props) => {
    console.log('RENDER')

    let postsElements = [...props.posts].reverse().map(p => <Post key={p.id} message={p.post} likes={p.likesCount}/>);

    let onAddPost = (values) => {
        props.addPost(values.newPostText);
    };

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <NewPostFormRedux onSubmit={onAddPost}/>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
});

export default MyPosts;

