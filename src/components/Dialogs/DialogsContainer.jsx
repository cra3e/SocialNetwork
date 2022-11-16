import React from "react";
import {sendMessageCreator} from "../../Redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

/*
const DialogsContainer = () => {

    return <StoreContext.Consumer>
        {store => {

            let onAddMessage = () => {
                store.dispatch(sendMessageCreator())
            }

            let onMessageChange = (message) => {
                store.dispatch(updateNewMessageTextActionCreator(message))
            }

            return (<Dialogs
                changeMessage={onMessageChange}
                addMessage={onAddMessage}
                dialogsPage={store.getState().dialogsPage}/>);
        }}
    </StoreContext.Consumer>
}
*/

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
    addMessage: (newMessageText) => {
        dispatch(sendMessageCreator(newMessageText))
    }};

};

/*
let AuthRedirectComponent = withAuthRedirect(Dialogs)

const DialogsContainer = connect (mapStateToProps, mapDispatchToProps) (AuthRedirectComponent);
*/

export default compose(
    connect (mapStateToProps, mapDispatchToProps),
    withAuthRedirect)
(Dialogs);
