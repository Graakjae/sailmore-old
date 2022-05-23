import { Routes, Navigate, Route } from "react-router-dom";
import Nav from "./components/Nav";
import PostsPage from "./pages/PostsPage";
import PlanPage from "./pages/PlanPage";
import Loader from "./components/Loader";
import { useState } from "react";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ProfilePage from "./pages/ProfilePage";
import FremskridtPage from "./pages/FremskridtPage"
import FrontPage from "./pages/FrontPage";
import OvelserPage from "./pages/OvelserPage";
import NyPlanPage from "./pages/NyPlanPage";

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
                <Route path="/" element={<PostsPage showLoader={setShowLoader} />} />
                <Route path="/plan/:id" element={<PlanPage showLoader={setShowLoader} />} />
                <Route path="/profile" element={<ProfilePage showLoader={setShowLoader} />} />
                <Route path="/Fremskridt" element={<FremskridtPage showLoader={setShowLoader} />} />
                <Route path="/ovelser" element={<OvelserPage showLoader={setShowLoader} />} />
                <Route path="/ny-plan" element={<NyPlanPage showLoader={setShowLoader} />} />
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
