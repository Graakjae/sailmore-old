import { useEffect, useState } from "react";

export default function PostForm({ post }) {

  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [posts, setPosts] = useState([]);
  const [rating, setRating] = useState([]);
  const [reads, setReads] = useState([]);



  useEffect(() => {
    if (post) {
      
      setName(post.name);
      setPosts(post.posts);
      setRating(post.rating);
      setReads(post.reads);

    }
  }, [post]); 


  return (
    <section>
      <h1> {post.name} </h1>
      <p> {post.reads} </p>
      <p> {post.rating} </p>
      
      
      
      <p className="text-error">{errorMessage}</p>
    </section>
  );
}
