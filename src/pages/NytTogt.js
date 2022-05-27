import { addDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { favsRef } from "../firebase-config";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import da from 'date-fns/locale/da';

import imgPlaceholder from "../assets/img/img-placeholder.jpg";
import rudder from "../assets/img/rudder.png";
import location from "../assets/img/locationicon.png";
import boat from "../assets/img/boaticon.png";
import calender from "../assets/img/calendericon.png";

export default function NewFavList({ showLoader }) {
    
    const [posts, setPosts] = useState([]);
    const [datas, setDatas] = useState([]);
    const [datas2, setDatas2] = useState([]);
    
    const [name, setName] = useState("");
    const [beskrivelse, setBeskrivelse] = useState("");
    const [sejlområde, setSejlområde] = useState({});
    const [erfaring, setErfaring] = useState({});
    const [aktiviteter, setAktiviteter] = useState({});
    const [image, setImage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [startDate, setStartDate] = useState(new Date());



    const navigate = useNavigate();

    
    useEffect(() => {
        async function getPosts() {
            const url = "https://api.jsonbin.io/b/628ca823402a5b38020b1aff";
            const response = await fetch(url);
            const data = await response.json();
            setPosts(data);
            console.log(data);
            showLoader(false);
            
        }
        getPosts();
    }, [showLoader]);

    useEffect(() => {
        async function getData() {
            const url1 = "https://api.jsonbin.io/b/628f8a72402a5b38020eb42c";
            const response1 = await fetch(url1);
            const data1 = await response1.json();
            setDatas(data1);
            console.log(data1);
            showLoader(false);
            
        }
        getData();
    }, [showLoader]);

    useEffect(() => {
        async function getData2() {
            const url2 = "https://api.jsonbin.io/b/628f9ee4402a5b38020ecf6a";
            const response2 = await fetch(url2);
            const data2 = await response2.json();
            setDatas2(data2);
            console.log(data2);
            showLoader(false);
            
        }
        getData2();
    }, [showLoader]);
    
    async function handleSubmit(event) {
        event.preventDefault();

        const newFavList = {
            name: name,
            beskrivelse: beskrivelse,
            image: image,
            sejlområde: sejlområde,
            erfaring: erfaring,
            aktiviteter: aktiviteter,
            startDate: startDate
        };

        await addDoc(favsRef, newFavList);
        navigate("/dinetogter");
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
            <h1>Ny sejlads</h1>
            <form onSubmit={handleSubmit}>
            <label>
                    Image
                    <input type="file" className="file-input" accept="image/*" onChange={handleImageChange} />
                    <img className="image-preview" src={image} alt="Choose" onError={e => (e.target.src = imgPlaceholder)} />
                </label>
            
                <label>
                    Navngiv din sejlads
                    <input type="text" placeholder="Navngiv plan" onChange={e => setName(e.target.value)} />
                </label>

                <label>
                    Beskrivelse
                    <input className="beskrivelse" type="text" placeholder="Beskrivelse" onChange={e => setBeskrivelse(e.target.value)} />
                </label>
                
                   <label>
                    
                <DatePicker locale={da} dateFormat="dd/MM/yyyy" selected={startDate} onChange={(e:Date) => setStartDate(e)} />
                </label> 
                    
                    <label >
                        Vælg sejlområde
                        <img src={location} alt="location icon" className="icons"/>
                        <select onChange={e => setSejlområde(e.target.value)}>
                            <option>Sejlområde</option>
                            {posts.map(post => (
                                <option value={post.name} key={post.name}>
                                    {post.name}
                                </option>
                            ))}
                        </select>
                        
                    </label>

                    <label>
                        Vælg erfaring
                        <img src={rudder} alt="rudder icon" className="icons"/>
                        <select onChange={e => setErfaring(e.target.value)}>
                            <option>Erfaring</option>
                            {datas.map(data => (
                                <option value={data.erfaring} key={data.erfaring}>
                                    {data.erfaring}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Vælg aktiviteter
                        <img src={boat} alt="boat icon" className="icons"/>
                        <select onChange={e => setAktiviteter(e.target.value)}>
                            <option>Aktiviteter</option>
                            {datas2.map(data2 => (
                                <option value={data2.aktiviteter} key={data2.aktiviteter}>
                                    {data2.aktiviteter}
                                </option>
                            ))}
                        </select>
                    </label>

                    

                <button type="submit">Opret togt</button>
                <p className="text-error">{errorMessage}</p>
            </form>
        </section>
    );
}