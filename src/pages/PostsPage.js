import { useState, useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { favsRef } from "../firebase-config";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";

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
        navigate(`/ny-plan`);
    }

    return (
        <section className="page">
            <button className="button-fixed" onClick={handleClick}>Opret træningsplan</button>
            
            <section className="grid-container">
                <h1>Dine træningsplaner</h1>
                {posts.map(post => (
                    <PostCard post={post} key={post.id} />
                ))}
                
            </section>

        </section>
    );
}
