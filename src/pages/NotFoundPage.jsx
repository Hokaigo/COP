import {Link} from "react-router-dom";

export default function NotFoundPage(){
    return(
        <div className="text-center text-light">
            <h1>404 - Page not found.</h1>
            <p className="lead">Sorry this page does not exist.</p>
            <Link to="/" className="btn btn-primary">
                Back to main
            </Link>
        </div>
    )
}