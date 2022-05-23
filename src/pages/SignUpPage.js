import { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import React from "react";
import logo from "../assets/img/logo.png";
import onboarding from "../assets/img/onboarding.png";
import { usersRef } from "../firebase-config";
import { doc, setDoc } from "@firebase/firestore";

export default function SignUpPage({ showLoader }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [lastName, setlastName] = useState("");
  const auth = getAuth();

  useEffect(() => {
    showLoader(false);
  }, [showLoader]);

  function handleSignUp(event) {
    event.preventDefault();
    const mail = event.target.mail.value; 
    const password = event.target.password.value; 

    createUserWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
       
        const user = userCredential.user;
        console.log(user); 
        saveUserInfo();
      })
      .catch((error) => {
        let code = error.code; 
        console.log(code);
        code = code.replaceAll("-", " "); 
        code = code.replaceAll("auth/", "");
        setErrorMessage(code);
      });
  }

  async function saveUserInfo() {
    const userToUpdate = {
      name: name, 
      lastName: lastName, 
    };
    const docRef = doc(usersRef, auth.currentUser.uid);
    await setDoc(docRef, userToUpdate);
  }

  return (
    <section className="page">
      <img className="logo" src={logo} alt="Logo" />
      <img className="logo" src={onboarding} alt="onboarding" />
      
      <form onSubmit={handleSignUp}>
        <label>
          <p>Navn*</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            placeholder="Angiv dit navn"
          />
        </label>
        <label>
          <p>Efternavn*</p>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
            name="name"
            placeholder="Angiv dit navn"
          />
        </label>
        <label>
        <p>Mail*</p>
        <input type="email" name="mail" placeholder="Indtast din email" />
        </label>
        <label>
        <p>Kodeord*</p>
        <input
          type="password"
          name="password"
          placeholder="Indtast dit kodeord"
        />
        </label>
        <p className="text-error">{errorMessage}</p>
        <button>Næste</button>
      </form>
      <p className="text-center">
        Har du allerede en bruger? <Link to="/sign-in">Log in</Link>
      </p>
    </section>
  );
}