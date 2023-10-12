import { Link } from 'react-router-dom'
import '../assets/css/404Page.css'
export default function Error() {
    return (

        <>
            <div className='container page_404'>
                <section className="error-container">
                    <span className="four"><span className="screen-reader-text">4</span></span>
                    <span className="zero"><span className="screen-reader-text">0</span></span>
                    <span className="four"><span className="screen-reader-text">4</span></span>
                </section>
                <div className="link-container">
                    <h3>Oops......</h3>
                    <h6>You’re either misspelling the URL
                        or requesting a page that's no longer here.</h6>
                    <Link to={"/"} className="more-link">Go to HomePage</Link>
                </div>
            </div>
        </>
    )
}
