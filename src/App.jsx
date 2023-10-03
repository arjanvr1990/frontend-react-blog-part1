import React from "react";
import './App.css'
import Navigation from "./components/navigation/navigation.jsx";
import Home from "./pages/home/homePage.jsx";
import Blogpost from "./pages/blogpostPage/blogpostPage.jsx";
import BlogpostDetail from "./pages/blogpostDetailPage/blogpostDetailPage.jsx";
import NewBlogpost from "./pages/newBlogpostPage/newBlogpostPage.jsx";
import {Routes, Route} from "react-router-dom"
// import axios from "axios";



function App() {


  return (
    <>
        <Navigation/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/new" element={<NewBlogpost/>}/>
            <Route path="/blogposts" element={<Blogpost/>}/>
            <Route path="/blogposts/:blogId" element={<BlogpostDetail/>}/>
        </Routes>

    </>
  )
}

export default App
