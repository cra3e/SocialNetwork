import React from "react";
import {addPostActionCreator} from "../../../Redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

/*
const MyPostsContainer = () => {

    return (
        <StoreContext.Consumer>
        {store => {
            let state = store.getState();

            let onAddPost = () => {
                store.dispatch(addPostActionCreator());
            };

            let onPostChange = (text) => {
                store.dispatch(updateNewPostTextActionCreator(text));
            };
            return <MyPosts updateNewPostText={onPostChange} addPost={onAddPost} posts={state.profilePage.posts}
                     newPostText={state.profilePage.newPostText}/>
        }}
    </StoreContext.Consumer>)

};*/

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {dispatch(addPostActionCreator(newPostText))}
    }
};

const MyPostsContainer = connect (mapStateToProps, mapDispatchToProps) (MyPosts);

export default MyPostsContainer;
