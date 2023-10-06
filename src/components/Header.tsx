import { Link, useNavigate } from "react-router-dom";
import { useButtonNavRefStore, useUserStore } from "../store/store";

import { useEffect, useRef } from "react";

import { ToastContainer } from "react-toastify";

import { useNavbarStore } from "../store/store";

export interface categories {
    categoryId: number,
    categoryName: string,
    subCategory: categories[],

}
export interface pages {
    id: number,
    name: string,
    url: string,
    subPages: pages[],
}


export default function Header() {

    const { user, setUser } = useUserStore();
    const navigate = useNavigate();
    const { setButtonNavRef } = useButtonNavRefStore();
    // Sử dụng useRef để tạo một ref cho buttonNav
    const buttonNavRefs = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        // Gán giá trị cho buttonNavRef sau khi component đã render
        setButtonNavRef(buttonNavRefs);
    }, [setButtonNavRef]);


    const { isNavbar, setNavbar } = useNavbarStore();


    const toggleNavbar = () => {
        setNavbar(!isNavbar);
    };


    const handleLogout = () => {
        // Clear the user data in the store
        setUser(null);

        // Remove the user data from localStorage and sessionStorage
        localStorage.clear();
        sessionStorage.clear();

        // Redirect the user to the login page
        navigate('/login');
    };





    return (
        <>
            <ToastContainer />

            <header className="header-default bg-light sticky-top">
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">

                        <a className="navbar-brand" href="index.html"><img src="images/logo.svg" alt="logo" /></a>

                        <div className="collapse navbar-collapse">

                            {/* <ul className="navbar-nav mr-auto">
                                <li className="nav-item dropdown active">
                                    <a className="nav-link dropdown-toggle" href="index.html">Pages</a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="index.html">Magazine</a></li>
                                        <li><a className="dropdown-item" href="personal.html">Personal</a></li>
                                        <li><a className="dropdown-item" href="personal-alt.html">Personal Alt</a></li>
                                        <li><a className="dropdown-item" href="minimal.html">Minimal</a></li>
                                        <li><a className="dropdown-item" href="classNameic.html">classNameic</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="category.html">Lifestyle</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="category.html">Inspiration</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#">Pages</a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="category.html">Category</a></li>
                                        <li><a className="dropdown-item" href="blog-single.html">Blog Single</a></li>
                                        <li><a className="dropdown-item" href="blog-single-alt.html">Blog Single Alt</a></li>
                                        <li><a className="dropdown-item" href="about.html">About</a></li>
                                        <li><a className="dropdown-item" href="contact.html">Contact</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="contact.html">Contact</a>
                                </li>
                            </ul> */}
                        </div>


                        <div className="header-right">


                            <div className="header-buttons">
                                <div className="header-buttons">
                                    <button className="search icon-button">
                                        <i className="icon-magnifier"></i>
                                    </button>
                                    <button className="icon-button" onClick={() => { navigate('/writepost') }}>
                                        <i className="icon-bell"></i>
                                    </button>
                                    <button className="icon-button" onClick={toggleNavbar} ref={buttonNavRefs} >
                                        <i className="icon-menu"></i>
                                    </button>
                                    {user ?
                                        <div className="btn-group dropdown-center">
                                            <button type="button" className="btn dropdown-toggle" style={{ color: "orange" }} data-bs-toggle="dropdown" aria-expanded="false">
                                                Hi, {user.fullname}
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><Link className="dropdown-item" to={"/profile"}>Trang cá nhân</Link></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li className="logout"><a className="dropdown-item" onClick={handleLogout}>Đăng xuất</a></li>
                                            </ul>
                                        </div>
                                        :
                                        <span className="px-4 login"><Link to={"/login"} className="login">Đăng nhập</Link> </span>}

                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>



        </>
    )
}
