import logo from "../assets/img/logo.png";


export default function FremskridtPage( {showLoader} ) {

    showLoader(false);


    return (
        <section className="page">
            <img src={logo} alt="logo" className="logo"/>
        <h1>Indbakke</h1>
        
        </section>
    )

}