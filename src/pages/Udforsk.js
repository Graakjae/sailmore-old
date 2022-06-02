import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import logo from "../assets/img/logo.png";
import { onSnapshot } from "@firebase/firestore";
import { gasterRef } from "../firebase-config";
import imgPlaceholder from "../assets/img/img-placeholder.jpg";
import rudder from "../assets/img/rudder.png";
import location from "../assets/img/locationicon.png";
import calender from "../assets/img/calendericon.png";


export default function Udforsk({ showLoader }) {

    const [filteredUser, setFilteredUser] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(gasterRef, data => {
            const userData = data.docs?.map(doc => {
                
                return { ...doc.data(), id: doc.id }; 
            });
            console.log(userData);
            setUsers(userData);
            showLoader(false);
        });
        return () => unsubscribe(); 
    }, [showLoader]);

    function handleSearch(val) {
         console.log(val);
         const filteredData = filteredUser.filter(user => user.name.toLowerCase().includes(val));
         setFilteredUser(filteredData);
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
            <img src={logo} alt="logo" className="logo"/>
            
            <SearchBar setValue={handleSearch} /> 
            {users.map(user => (
                    <section className="udforskPage">
                            <div>
                                <img src={user?.image} alt={user?.title} className="togtimg" onError={e => (e.target.src = imgPlaceholder)}/>
                                <h1 className="gasth1"> {user.name} {user.lastName}</h1>
                            </div>
                            <div className="flexbox3">
                            <p>{user?.sejlområde}</p>
                            <img src={location} alt="location icon" className="icons"/>
                            </div>
                            <div className="flexbox3">
                                <p>{getDate(user?.startDate)} - {getDate2(user?.endDate)}</p>  
                                <img src={calender} alt="calender icon" className="icons"/>
                            </div>
                            <div className="flexbox3">
                            <div>
                                <p>{user?.erfaring}</p>
                            </div>
                                <img src={rudder} alt="rudder icon" className="icons"/>
                            </div>
                    </section>
                            ))}
        </section>
    );
}
