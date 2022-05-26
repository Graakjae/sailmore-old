import { NavLink } from "react-router-dom";
import dinetogter from "../assets/img/nav/dinetogter.png";
import indbakke from "../assets/img/nav/indbakke.png";
import gastehat from "../assets/img/nav/gastehat.png";
import profile from "../assets/img/nav/profile.png";

import dinetogterBlue from "../assets/img/nav/dinetogter-blue.png";
import profileBlue from "../assets/img/nav/profile-blue.png";
import indbakkeBlue from "../assets/img/nav/indbakke-blue.png";
import gastehatBlue from "../assets/img/nav/gastehat-blue.png";


export default function Nav() {
    return (
        <nav>
            <NavLink to="/" children={({ isActive }) => {
                const file = isActive ? gastehatBlue : gastehat;
                return (
                    <>
                    <img src={file} alt="navicon"/>
                    <p>Udforsk</p>
                    </>
                );
            }}
            />
            

            <NavLink to="/dineTogter" children={({ isActive }) => {
                const file2 = isActive ? dinetogterBlue : dinetogter;
            return (
            <>
                <img src={file2} alt="navicon"/>
                <p>Dine togter</p>      
            </>
                );
            }}
            />
            
            <NavLink to="/indbakke" children={({ isActive }) => {
                const file3 = isActive ? indbakkeBlue : indbakke;
            return (
            <>
                <img src={file3} alt="navicon"/>
                <p>Indbakke</p>      
            </>
                );
            }}
            />            
            
            <NavLink to="/profile" children={({ isActive }) => {
                const file4 = isActive ? profileBlue : profile;
            return (
            <>
                <img src={file4} alt="navicon"/>
                <p>Profil</p>      
            </>
                );
            }}
            />


            
        </nav>
    );
}
