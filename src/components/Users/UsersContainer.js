import React from 'react';
import Users from './Users'
import {connect} from 'react-redux';
import {
    requestUsers,
    setCurrentPage,
    toggleFollowingProgress,
    unfollowSuccess, followSuccess
} from "../../Redux/usersReducer";
import * as axios from 'axios';
import Preloader from "../common/preloader/preloader";
import {UsersAPI} from "../../API/Api";
import {Navigate} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {
    getCurrentPage,
    getFollowingInProgress, getIsAuth,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../Redux/usersSelector";

class UsersContainer extends React.Component {

    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
    };

    onPageChanged = (pageNumber) => {
        const {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize);
    }

    render() {
        if (!this.props.isAuth) return <Navigate to={"/login"}/>;
        return <>
            {this.props.isFetching ? <Preloader/> :
                <Users totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       onPageChanged={this.onPageChanged}
                       users={this.props.users}
                       unfollow={this.props.unfollowSuccess}
                       follow={this.props.followSuccess}
                       toggleFollowingProgress={this.props.toggleFollowingProgress}
                       followingInProgress={this.props.followingInProgress}/>}
        </>

    }
};

/*let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
        isAuth: state.auth.isAuth
    }
}*/

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        isAuth: getIsAuth(state)
    }
}

/*
let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId));
        },
        unfollow: (userId) => {
            dispatch(unfollowAC(userId));
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users));
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber));
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setTotalUsersCountAC(totalCount));
        },
        toggleIsFetching: (isFetching) => {
            dispatch(toggleIsFetchingAC(isFetching));
        }
    }
}
*/

/*export default connect(mapStateToProps, {
    followSuccess, unfollowSuccess, setCurrentPage,
    toggleFollowingProgress, getUsers
})(UsersContainer);*/

export default compose(
    withAuthRedirect,
    connect(mapStateToProps,{followSuccess, unfollowSuccess, setCurrentPage, toggleFollowingProgress, getUsers: requestUsers})
)(UsersContainer);

