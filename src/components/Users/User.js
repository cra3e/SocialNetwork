import React from 'react';
import s from './user.module.css'
import userPhoto from '../../assets/images/user.png'
import {NavLink} from "react-router-dom";

const User = ({user, followingInProgress, follow, unfollow}) => {
    return <div>
                <span  className={s.userList}>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                            <img src={user.photos.small != null ? user.photos.small : userPhoto} className={s.userPhoto} alt={user.name}/>
                        </NavLink>
                    </div>
                    <div className={s.userListDescription}>
                        <div><b>{user.name}</b></div>
                        <div>{user.status}</div>
                        {user.followed
                            ? <button disabled={followingInProgress.some(id=>id===user.id)}
                                      onClick={() => {unfollow(user.id)}}>
                                unfollow</button>
                            : <button disabled={followingInProgress.some(id=>id===user.id)}
                                      onClick={() => {follow(user.id)}}>
                                follow</button>}
                    </div>
                </span>
            </div>
}

export default User;