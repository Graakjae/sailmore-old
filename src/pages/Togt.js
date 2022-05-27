import { doc, getDoc, deleteDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { favsRef } from "../firebase-config";

import rudder from "../assets/img/rudder.png";
import location from "../assets/img/locationicon.png";
import boat from "../assets/img/boaticon.png";
import calender from "../assets/img/calendericon.png";

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
    console.log(post);
    return (
        <section className="page">
           <div>
            <img src={post.image} alt={post.title} className="captain" />
            <h1>{post.name}</h1>
            <div className="flexbox">
                <p>{post.sejlområde}</p>
                <img src={location} alt="location icon" className="icons2"/>
            </div>
            </div>
            <div className="flexbox">
                <p>{post.startDate}</p>
                <img src={calender} alt="location icon" className="icons2"/>
            </div>
            <div className="flexbox">
                <p>{post.sejlområde}</p>
                <img src={location} alt="location icon" className="icons2"/>
            </div>
                <p>Gasternes sejlerfaring</p>
            <div className="flexbox">
                <p>{post.erfaring}</p>
                <img src={rudder} alt="location icon" className="icons2"/>
            </div>
                <p>Aktiviteter på turen</p>
            <div className="flexbox">
                <p>{post.aktiviteter}</p>
                <img src={boat} alt="location icon" className="icons2"/>
            </div>
            
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
