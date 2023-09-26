import "./blogpostDetailPage.css"
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import posts from '../../constants/data.json';

function BlogpostDetailPage() {
    const { blogId } = useParams();
    const blogPost = posts.find((post) => post.id === parseInt(blogId));

    if (!blogPost) {
        return <div>Blogpost niet gevonden</div>;
    }

    return (
        <div className="blog-detail">
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
        </div>
    );
}

export default BlogpostDetailPage;
