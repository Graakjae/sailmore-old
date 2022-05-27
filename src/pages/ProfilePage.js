import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { usersRef } from "../firebase-config";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import imgPlaceholder from "../assets/img/img-placeholder.jpg";

export default function ProfilePage({ showLoader }) {
  const [name, setName] = useState("");
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
        setErrorMessage("The image file is too big!");
    }
}

  return (
    <section className="page">
      <h1>Profil</h1>
      <form className="profilePage" onSubmit={handleSubmit}>
      <label>
                    Image
                    <input type="file" className="file-input" accept="image/*" onChange={handleImageChange} />
                    <img className="image-preview" src={image} alt="Choose" onError={event => (event.target.src = imgPlaceholder)} />
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
