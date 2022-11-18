import React from "react";
import "./App.css";
import {BrowserRouter, Routes, Route, withRouter} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
//import News from "./components/News/News";
//import Settings from "./components/Settings/Settings";
//import Music from "./components/Music/Music";
//import DialogsContainer from "./components/Dialogs/DialogsContainer";
//import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./Redux/appReducer";
import Preloader from "./components/common/preloader/preloader";
import {P5js} from "./components/P5js/P5js";
import {compose} from "redux";
import store from "./Redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";

const DialogsContainer = React.lazy(()=> import('./components/Dialogs/DialogsContainer'))
const UsersContainer = React.lazy(()=> import('./components/Users/UsersContainer'))
const News = React.lazy(()=> import('./components/News/News'))
const Music = React.lazy(()=> import('./components/Music/Music'))
const Settings = React.lazy(()=> import('./components/Settings/Settings'))
//const P5js = React.lazy(()=> import('./components/P5js/P5js'))

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
        }

    render() {
        if (!this.props.initialized){
        return <Preloader/>
        }
        return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <div className="app-wrapper">
                    <HeaderContainer/>
                    <Navbar/>
                    <div className="app-wrapper-content">
                        <React.Suspense fallback={<div><Preloader /></div>}>
                        <Routes>
                            <Route path="/profile/:id" element={<ProfileContainer/>}/>
                            <Route path="/profile" element={<ProfileContainer/>}/>
                            <Route path="/dialogs/*" element={<DialogsContainer/>}/>
                            <Route path="/users/*" element={<UsersContainer/>}/>
                            <Route path="/news/*" element={<News/>}/>
                            <Route path="/music/*" element={<Music/>}/>
                            <Route path="/settings/*" element={<Settings/>}/>;
                            <Route path="/login/*" element={<Login/>}/>;
                            <Route path="/p5js" element={<P5js/>}/>;
                            <Route path="*" element={
                                    <main style={{ padding: "1rem" }}>
                                        <p>There's nothing here!</p>
                                    </main>
                                }
                            />
                        </Routes>
                        </React.Suspense>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

const MapStateToProps = (state) => ({
    initialized: state.app.initialized
})

const ContainerApp = compose(
    //withRouter,
    connect (MapStateToProps, {initializeApp})) (App);

const MainApp = (props) => {
    return <Provider store={store}>
        <ContainerApp />
    </Provider>
}

export default MainApp;