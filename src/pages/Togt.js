import { doc, getDoc, deleteDoc } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { favsRef } from "../firebase-config";

import logo from "../assets/img/logo.png";
import rudder from "../assets/img/rudder.png";
import location from "../assets/img/locationicon.png";
import boat from "../assets/img/boaticon.png";
import calender from "../assets/img/calendericon.png";
import coins from "../assets/img/coinsicon.png";
import arrow from "../assets/img/arrow.png";


export default function Togt({ showLoader }) {
    const params = useParams(); 
    const postId = params.id; 
    const [post, setPost] = useState({});
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

    function getDate(startDate) { 
        if (startDate) {
        const date = startDate.toDate();
        console.log(date);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
    }

    function getDate2(endDate) { 
        if (endDate) {
        const date = endDate.toDate();
        console.log(date);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
    }

    

    return (
        <section className="page">
            <button className="buttonback" onClick={() => navigate(-1)}>
                <img src={arrow} alt="arrow" className="arrow"/>
            </button> 
                  <img className="logo" src={logo} alt="Logo" />
           <div>
                <img src={post?.image} alt={post?.title} className="togtimg" />
                <h1 className="togth1">{post?.name}</h1>
            </div>
            <div className="flexbox3">
                <p>{post?.sejlområde}</p>
                <img src={location} alt="location icon" className="icons"/>
            </div>
            <div className="flexbox3">
                <p>{getDate(post?.startDate)} - {getDate2(post?.endDate)}</p>  
                <img src={calender} alt="calender icon" className="icons"/>
            </div>
            <div className="flexbox3">
                <p>{post?.pris} kr / dag</p>
                <img src={coins} alt="coins icon" className="icons"/>
            </div>
            
            <div className="flexbox bordertop">
                    <p>{post?.beskrivelse}</p>
            </div>
            <div className="flexbox">
                <div>
                    <h3>Gasternes sejlerfaring</h3>
                    <p>{post?.erfaring}</p>
                </div>
                    <img src={rudder} alt="rudder icon" className="icons2"/>
            </div>
                
            <div className="flexbox">
                <div>
                <h3>Aktiviteter på turen</h3>
                 {post?.selectedAktiviteter?.map(aktivitet => (
                    <p>{aktivitet.label}</p>
                ))} 
                </div>
                <img src={boat} alt="location icon" className="icons2"/>
            </div>
            
            <button className="button">
                Opdater oplysninger
            </button>
            
            <button className="button-delete" onClick={deletePost}>
                Slet togt
            </button>
        </section>
        
    );
    
}
