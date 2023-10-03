import "./newBlogpostPage.css"
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function NewBlogpost() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        author: '',
        content: '',
    });

    const [formErrors, setFormErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [highestId, setHighestId] = useState(0);


    useEffect(() => {
        // Haal de blogposts op en zoek het hoogste ID
        async function fetchBlogPosts() {
            try {
                const result = await axios.get("http://localhost:3000/posts");
                const blogPosts = result.data;
                let maxId = 0;
                for (const post of blogPosts) {
                    if (post.id > maxId) {
                        maxId = post.id;
                    }
                }
                setHighestId(maxId);
            } catch (e) {
                console.error(e);
            }
        }

        fetchBlogPosts(); // Hier wacht je op de Promise met await
    }, []);


    const calculateReadTime = (content) => {
        const words = content.split(' ').length;
        const readTime = Math.round((words / 100) * 0.3);
        return readTime;
    };


    // async function handleSubmit() {
    //     e.preventDefault();
    //     const generateNewId = () => {
    //         return highestId + 1;
    //     };
    //
    //     // Validatie van de ingevulde gegevens
    //     const errors = {};
    //     if (!formData.title) {
    //         errors.title = 'Titel is verplicht';
    //     }
    //     if (!formData.subtitle) {
    //         errors.subtitle = 'Subtitel is verplicht';
    //     }
    //     if (!formData.author) {
    //         errors.author = 'Auteur is verplicht';
    //     }
    //     if (!formData.content) {
    //         errors.content = 'Bericht is verplicht';
    //     }
    //
    //     setFormErrors(errors);
    //
    //     if (Object.keys(errors).length > 0) {
    //         return;
    //     }

    async function handleSubmit(e) {
        e.preventDefault(); // Voorkom standaardgedrag van het formulier

        const generateNewId = () => {
            return highestId + 1;
        };

        // Validatie van de ingevulde gegevens
        const errors = {};
        if (!formData.title) {
            errors.title = 'Titel is verplicht';
        }
        if (!formData.subtitle) {
            errors.subtitle = 'Subtitel is verplicht';
        }
        if (!formData.author) {
            errors.author = 'Auteur is verplicht';
        }
        if (!formData.content) {
            errors.content = 'Bericht is verplicht';
        }

        setFormErrors(errors); // Update de foutmeldingen

        if (Object.keys(errors).length > 0) {
            return; // Stop met verzenden als er fouten zijn
        }







        // Bereken shares, comments, timestamp en readTime
        const shares = 0;
        const comments = 0;
        const timestamp = new Date().toISOString();
        const readTime = calculateReadTime(formData.content);
        const newId = generateNewId();

        // Voeg gegevens toe aan de blogpost
        const newBlogPost = {
            ...formData,
            id: newId,
            shares,
            comments,
            created: timestamp,
            readTime,
        };

        // Log de blogpostgegevens in de console
        console.log('Nieuwe blogpost:', newBlogPost);

        // Stuur de gebruiker door naar de overzichtspagina
        navigate('/blogposts');

        // Markeer het formulier als ingediend
        setFormSubmitted(true);

        // Reset het formulier
        setFormData({
            title: '',
            subtitle: '',
            author: '',
            content: '',
        });

        try {
            const response = await axios.post("http://localhost:3000/posts", newBlogPost)
            console.log(response.data);
            } catch (e) {
            console.error(e)
        }
    }


    return (
        <div>
            <h2 className="form-title">Nieuwe Blogpost Toevoegen</h2>
            {formSubmitted ? (
                <div>Bedankt voor het indienen van de blogpost!</div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="form-label">Titel</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({...formData, title: e.target.value})
                            }
                            className="form-input"
                        />
                        {formErrors.title && <div className="form-error">{formErrors.title}</div>}
                    </div>
                    <div>
                        <label className="form-label">Subtitel</label>
                        <input
                            type="text"
                            name="subtitle"
                            value={formData.subtitle}
                            onChange={(e) =>
                                setFormData({...formData, subtitle: e.target.value})
                            }
                            className="form-input"
                        />
                        {formErrors.subtitle && (
                            <div className="form-error">{formErrors.subtitle}</div>
                        )}
                    </div>
                    <div>
                        <label className="form-label">Auteur</label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={(e) =>
                                setFormData({...formData, author: e.target.value})
                            }
                            className="form-input"
                        />
                        {formErrors.author && <div className="form-error">{formErrors.author}</div>}
                    </div>
                    <div>
                        <label className="form-label">Bericht</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={(e) =>
                                setFormData({...formData, content: e.target.value})
                            }
                            className="form-input"
                        />
                        {formErrors.content && (
                            <div className="form-error">{formErrors.content}</div>
                        )}
                    </div>
                    <button type="submit" className="form-submit">Verzenden</button>
                </form>
            )}
        </div>
    );
}

    export default NewBlogpost;
