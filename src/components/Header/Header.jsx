import React from "react";
import st from  "./Header.module.css"
import {NavLink} from "react-router-dom";


const Header = (props) => {
    return(
        <header className={st.header}>
        <img src="https://i.pinimg.com/originals/f8/79/dc/f879dc0686f5000ee4ba86203110a233.png" />
        <div className={st.loginBlock}>
            {props.isAuth
                ? <div>{props.login} <button onClick={props.logout}> Log out </button></div>
                : <NavLink to={'/login'}> Login </NavLink>}
        </div>
      </header>
    )
}

export default Header;