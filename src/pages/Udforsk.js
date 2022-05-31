import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import logo from "../assets/img/logo.png";
import { onSnapshot } from "@firebase/firestore";
import { usersRef } from "../firebase-config";
import UserAvatar from "../components/UserAvatar";


export default function OvelserPage({ showLoader }) {

    
    const [filteredUser, setFilteredUser] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(usersRef, data => {
            const userData = data.docs.map(doc => {
                
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

    return (
        <section className="page">
            <img src={logo} alt="logo" className="logo"/>
            
            <SearchBar setValue={handleSearch} /> 
            
            {users.map(user => (
                    <UserAvatar post={user} key={user.id} />
                    
                ))}
            <img src={users.image} alt={users.id} className="userimg" />
            <h2>{users.name}</h2>
        </section>
    );
}
