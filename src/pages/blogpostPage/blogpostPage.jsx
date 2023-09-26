// BlogpostPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import posts from '../../constants/data.json';
import './BlogpostPage.css'; // Importeer de CSS

function BlogpostPage() {
    return (
        <div className="blog-layout">

            <h1>Totaal aantal blogposts: {posts.length}</h1>
            <ul className="blog-list">
                {posts.map((blogPost) => (
                    <li key={blogPost.id}>
                        <Link to={`/blogposts/${blogPost.id}`} className="blog-title">
                            {blogPost.title}
                        </Link>
                        (<span className="author">{blogPost.author}</span>)
                        <br />
                        {blogPost.comments} reacties - {blogPost.shares} keer gedeeld
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BlogpostPage;
