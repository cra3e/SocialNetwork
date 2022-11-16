import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {getStatus, getUserProfile, updateStatus} from '../../Redux/profileReducer';
import {Navigate, useLocation, useParams} from 'react-router-dom'
import {compose} from "redux";

function withRouter (ProfileContainer) {
    function ComponentWithRouterProp(props) {
        //let location = useLocation();
        //let navigate = useNavigate();
        let params = useParams();
        //let history = useNavigate();
        return (
            <ProfileContainer {...props} router={{params}}/>
        )
    };
    return ComponentWithRouterProp;
};

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.router.params.id;
        if (!userId) {
            userId=this.props.authorizedUserId; /*24960*/
            if (!userId) {
                return <Navigate  replace to={"/login"} />
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    };

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>
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
    connect (mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter,
    //withAuthRedirect
)
(ProfileContainer);

