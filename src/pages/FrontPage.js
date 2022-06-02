import { Link } from "react-router-dom";
import React, { useEffect } from "react";

import logo from "../assets/img/logo.png";
import captain from "../assets/img/captain.png";
import sailor from "../assets/img/sailor.png";

export default function FrontPage({ showLoader }) {
  

  useEffect(() => {
    showLoader(false);
  }, [showLoader]);

  
  return (
    <section className="page">
      <main>
        <img className="logo" src={logo} alt="Logo" />
        <h1>Velkommen til SailMore</h1>
        <div className="flex">
          <div className="square50">
          <h3>Gast</h3>
            <p>Nu er det nemmere end nogensinde at blive gast på et skib. Opret en profil og tilmeld dig din drømmesejlads!</p>
            <div className="square">
              <img src={sailor} alt="skipper" className="captain" />
                <button>
                    Opret gasteprofil
                  </button>
            </div>
          </div>
          <div className="square50">
            <h3>Skipper</h3>
            <p>Nu er det nemmere end nogensinde at finde gaster til din sejlads. Opret din sejlads og find gaster her</p>
            <div className="square">
              <img src={captain} alt="skipper" className="captain" />
                <button>
                    <Link to="/sign-up" className="noDec">Opret skipperprofil</Link>
                  </button>
            </div>
          </div>
        </div>
          <button>
            <Link className="noDec" to="/sign-in">Log ind</Link>
          </button>
        <p className="text-center">Har du glemt dit kodeord?</p>
      </main>
    </section>
  );
}
