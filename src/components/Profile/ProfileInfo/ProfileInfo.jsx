import React from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../common/preloader/preloader";
import ProfileStatus from './ProfileStatus'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div className={s.profileInfo}>
            <div className={s.descriptionBlock}>
                <img className={s.avatar} src={props.profile.photos.large}/>
                <ul><h1>{props.profile.fullName}</h1>
                    <h3>{props.profile.aboutMe}</h3>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/></ul>
            </div>
        </div>
    );
};

export default ProfileInfo;
