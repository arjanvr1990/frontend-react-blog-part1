import "./blogpostDetailPage.css"
import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
// import posts from '../../constants/data.json';
import axios from "axios";
// import { blogPosts as blogposts } from "../blogpostPage/blogpostPage.jsx";

function BlogpostDetailPage() {
    const { blogId } = useParams();
    const [blogPost, setBlogPost] = useState([]);
    // const blogPost = posts.find((post) => post.id === parseInt(blogId));

    async function getBlogPostById(blogId) {
        try {
            const result = await axios.get(`http://localhost:3000/posts/${blogId}`);
            setBlogPost (result.data);
        } catch (e) {
            console.error(e);
        }

    }
    // getBlogPostById(blogId)

    // useEffect(() => {
    //     getBlogPostById(blogId);
    // }, [blogId]);

    if (!blogPost) {
        return <div>Blogpost niet gevonden</div>;
    }

    return (

        <div className="blog-detail">
            <button type="button" onClick={() => getBlogPostById(blogId)}>haal blogdetails op</button>

            {blogPost && (
            <>
                <h1 className="blog-title">{blogPost.title} ({blogPost.readTime} minuten)</h1>
                <h2 className="blog-subtitle">{blogPost.subtitle}</h2>
                <p className="blog-meta">
                    Geschreven door {blogPost.author} op {blogPost.created}
                </p>
                <p className="blog-content">{blogPost.content}</p>
                <p className="blog-actions">
                    {blogPost.comments} reacties - {blogPost.shares} keer gedeeld
                </p>
                <Link to="/blogposts" className="back-link">Terug naar overzicht</Link>
            </>
                )}

        </div>
    );
}

export default BlogpostDetailPage;
