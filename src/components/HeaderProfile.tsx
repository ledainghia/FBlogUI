
import { useEffect } from 'react';
import { useUserStore } from '../store/store';

import { Link, useLocation } from 'react-router-dom';

import axiosInstance from '../config/axiosConfig';

export default function HeaderProfile() {

    const { user } = useUserStore();
    const path = useLocation();
    useEffect(() => {
        axiosInstance.get("/api/v1/auth/getUserInfo")
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            })
    }, [axiosInstance]);




    return (
        <>
            <header className="header-personal">
                <div className="container-xl header-top">
                    <div className="row align-items-center">
                        <div className="col-4 d-none d-md-block d-lg-block">
                            {/* <!-- social icons --> */}
                            <ul className="social-icons list-unstyled list-inline mb-0">
                                <li className="list-inline-item">
                                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#"><i className="fab fa-twitter"></i></a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#"><i className="fab fa-instagram"></i></a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#"><i className="fab fa-pinterest"></i></a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#"><i className="fab fa-medium"></i></a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#"><i className="fab fa-youtube"></i></a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-md-4 col-sm-12 col-xs-12 text-center">
                            {/* <!-- site logo --> */}
                            <a className="navbar-brand" href="personal.html"
                            ><img src={user?.picture} alt="logo"
                                /></a>
                            <a href="personal.html" className="d-block text-logo"
                            >{user?.fullname}<span className="dot">.</span></a>
                            {/* <span className="slogan d-block"
                            >
                                {user?.email} <strong> {user?.roles.map((index) => (
                                    <span key={index}> | {index}</span>
                                ))}
                                </strong></span> */}
                        </div>

                        <div className="col-md-4 col-sm-12 col-xs-12">
                            {/* <!-- header buttons --> */}
                            <div className="header-buttons float-md-end mt-4 mt-md-0">
                                <button className="search icon-button">
                                    <i className="icon-magnifier"></i>
                                </button>
                                <button
                                    className="burger-menu icon-button ms-2 float-end float-md-none"
                                >
                                    <span className=""><i className='icon-bell'></i></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>



            </header>
            <nav className="navbar navbar-expand-lg sticky-top p-3" style={{ backgroundColor: 'white' }}>
                <div className="container-xl">
                    <div
                        className="collapse navbar-collapse justify-content-center centered-nav">
                        {/* <!-- menus --> */}
                        <ul className="navbar-nav">
                            <li className={`nav-item dropdown ${path.pathname === "/profile" ? "active" : ""}`}>
                                <Link className="nav-link dropdown-toggle" to={"/"}>Blog</Link>
                                <ul className="dropdown-menu">
                                    {/* <!-- <li><a className="dropdown-item" href="home.html">Home</a></li> --> */}
                                    <li><Link to={"/profile"} className="dropdown-item">Personal</Link>

                                    </li>
                                    {/* <!-- <li><a className="dropdown-item" href="personal-alt.html">Personal Alt</a></li> -->
                                    <!-- <li><a className="dropdown-item" href="minimal.html">Minimal</a></li> --> */}
                                    <li><Link to={"/"} className="dropdown-item">Home</Link></li>
                                </ul>
                            </li>
                            <li className={`nav-item ${path.pathname === "/writepost" ? "active" : ""}`}>
                                <Link to={"/writepost"}>
                                    <a className="nav-link">Write</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="minimal.html">Mark Book</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="personal_folowing.html">Following</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link" href="setting.html">Setting</a>
                                {/* <!-- <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="category.html">Category</a></li>
                                    <li><a className="dropdown-item" href="blog-single.html">Blog Single</a></li>
                                    <li><a className="dropdown-item" href="blog-single-alt.html">Blog Single Alt</a></li>
                                    <li><a className="dropdown-item" href="about.html">About</a></li>
                                    <li><a className="dropdown-item" href="contact.html">Contact</a></li>
                                </ul> --> */}
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="contact.html">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
