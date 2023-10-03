// BlogpostPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import posts from '../../constants/data.json';
import './BlogpostPage.css';
import axios from "axios"; // Importeer de CSS

function BlogpostPage() {
    async function jsonData() {
        try {
            const result = await axios.get("http://localhost:3000/posts");
            console.log(result.data);
        } catch (e) {
            console.error(e);
        }
    }

    // jsonData();

    async function getBlogPostById(postId) {
        try {
            const result = await axios.get("http://localhost:3000/posts/${postId}");
            console.log(result.data);
        } catch (e) {
            console.error(e);
        }
    }

    // getBlogPostById();

    async function handlePostRequest() {
        const postData = {
            "id": 18,
            "title": "De Smaken van Italië",
            "subtitle": "Een culinaire reis door Bella Italia",
            "content": "Italië, het land van heerlijke pasta, pizza en gelato, is een culinair paradijs dat elke fijnproever moet ervaren. In deze blog nemen we je mee op een smakelijke reis door Bella Italia. Ontdek de geheimen achter de perfecte risotto, leer hoe je zelfgemaakte pasta maakt en proef de verrukkelijke regionale gerechten van Noord tot Zuid. Bereid je voor om je smaakpapillen te verwennen in de keuken van de laarsvormige natie.",
            "created": "2023-09-21T09:30:00Z",
            "author": "Anna de Kok",
            "readTime": 5,
            "comments": 12,
            "shares": 8
        };

        try {
            const response = await axios.post("http://localhost:3000/posts", postData);
            console.log(response.data)
        } catch (e) {
            console.error(e);
        }
    }

    async function deletePostRequest() {
        try {
            const deleteData = await axios.delete("http://localhost:3000/posts/18");
            console.log(deleteData.data);
        } catch (e) {
            console.error(e);
        }
    }

    async function changePostRequest() {
        const changeData = {
            "id": 25,
            "title": "werkt het",
            "subtitle": "echt waar, werkt het?",
            "content": "blijkbaar werkt het",
            "created": "2023-09-21T09:30:00Z",
            "author": "Arjan",
            "readTime": 1,
            "comments": 11,
            "shares": 100,
        };
        try {
            const change = await axios.put("http://localhost:3000/posts/18", changeData);
            console.log(change.data);
        } catch (e) {
            console.error(e);
        }
    }

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

            <button type="button" onClick={jsonData}>JSONData</button>
            <button type="button" onClick={() => getBlogPostById(6)}>blog id 6</button>
            <button type="button" onClick={handlePostRequest}>Post knop</button>
            <button type="button" onClick={deletePostRequest}>delete Post</button>
            <button type="button" onClick={changePostRequest}>change post</button>
        </div>
    );
}

export default BlogpostPage;
