import logo from "../assets/img/logo.png";
import indbakke from"../assets/img/indbakke.png";

export default function Indbakke( {showLoader} ) {

    showLoader(false);


    return (
        <section className="page">
            <img src={logo} alt="logo" className="logo"/>
        <img src={indbakke} alt="indbakke" className="indbakke"/>
        
        </section>
    )

}