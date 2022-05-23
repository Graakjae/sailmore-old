import { useNavigate } from "react-router-dom";

export default function PostCard({ post }) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`plan/${post.id}`);
    }

    return (
        <article onClick={handleClick}>
            <h2 className="pad">{post.name}</h2>
        </article>
    );
}
