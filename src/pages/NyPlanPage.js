import { addDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { favsRef } from "../firebase-config";

export default function NewFavList({ showLoader }) {
    const [posts, setPosts] = useState([]);
    const [selectedPosts, setSelectedPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState({});
    const [name, setName] = useState("");
    const [Set, setSet] = useState(0);
    const [Reps, setReps] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        async function getPosts() {
            const url = "https://api.jsonbin.io/b/623af66406182767437ddcdf/3";
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
            posts: selectedPosts
        };

        await addDoc(favsRef, newFavList);
        navigate("/");
    }

    function handleAddPost() {
        const post = posts.find(post => post.id == selectedPost);
        console.log(Set, Reps, post);
        post.Set = Set;
        post.Reps = Reps;
        setSelectedPosts(prevSelectedPosts => [...prevSelectedPosts, post]);
    }

    function handleRemove() {
        console.log(selectedPost);
        const filteredData = selectedPosts.filter(post => post.id != selectedPost);
        setSelectedPosts(filteredData);
    }

    return (
        <section className="page">
            <h1>Ny træningsplan</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Navngiv plan
                    <input type="text" placeholder="Navngiv plan" onChange={e => setName(e.target.value)} />
                </label>
                <label>
                    <section className="selected-posts">
                        {selectedPosts.length === 0 && <p>Ingen øvelser er tilføjet endnu</p>}
                        {selectedPosts.map(post => (
                            <article class="ovelser2" key={post.id}>
                                {post.name} Set: {post.Set} - Reps: {post.Reps}<a className="right" onClick={() => handleRemove(post.id)}>X</a>
                            </article>
                        ))}
                    </section>
                </label>
                <section className="add-posts">
                    <label>
                        Vælg øvelser
                        <select value={selectedPost} onChange={e => setSelectedPost(e.target.value)}>
                            <option>Øvelser</option>
                            {posts.map(post => (
                                <option value={post.id} key={post.id}>
                                    {post.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <input type="number" placeholder="Set" onChange={e => setSet(e.target.value)} />

                    <input type="number" placeholder="Reps" onChange={e => setReps(e.target.value)} />

                    <button type="button" onClick={handleAddPost}>
                        Tilføj øvelse
                    </button>
                </section>

                <button type="submit">Opret træningsplan</button>
            </form>
        </section>
    );
}