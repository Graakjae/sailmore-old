import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { usersRef } from "../firebase-config";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import imgPlaceholder from "../assets/img/img-placeholder.jpg";
import logo from "../assets/img/logo.png";

export default function ProfilePage({ showLoader }) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const auth = getAuth();

  useEffect(() => {
    showLoader(true);

    async function getUser() {
      if (auth.currentUser) {
        setEmail(auth.currentUser.email); 

        const docRef = doc(usersRef, auth.currentUser.uid); 
        const userData = (await getDoc(docRef)).data();
        if (userData) {
          
          setName(userData.name);
          setLastName(userData.lastName);
          setImage(userData.image);
        }
      }
      showLoader(false);
    }

    getUser();
  }, [auth.currentUser, showLoader]); 

  async function handleSubmit(event) {
    event.preventDefault();
    showLoader(true);

    const userToUpdate = {
      name: name,
      lastName: lastName,
      image: image,
    }; 
    const docRef = doc(usersRef, auth.currentUser.uid); 
    await setDoc(docRef, userToUpdate); 
    showLoader(false);
  }

  function handleSignOut() {
    signOut(auth); 
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file.size < 500000) {
        // image file size must be below 0,5MB
        const reader = new FileReader();
        reader.onload = event => {
            setImage(event.target.result);
        };
        reader.readAsDataURL(file);
        setErrorMessage(""); // reset errorMessage state
    } else {
        // if not below 0.5MB display an error message using the errorMessage state
        setErrorMessage("Billedet er for stort");
    }
}

  return (
    <section className="page">
        <img src={logo} alt="logo" className="logo"/>
      
      <form className="profilePage" onSubmit={handleSubmit}>

        <label>
            <input type="file" className="file-input" accept="image/*" onChange={handleImageChange} />
            <img className="image-preview" src={image} alt="Choose" onError={event => (event.target.src = imgPlaceholder)} />
        </label>

          <p>{errorMessage}</p>

        <label>
          Navn
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              placeholder="Skriv navn"
            />
        </label>
        <label>
          Efternavn
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              name="name"
              placeholder="Skriv navn"
            />
        </label>
        <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="Skriv email"
              disabled
            />
        </label>

          
          <button>Opdater oplysninger</button>
      </form>
      <button className="button-logud" onClick={handleSignOut}>
        Log ud
      </button>
    </section>
  );
}
