import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { usersRef } from "../firebase-config";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import imgPlaceholder from "../assets/img/img-placeholder.jpg";

export default function ProfilePage({ showLoader }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
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
          setAge(userData.age);
          setWeight(userData.weight);
          setHeight(userData.height);
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
      age: age,
      weight: weight,
      height: height,
      image: image,
    }; 
    const docRef = doc(usersRef, auth.currentUser.uid); 
    await setDoc(docRef, userToUpdate); 
    showLoader(false);
  }

  function handleSignOut() {
    signOut(auth); 
  }

  

  return (
    <section className="page">
      <h1>Profil</h1>
      <form className="profilePage" onSubmit={handleSubmit}>
        <label>
          <input
            type="file"
            className="file-input"
            accept="image/*"
          />
          <img
            className="image-preview"
            src={image}
            alt="Choose"
            onError={(event) => (event.target.src = imgPlaceholder)}
          />
        </label>
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
          Alder
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            name="age"
            placeholder="Skriv alder"
          />
        </label>
        <label>
          Vægt i Kg
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            name="weight"
            placeholder="Skriv vægt"
          />
        </label>
        <label>
          Højde i cm
          <input
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            name="Height"
            placeholder="Skriv højde"
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

        <p className="text-error">{errorMessage}</p>
        <button>Gem</button>
      </form>
      <button className="button-logud" onClick={handleSignOut}>
        Logud
      </button>
    </section>
  );
}
