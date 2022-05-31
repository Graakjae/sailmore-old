import { useNavigate } from "react-router-dom";
import imgPlaceholder from "../assets/img/img-placeholder.jpg";



export default function PostCard({ post }) {
    const navigate = useNavigate();
    

    function handleClick() {
        navigate(`/dinetogter/plan/${post.id}`);
    }


    return (
        <article onClick={handleClick}>
                <div>
                    <img src={post?.image} alt={post?.title} className="togtimg" onError={e => (e.target.src = imgPlaceholder)}/>
                    <h1 className="togth1">{post?.name}</h1>
                </div>
        </article>
    );
}
