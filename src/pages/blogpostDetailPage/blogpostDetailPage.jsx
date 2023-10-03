import "./blogpostDetailPage.css"
import React, {useState, useEffect} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
// import posts from '../../constants/data.json';
import axios from "axios";
// import { blogPosts as blogposts } from "../blogpostPage/blogpostPage.jsx";

function BlogpostDetailPage() {
    const { blogId } = useParams();
    const [blogPost, setBlogPost] = useState([]);
    // const blogPost = posts.find((post) => post.id === parseInt(blogId));
    const navigate = useNavigate();

    async function getBlogPostById(blogId) {
        try {
            const result = await axios.get(`http://localhost:3000/posts/${blogId}`);
            setBlogPost (result.data);
        } catch (e) {
            console.error(e);
        }

    }
    // getBlogPostById(blogId)
    //
    // useEffect(() => {
    //     getBlogPostById(blogId);
    // }, [blogId]);





    useEffect(() => {
        getBlogPostById(blogId);
    }, [blogId]);

    if (!blogPost) {
        return <h1>Blogpost niet gevonden</h1>;
    }

    async function deletePostRequest() {
        try {
            const deleteData = await axios.delete(`http://localhost:3000/posts/${blogId}`);
            console.log(deleteData.data);
            navigate('/blogposts');
        } catch (e) {
            console.error(e);
        }
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
                <p>id: {blogPost.id}</p>
                <Link to="/blogposts" className="back-link">Terug naar overzicht</Link>
            </>
                )}
            <button type="button" onClick={deletePostRequest}>delete blogpost</button>
        </div>
    );
}

export default BlogpostDetailPage;
