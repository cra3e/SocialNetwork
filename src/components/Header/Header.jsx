import React from "react";
import st from  "./Header.module.css"
import {NavLink} from "react-router-dom";
import logo from "../../111.svg"


const Header = (props) => {
    return(
        <header className={st.header}>
        <img src={logo} alt={"LOGO"}/>
        <div className={st.loginBlock}>
            {props.isAuth
                ? <div className={st.loginBlockItem}>{props.login} <button onClick={props.logout}> Log out </button></div>
                : <div className={st.loginBlockItem}><NavLink to={'/login'}> Login </NavLink></div>}
        </div>
      </header>
    )
}

export default Header;