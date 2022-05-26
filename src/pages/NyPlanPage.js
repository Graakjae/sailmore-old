import { addDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { favsRef } from "../firebase-config";
import imgPlaceholder from "../assets/img/img-placeholder.jpg";


export default function NewFavList({ showLoader }) {
    const [posts, setPosts] = useState([]);
    const [selectedPosts, setSelectedPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState({});
    const [name, setName] = useState("");
    const [sejlområde, setSejlområde] = useState({});

    const [image, setImage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");



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
    
    async function handleSubmit(event) {
        event.preventDefault();

        const newFavList = {
            name: name,
            posts: selectedPosts,
            image: image,
            sejlområde: sejlområde
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
                    <img className="image-preview" src={image} alt="Choose" onError={event => (event.target.src = imgPlaceholder)} />
                </label>
            
                <label>
                    Navngiv din sejlads
                    <input type="text" placeholder="Navngiv plan" onChange={e => setName(e.target.value)} />
                </label>
                
                <section className="add-posts">
                    <label>
                        Vælg sejlområde
                        <select onChange={e => setSejlområde(e.target.value)}>
                            <option>Sejlområde</option>
                            {posts.map(post => (
                                <option value={post.name} key={post.name}>
                                    {post.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    
                </section>

                <button type="submit">Opret togt</button>
                <p className="text-error">{errorMessage}</p>
            </form>
        </section>
    );
}