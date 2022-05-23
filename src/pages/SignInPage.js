import { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import React from "react";
import logo from "../assets/img/logo.png";

export default function SignInPage({ showLoader }) {
  const [errorMessage, setErrorMessage] = useState("");
  const auth = getAuth();

  useEffect(() => {
    showLoader(false);
  }, [showLoader]);

  function signIn(event) {
    event.preventDefault();
    const mail = event.target.mail.value; 
    const password = event.target.password.value; 

    signInWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        
        const user = userCredential.user;
        console.log(user); 
      })
      .catch((error) => {
        let code = error.code; 
        console.log(code);
        code = code.replaceAll("-", " "); 
        code = code.replaceAll("auth/", "");
        setErrorMessage(code);
      });
  }
  return (
    <section className="page">
      <img className="logo" src={logo} alt="Logo" />
      <form onSubmit={signIn}>
        <p>Email</p>
        <input type="email" name="mail" placeholder="Indtast din email" />
        <p>Kodeord</p>
        <input
          type="password"
          name="password"
          placeholder="Indtast dit kodeord"
        />
        <p className="text-error">{errorMessage}</p>
        <button>Log ind</button>
      </form>
      <p className="text-center1">
        Har du ikke en bruger? <Link to="/sign-up">Opret</Link>
      </p>
    </section>
  );
}
