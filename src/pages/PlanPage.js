import { doc, getDoc, deleteDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { favsRef } from "../firebase-config";

export default function UpdatePage({ showLoader }) {
    const params = useParams(); 
    const postId = params.id; 
    const [post, setPost] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getPost() {
            showLoader(true);
            const docRef = doc(favsRef, postId); 
            const docData = await getDoc(docRef); 
            setPost(docData.data()); 
            showLoader(false);
        }

        getPost();
    }, [showLoader, postId]); 

    async function deletePost() {
        const confirmDelete = window.confirm(`Er du sikker på du vil slette ${post.name}?`); 
        if (confirmDelete) {
            
            showLoader(true);
            const docRef = doc(favsRef, postId); 
            await deleteDoc(docRef); 
            navigate("/dinetogter");
        }
    }

    return (
        <section className="page">
            <h1>{post.name}</h1>
            <img src={post.image} alt={post.title} className="captain" />
            <p>{post.sejlområde}</p>
            {post.posts?.map(øvelse => (
                <article className="ovelser">
                    <h2>{øvelse.name}</h2>
                    
                </article>
            ))}
            
            <button className="button-delete" onClick={deletePost}>
                Slet togt
            </button>
        </section>
    );
}
