import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/store";

import { useEffect, useRef } from "react";
import { Container, Navbar } from 'react-bootstrap';
import axiosInstance from "../config/axiosConfig";

import { ToastContainer } from "react-toastify";

import { useNavbarStore } from "../store/store";

export interface categories {
    categoryId: number,
    categoryName: string,
    subCategory: categories[],

}


export default function Header() {

    const { user, setUser } = useUserStore();
    const navigate = useNavigate();




    const navbarRef = useRef(null);
    const buttonNavRef = useRef(null);

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

    useEffect(() => {
        axiosInstance.get("/api/v1/auth/getUserInfo")
            .then(response => {
                console.log("userInfor", response);
                setUser(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);


    const handleDocumentClick = (e: MouseEvent) => {
        if (isNavbar)
            if (navbarRef.current && buttonNavRef) {
                if (!(navbarRef.current as HTMLElement).contains(e.target as Node) && !(buttonNavRef.current as unknown as HTMLElement).contains(e.target as Node)) {
                    setNavbar(false);
                    console.log("cc");
                }
            }
    };
    useEffect(() => {
        if (isNavbar) {
            document.addEventListener("click", handleDocumentClick);
        } else {
            document.removeEventListener("click", handleDocumentClick);
        }

        return () => {
            // Đảm bảo remove event listener khi component unmount
            document.removeEventListener("click", handleDocumentClick);
        };
    }, [isNavbar]);

    return (
        <>
            <ToastContainer />
            <header className="header-default sticky-top bg-light">
                <Navbar expand="lg ">
                    <Container fluid>
                        <Navbar.Brand as={Link} to="/">
                            <img src="images/logo-color.svg" alt="logo" />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarCollapse" />
                        <Navbar.Collapse id="navbarCollapse">

                            <Navbar.Collapse className="header-right justify-content-end mt-4 mb-4">
                                <div className="header-buttons">
                                    <div className="header-buttons">
                                        <button className="search icon-button">
                                            <i className="icon-magnifier"></i>
                                        </button>
                                        <button className="icon-button" onClick={() => { navigate('/writepost') }}>
                                            <i className="icon-note"></i>
                                        </button>
                                        <button className="icon-button" onClick={toggleNavbar} ref={buttonNavRef}>
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
                                        {/* <!-- <button className="burger-menu icon-button">
                   <span className="burger-icon"></span>
                 </button> --> */}
                                    </div>
                                </div>
                            </Navbar.Collapse>
                        </Navbar.Collapse>

                    </Container>
                </Navbar>
            </header >


        </>
    )
}
