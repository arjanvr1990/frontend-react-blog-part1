import "./blogpostDetailPage.css"
import { useParams } from 'react-router-dom';
function BlogpostDetail() {
    const {blogId} = useParams();
    return (

    <>
            <h1>Blogpost Detail Page</h1>
            <h2>Blog ID: {blogId}</h2>
        </>
    )
}

export default BlogpostDetail