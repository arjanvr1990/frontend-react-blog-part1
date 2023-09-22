import "./navigation.css"
import {Link, NavLink} from "react-router-dom";

function Navigation() {
    return (
       <nav>
           <div className="nav-container">
               <Link to="/"><h4>Biovgventure</h4></Link>
               
               <ul>
                   <li>
                       <NavLink
                           className={({isActive}) => isActive === true ? "active-menu-link" : "default-menu-link"}
                           to="/">
                           Home
                       </NavLink>
                   </li>

                   <li>
                       <NavLink
                           className={({isActive}) => isActive === true ? "active-menu-link" : "default-menu-link"}
                           to="/new">
                           Nieuw Blog
                       </NavLink>
                   </li>

                   <li>
                       <NavLink
                           className={({isActive}) => isActive === true ? "active-menu-link" : "default-menu-link"}
                           to="/blogposts">
                           Overzicht Blogs
                       </NavLink>
                   </li>

                   <li>
                       <NavLink
                           className={({isActive}) => isActive === true ? "active-menu-link" : "default-menu-link"}
                           to="/blogposts/:blogId">
                           Blogpost Details
                       </NavLink>
                   </li>
               </ul>
           </div>
       </nav>
    )
}

export default Navigation