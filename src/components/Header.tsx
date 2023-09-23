import { Link } from "react-router-dom";
import { useUserStore } from "../store/store";
import { useNavigate } from 'react-router-dom';
export default function Header() {

    const { user, setUser } = useUserStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the user data in the store
        setUser(null);

        // Remove the user data from localStorage and sessionStorage
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');

        // Redirect the user to the login page
        navigate('/login');
    };

    return (
        <header className="header-default sticky-top bg-light">
            <nav className="navbar navbar-expand-lg">
                <div className="container-xl">

                    <Link className="navbar-brand" to={"/"}
                    ><img src="images/logo-color.svg" alt="logo"
                        /></Link>

                    <div className="collapse navbar-collapse">

                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item dropdown active">
                                <a className="nav-link dropdown-toggle" href="index.html"
                                >Category</a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a href="" className="dropdown-item">Kĩ Thuận Phần Mềm &gt;</a>
                                        <ul className="dropdown-menu-left dropdown-submenu">
                                            <li>
                                                <a href="" className="dropdown-item">Môn 1</a>
                                            </li>
                                            <li>
                                                <a href="" className="dropdown-item">Môn 2</a>
                                            </li>
                                            <li>
                                                <a href="" className="dropdown-item">Môn 3</a>
                                            </li>
                                            <li>
                                                <a href="" className="dropdown-item">Môn 4</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="" className="dropdown-item">An toàn thông tin &gt;</a>
                                        <ul className="dropdown-menu-left dropdown-submenu">
                                            <li>
                                                <a href="" className="dropdown-item">Môn 1</a>
                                            </li>
                                            <li>
                                                <a href="" className="dropdown-item">Môn 2</a>
                                            </li>
                                            <li>
                                                <a href="" className="dropdown-item">Môn 3</a>
                                            </li>
                                            <li>
                                                <a href="" className="dropdown-item">Môn 4</a>
                                            </li>
                                            <li>
                                                <a href="" className="dropdown-item">Môn 5</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="" className="dropdown-item">Trí tuệ nhân tạo &gt;</a>
                                        <ul className="dropdown-menu-left dropdown-submenu">
                                            <li>
                                                <a href="" className="dropdown-item">Môn 1</a>
                                            </li>
                                            <li>
                                                <a href="" className="dropdown-item">Môn 2</a>
                                            </li>
                                            <li>
                                                <a href="" className="dropdown-item">Môn 3</a>
                                            </li>
                                        </ul>
                                    </li>

                                    <li>
                                        <a className="dropdown-item" href="classNameic.html">classNameic</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="category.html">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="category.html">Inspiration</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#">Pages</a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="category.html">Category</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="blog-single.html">Blog Single</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="blog-single-alt.html">Blog Single Alt</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="about.html">About</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="contact.html">Contact</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="contact.html">Contact</a>
                            </li>
                        </ul>
                    </div>


                    <div className="header-right">


                        <div className="header-buttons">
                            <button className="search icon-button">
                                <i className="icon-magnifier"></i>
                            </button>
                            <button className="icon-button" onClick={() => { navigate('/writepost') }}>
                                <i className="icon-note"></i>
                            </button>
                            {/* <!-- <button className="burger-menu icon-button">
                  <span className="burger-icon"></span>
                </button> --> */}
                            {user ? <>


                                <div className="btn-group dropdown-center">
                                    <button type="button" className="btn dropdown-toggle" style={{ color: "orange" }} data-bs-toggle="dropdown" aria-expanded="false">
                                        Hi, {user.fullname}
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#">Trang cá nhân</a></li>

                                        <li><hr className="dropdown-divider" /></li>
                                        <li className="logout"><a className="dropdown-item" onClick={handleLogout}>Đăng xuất</a></li>
                                    </ul>
                                </div>
                            </> :
                                <span className="px-4 login"><Link to={"/login"} className="login">Đăng nhập</Link> </span>}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
