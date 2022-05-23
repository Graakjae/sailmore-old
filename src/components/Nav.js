import { NavLink } from "react-router-dom";
import dinetogter from "../assets/img/nav/dinetogter.png";
import indbakke from "../assets/img/nav/indbakke.png";
import gastehat from "../assets/img/nav/gastehat.png";
import profile from "../assets/img/nav/profile.png";

export default function Nav() {
    return (
        <nav>
            <NavLink to="/posts"><img src= {gastehat} alt="nav icon" ></img><p>Udforsk</p></NavLink>
            <NavLink to="/ovelser"><img src= {dinetogter} alt="nav icon" ></img><p>Dine togter</p></NavLink>    
            <NavLink to="/fremskridt"><img src= {indbakke} alt="nav icon" ></img><p>Indbakke</p></NavLink>
            <NavLink to="/profile"><img src= {profile} alt="nav icon" ></img><p>Profil</p></NavLink>
        </nav>
    );
}
