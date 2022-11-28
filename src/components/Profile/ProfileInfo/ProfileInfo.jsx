import React, {useState} from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../common/preloader/preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from '../../../assets/images/user.png';
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false);
    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData) => {
        props.saveProfile(formData).then(
            () => {
                setEditMode(false);
            }
        );
    }

    return (
        <div className={s.profileInfo}>
            <div className={s.descriptionBlock}>
                <label>
                    <img src={props.profile.photos.large || userPhoto} className={s.avatar} alt="Нажмите для выбора фото"/>
                    {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected} hidden/>}
                </label>
                <div className={s.textDescription}>
                    { editMode
                    ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/>
                    : <ProfileData goToEditMode={() => {setEditMode(true)} }
                                   profile={props.profile}
                                   isOwner={props.isOwner}
                                   status={props.status}
                                   updateStatus={props.updateStatus}/> }
                </div>
            </div>
        </div>
    );
};

const ProfileData = ({profile, isOwner, goToEditMode, status, updateStatus}) => {
    return <div>
        <div className={s.fullName}>
            {profile.fullName}
        </div>
        <div>
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
        </div>
        <div>
            <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
        </div>
        {profile.lookingForAJob &&
            <div>
                <b>My professional skills</b>: {profile.lookingForAJobDescription}
            </div>
        }

        <div>
            <b>About me</b>: {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}
        </div>
        {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
    </div>
}


const Contact = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}


export default ProfileInfo;
