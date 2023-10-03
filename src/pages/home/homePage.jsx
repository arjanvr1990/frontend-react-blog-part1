import "./homePage.css"
import logo from "../../assets/logo.png";
import React from "react";

function Home() {
    return (
        <div className="page-container">
            <img src={logo} alt="Company logo"/>
            <h1>Begin hier met het maken van jouw blog-applicatie!</h1>
        </div>
    )
}

export default Home