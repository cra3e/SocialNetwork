import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {getStatus, getUserProfile, savePhoto, updateStatus, saveProfile} from '../../Redux/profileReducer.ts';
import {useParams, Navigate} from 'react-router-dom'
import {compose} from "redux";

function withRouter (ProfileContainer) {
    function ComponentWithRouterProp(props) {
        let params = useParams();
        return (
            <ProfileContainer {...props} router={{params}}/>
        )
    };
    return ComponentWithRouterProp;
};

class ProfileContainer extends React.Component {
    refreshProfile() {
        let userId = this.props.router.params.id;
        if (!userId) {
            userId=this.props.authorizedUserId; /*24960*/
            if (!userId) {
                return <Navigate  replace to={"/login"} />
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }
    componentDidMount() {
        this.refreshProfile()
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.router.params.id !== prevProps.router.params.id) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <Profile {...this.props}
                     isOwner={!this.props.router.params.id}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     savePhoto={this.props.savePhoto}/>
        )
    };
};

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});

export default compose(
    connect (mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
)
(ProfileContainer);

