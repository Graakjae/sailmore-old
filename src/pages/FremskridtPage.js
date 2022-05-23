import Udvikling from "../assets/img/udvikling.PNG";
import Kalender from "../assets/img/kalender.PNG";
import Album from "../assets/img/album.PNG";


export default function FremskridtPage( {showLoader} ) {

    showLoader(false);


    return (
        <section className="fremskridt">
        <h1>Dine fremskridt</h1>
        <h3>Din udvikling</h3>
        <img src= {Udvikling} alt="udvikling graf" ></img>
        <h3>Kalender</h3>
        <img src= {Kalender} alt="kalender" ></img>
        <h3>Album</h3>
        <img className="album" src= {Album} alt="album" ></img>
        </section>
    )

}