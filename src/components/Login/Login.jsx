import React from "react";
import {Field, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormControls/FormControls";
import {required} from "../../utils/validators/validators";
import {login} from "../../Redux/authReducer";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import styles from "./../common/FormControls/FormControls.module.css"

const LoginForm = ({handleSubmit, error}) => {
    return (
            <form onSubmit={handleSubmit}>
                {createField("Email", 'email', [required], Input)}
                {createField("Password", 'password', [required], Input, {type: "password"})}
                {createField(null, 'rememberMe', [], Input, {type: "checkbox"}, "Remember me")}
                <div>
                    <button>Login</button>
                </div>
                {error && <div className={styles.formSummaryError}>
                    {error}
                </div>}
            </form>
    )
};

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Navigate  replace to={"/profile"} />
    }

    return <center>
        <div>
            <h3>LOGIN</h3>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    </center>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect (mapStateToProps, {login}) (Login);