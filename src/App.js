import { Routes, Navigate, Route } from "react-router-dom";
import Nav from "./components/Nav";
import DineTogter from "./pages/DineTogter";
import Togt from "./pages/Togt";
import Loader from "./components/Loader";
import { useState } from "react";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ProfilePage from "./pages/ProfilePage";
import Indbakke from "./pages/Indbakke"
import FrontPage from "./pages/FrontPage";
import Udforsk from "./pages/Udforsk";
import NytTogt from "./pages/NytTogt";

function App() {
  const [showLoader, setShowLoader] = useState(true); // default value of the loader is true (loader displayed)
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth")); // default value comes from localStorage

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      
      setIsAuth(true); 
      localStorage.setItem("isAuth", true); 
    } else {
      
      setIsAuth(false); 
      localStorage.removeItem("isAuth"); 
    }
  });

    const privateRoutes = (
        <>
            <Nav />
            <Routes>
                <Route path="/" element={<Udforsk showLoader={setShowLoader} />} />
                <Route path="/dinetogter/plan/:id" element={<Togt showLoader={setShowLoader} />} />
                <Route path="/dinetogter" element={<DineTogter showLoader={setShowLoader} />} />
                <Route path="/profile" element={<ProfilePage showLoader={setShowLoader} />} />
                <Route path="/indbakke" element={<Indbakke showLoader={setShowLoader} />} />
                <Route path="/nyt-togt" element={<NytTogt showLoader={setShowLoader} />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    );


  const publicRoutes = (
    <Routes>
      <Route path="/front" element={<FrontPage showLoader={setShowLoader} />} />
      <Route
        path="/sign-in"
        element={<SignInPage showLoader={setShowLoader} />}
      />
      <Route
        path="/sign-up"
        element={<SignUpPage showLoader={setShowLoader} />}
      />
      <Route path="*" element={<Navigate to="/front" />} />
    </Routes>
  );

  return (
    <main>
      {isAuth ? privateRoutes : publicRoutes}
      {showLoader && <Loader />}
    </main>
  );
}

export default App;
