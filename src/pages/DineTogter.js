import { useState, useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { favsRef } from "../firebase-config";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";
import knap from "../assets/img/nyTogtKnap.png";


export default function HomePage({ post, showLoader }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(favsRef, data => {
            const favData = data.docs.map(doc => {
                
                return { ...doc.data(), id: doc.id }; 
            });
            console.log(favData);
            setPosts(favData);
            showLoader(false);
        });
        return () => unsubscribe(); 
    }, [showLoader]);

    const navigate = useNavigate();

    
    function handleClick() {
        navigate(`/nyt-togt`);
    }

    return (
        <section className="page">
           
                <img src={knap} alt="nyt togt knap" className="img-fixed" onClick={handleClick}/>
           
            
            <section className="grid-container">
                <h1>Dine togter</h1>
                {posts.map(post => (
                    <PostCard post={post} key={post.id} />
                ))}
                
            </section>

        </section>
    );
}
